"use client";

import { type FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import {
  getShowProgressCookie,
  setShowProgressCookie,
} from "@/app/actions/config";

export function Config() {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Wait for DOM paint before starting the open animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getShowProgressCookie()
      .then((value) => {
        if (!cancelled) setShowProgress(value === true);
      })
      .catch((err) => {
        console.error("Failed to load config", err);
        if (!cancelled) setError(t("Config.errorLoading"));
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, t]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  const broadcastShowProgress = (value: boolean) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("config:showProgress", { detail: value }),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      await setShowProgressCookie(showProgress);
      broadcastShowProgress(showProgress);
      handleClose();
    } catch (err) {
      console.error("Failed to save config", err);
      setError(t("Config.errorSaving"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("Config.title")}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-neutral-700 transition-colors duration-150 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:text-neutral-200 dark:hover:text-white"
      >
        <Cog6ToothIcon className="size-5" />
      </button>

      {isOpen && mounted
        ? createPortal(
            <>
              <button
                type="button"
                className={`fixed inset-0 z-40 cursor-default bg-black/50 transition-opacity duration-200 ${isAnimating ? "opacity-100" : "opacity-0"}`}
                onClick={handleClose}
                onKeyDown={(e) => {
                  if (e.key === "Escape") handleClose();
                }}
              />
              <dialog
                open
                className={`fixed top-1/2 left-1/2 z-50 m-0 flex w-[95%] max-w-md flex-col items-center justify-center rounded-lg border-none p-0 shadow-lg transition-all duration-200 ${isAnimating ? "opacity-100" : "opacity-0"}`}
                style={{
                  transform: isAnimating
                    ? "translate(-50%, -50%) scale(1)"
                    : "translate(-50%, -50%) scale(0.95)",
                }}
                onCancel={handleClose}
              >
                <div className="w-full rounded-lg bg-white p-6 text-left dark:bg-neutral-800">
                  <div className="mb-4 flex items-center gap-2">
                    <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <h2 className="font-bold text-neutral-900 text-xl dark:text-neutral-100">
                      {t("Config.title")}
                    </h2>
                  </div>

                  {error && (
                    <div className="mb-4 rounded bg-red-100 p-3 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 px-3 py-3 dark:border-neutral-700">
                      <input
                        type="checkbox"
                        id="showProgress"
                        checked={showProgress}
                        onChange={(event) => setShowProgress(event.target.checked)}
                        disabled={isSaving || isLoading}
                        className="mt-0.5 h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700"
                      />
                      <label
                        htmlFor="showProgress"
                        className="flex cursor-pointer flex-col gap-1 text-neutral-800 text-sm dark:text-neutral-200"
                      >
                        <span className="font-medium">
                          {t("Config.showProgress")}
                        </span>
                        <span className="text-neutral-500 text-xs dark:text-neutral-400">
                          {t("Config.description")}
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={isSaving || isLoading}
                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-sm text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
                      >
                        {isSaving ? t("Config.saving") : t("Config.save")}
                      </button>
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isSaving}
                        className="flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 font-medium text-neutral-700 text-sm shadow-sm transition-all duration-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                      >
                        {t("Config.cancel")}
                      </button>
                    </div>

                    {isLoading ? (
                      <p className="text-neutral-500 text-xs dark:text-neutral-400">
                        {t("Common.loading")}
                      </p>
                    ) : null}
                  </form>
                </div>
              </dialog>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
