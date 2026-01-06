"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { setShowProgressCookie } from "@/app/actions/config";

export function ShowProgressCard() {
  const t = useTranslations();

  const [showProgress, setShowProgress] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async (checked: boolean) => {
    setShowProgress(checked);
    setIsSaving(true);
    setError(null);

    try {
      await setShowProgressCookie(checked);
      broadcastShowProgress(checked);
    } catch (err) {
      console.error("Failed to save show progress", err);
      setError(t("Config.errorSaving"));
      // Revert on error
      setShowProgress(!checked);
    } finally {
      setIsSaving(false);
    }
  };

  const broadcastShowProgress = (value: boolean) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("config:showProgress", { detail: value }),
    );
  };

  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 px-3 py-3 dark:border-neutral-700">
      <input
        type="checkbox"
        id="showProgress"
        checked={showProgress}
        onChange={(event) => handleToggle(event.target.checked)}
        disabled={isSaving}
        className="mt-0.5 h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700"
      />
      <div className="flex flex-col gap-1">
        <label
          htmlFor="showProgress"
          className="flex cursor-pointer text-neutral-800 text-sm dark:text-neutral-200"
        >
          <span className="font-medium">{t("Config.showProgress")}</span>
        </label>
        {error && (
          <span className="text-red-600 text-xs dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
