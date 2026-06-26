"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import {
  DRIVE_BACKUP_SCOPE,
  recordTaleMutation,
  syncDriveBackup,
} from "@/lib/drive-backup";
import { TALE_UPDATE_EVENT, type TaleUpdateDetail } from "@/lib/tale-events";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_IDENTITY_SCRIPT = "https://accounts.google.com/gsi/client";
const DRIVE_CONSENT_STORAGE_KEY = "mentor-codex-drive-consented";

type TokenResponse = {
  access_token?: string;
  error?: string;
};

type TokenClient = {
  requestAccessToken: (options?: { prompt?: string }) => void;
};

type GoogleIdentity = {
  accounts: {
    oauth2: {
      initTokenClient: (config: {
        client_id: string;
        scope: string;
        callback: (response: TokenResponse) => void;
      }) => TokenClient;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdentity;
  }
}

type SyncStatus = "idle" | "syncing" | "success" | "error" | "disabled";

function loadGoogleIdentityScript(): Promise<void> {
  if (window.google?.accounts.oauth2) return Promise.resolve();

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src="${GOOGLE_IDENTITY_SCRIPT}"]`,
  );

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = GOOGLE_IDENTITY_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity"));
    document.head.appendChild(script);
  });
}

export function ConnectDrive() {
  const t = useTranslations();

  const [status, setStatus] = useState<SyncStatus>("idle");
  const tokenClientRef = useRef<TokenClient | null>(null);
  const tokenResolverRef = useRef<((response: TokenResponse) => void) | null>(
    null,
  );
  const accessTokenRef = useRef<string | null>(null);
  const autoSyncedRef = useRef(false);
  const suppressTaleUpdateSyncRef = useRef(false);

  const getAccessToken = useCallback(
    async (interactive: boolean): Promise<string | null> => {
      if (accessTokenRef.current) return accessTokenRef.current;
      if (!GOOGLE_CLIENT_ID) return null;
      if (!interactive) return null;

      await loadGoogleIdentityScript();

      const google = window.google;
      if (!google?.accounts.oauth2) return null;

      tokenClientRef.current ??= google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: DRIVE_BACKUP_SCOPE,
        callback: (response) => tokenResolverRef.current?.(response),
      });

      const response = await new Promise<TokenResponse>((resolve) => {
        const hasConsent =
          localStorage.getItem(DRIVE_CONSENT_STORAGE_KEY) === "true";

        tokenResolverRef.current = resolve;
        tokenClientRef.current?.requestAccessToken({
          prompt: interactive && !hasConsent ? "consent" : "",
        });
      });
      tokenResolverRef.current = null;

      if (response.error || !response.access_token) return null;

      accessTokenRef.current = response.access_token;
      localStorage.setItem(DRIVE_CONSENT_STORAGE_KEY, "true");
      return response.access_token;
    },
    [],
  );

  const syncBackup = useCallback(
    async (interactive: boolean) => {
      if (!GOOGLE_CLIENT_ID) {
        setStatus("disabled");
        return;
      }

      setStatus("syncing");

      try {
        const accessToken = await getAccessToken(interactive);
        if (!accessToken) {
          setStatus(interactive ? "error" : "idle");
          return;
        }

        suppressTaleUpdateSyncRef.current = true;
        await syncDriveBackup(accessToken);
        suppressTaleUpdateSyncRef.current = false;
        setStatus("success");
      } catch (error) {
        suppressTaleUpdateSyncRef.current = false;
        setStatus("error");
        console.error("Failed to sync Drive backup", error);
      }
    },
    [getAccessToken],
  );

  useEffect(() => {
    if (autoSyncedRef.current) return;
    autoSyncedRef.current = true;

    if (!GOOGLE_CLIENT_ID) {
      setStatus("disabled");
      return;
    }

    void syncBackup(false);
  }, [syncBackup]);

  useEffect(() => {
    const syncAfterTaleUpdate = (event: Event) => {
      if (suppressTaleUpdateSyncRef.current) return;

      recordTaleMutation((event as CustomEvent<TaleUpdateDetail>).detail);

      if (!accessTokenRef.current) return;

      void syncBackup(false);
    };

    window.addEventListener(TALE_UPDATE_EVENT, syncAfterTaleUpdate);
    return () =>
      window.removeEventListener(TALE_UPDATE_EVENT, syncAfterTaleUpdate);
  }, [syncBackup]);

  const isSyncing = status === "syncing";

  useEffect(() => {
    if (!isSyncing) return;

    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [isSyncing]);

  const label =
    status === "success"
      ? t("ConnectDrive.synced")
      : status === "syncing"
        ? t("ConnectDrive.syncing")
        : status === "disabled"
          ? t("ConnectDrive.disabled")
          : t("ConnectDrive.sync");

  return (
    <button
      type="button"
      onClick={() => void syncBackup(true)}
      disabled={isSyncing || status === "disabled"}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-neutral-700 transition-colors duration-150 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-neutral-200 dark:hover:text-white"
    >
      <CloudArrowUpIcon
        className={`size-5 ${isSyncing ? "animate-pulse" : ""}`}
      />
    </button>
  );
}
