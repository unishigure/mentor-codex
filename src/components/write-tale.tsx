"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeftEndOnRectangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { SelectContent } from "@/components/select-content";
import { SelectJob } from "@/components/select-job";
import type { ContentCode } from "@/lib/content";
import type { Tale } from "@/lib/db";
import { saveTale } from "@/lib/db";
import type { JobCode } from "@/lib/job";

export function WriteTale() {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [content, setContent] = useState<ContentCode | "">("");
  const [job, setJob] = useState<JobCode | "">("");
  const [inProgress, setInProgress] = useState(false);
  const [result, setResult] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // DOMが確実にレンダリングされてからアニメーションを開始
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    // アニメーション完了後に閉じる
    setTimeout(() => {
      setIsOpen(false);
    }, 200); // duration-200と同じ
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content || !job) {
      setError(t("WriteTale.errorRequired"));
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const tale: Tale = {
        key: Date.now(),
        content: content as ContentCode,
        job: job as JobCode,
        inProgress,
        result,
        dateTime: new Date(),
      };

      await saveTale(tale);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("tale:saved"));
      }

      // Reset form
      setContent("");
      setJob("");
      setInProgress(false);
      setResult(true);

      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("WriteTale.errorSaving"));
      console.error("Error saving tale:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {t("WriteTale.title")}
      </button>

      {isOpen && (
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
            className={`fixed top-1/2 left-1/2 z-50 m-0 flex w-[95%] max-w-100 flex-col items-center justify-center rounded-lg border-none p-0 shadow-lg transition-all duration-200 ${isAnimating ? "opacity-100" : "opacity-0"}`}
            style={{
              transform: isAnimating
                ? "translate(-50%, -50%) scale(1)"
                : "translate(-50%, -50%) scale(0.95)",
            }}
            onCancel={handleClose}
          >
            <div className="w-full rounded-lg bg-white p-6 dark:bg-gray-800">
              <h2 className="mb-4 font-bold text-gray-900 text-xl dark:text-gray-100">
                {t("WriteTale.title")}
              </h2>

              {error && (
                <div className="mb-4 rounded bg-red-100 p-3 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Content Selection */}
                <div>
                  <label
                    htmlFor="content"
                    className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
                  >
                    {t("WriteTale.content")}
                  </label>
                  <SelectContent
                    id="content"
                    value={content}
                    onValueChange={(code) => setContent(code as ContentCode)}
                    disabled={isSaving}
                  />
                </div>

                {/* Job Selection */}
                <div>
                  <label
                    htmlFor="job"
                    className="mb-2 block font-medium text-gray-700 text-sm dark:text-gray-300"
                  >
                    {t("WriteTale.job")}
                  </label>
                  <SelectJob
                    id="job"
                    value={job}
                    onValueChange={(code) => setJob(code as JobCode)}
                    disabled={isSaving}
                  />
                </div>

                {/* In Progress Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="inProgress"
                    checked={inProgress}
                    onChange={(e) => setInProgress(e.target.checked)}
                    disabled={isSaving}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="inProgress"
                    className="ml-2 flex cursor-pointer items-center gap-2 text-gray-700 text-sm dark:text-gray-300"
                  >
                    <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    {t("WriteTale.inProgress")}
                  </label>
                </div>

                {/* Result Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="result"
                    checked={result}
                    onChange={(e) => setResult(e.target.checked)}
                    disabled={isSaving}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <label
                    htmlFor="result"
                    className="ml-2 flex cursor-pointer items-center gap-2 text-gray-700 text-sm dark:text-gray-300"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    {t("WriteTale.result")}
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving || !content || !job}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {isSaving ? t("WriteTale.saving") : t("WriteTale.save")}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSaving}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    {t("WriteTale.cancel")}
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}
