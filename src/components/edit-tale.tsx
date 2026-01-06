"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeftEndOnRectangleIcon,
  CheckCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { SelectContent } from "@/components/select-content";
import { SelectJob } from "@/components/select-job";
import { SelectRoulette } from "@/components/select-roulette";
import type { ContentCode } from "@/lib/content";
import type { Tale } from "@/lib/db";
import { saveTale } from "@/lib/db";
import type { JobCode } from "@/lib/job";
import type { RouletteCode } from "@/lib/roulette";

interface EditTaleProps {
  tale: Tale;
}

export function EditTale({ tale }: EditTaleProps) {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [content, setContent] = useState<ContentCode | "">(tale.content);
  const [job, setJob] = useState<JobCode | "">(tale.job);
  const [roulette, setRoulette] = useState<RouletteCode | "">(
    tale.roulette ?? "",
  );
  const [memo, setMemo] = useState(tale.memo);
  const [inProgress, setInProgress] = useState(tale.inProgress);
  const [result, setResult] = useState(tale.result);

  useEffect(() => {
    if (isOpen) {
      setContent(tale.content);
      setJob(tale.job);
      setRoulette(tale.roulette ?? "");
      setMemo(tale.memo ?? "");
      setInProgress(tale.inProgress);
      setResult(tale.result);

      // DOMが確実にレンダリングされてからアニメーションを開始
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, tale]);

  const handleClose = () => {
    setIsAnimating(false);
    // アニメーション完了後に閉じる
    setTimeout(() => {
      setIsOpen(false);
      setError(null);
    }, 200); // duration-200と同じ
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content || !job) {
      setError(t("EditTale.errorRequired"));
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const nextTale: Tale = {
        ...tale,
        content: content as ContentCode,
        job: job as JobCode,
        roulette,
        memo,
        inProgress,
        result,
      };

      await saveTale(nextTale);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("tale:update"));
      }

      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("EditTale.errorSaving"));
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
        className="cursor-pointer rounded-lg p-1 text-blue-600 transition-all duration-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-blue-400 dark:hover:bg-blue-900/20"
        title={t("EditTale.edit")}
      >
        <PencilSquareIcon className="size-4" />
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
            <div className="w-full rounded-lg bg-white p-6 text-center dark:bg-neutral-800">
              <h2 className="mb-4 font-bold text-neutral-900 text-xl dark:text-neutral-100">
                {t("EditTale.title")}
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
                    className="mb-2 block font-medium text-neutral-700 text-sm dark:text-neutral-300"
                  >
                    {t("EditTale.content")}
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
                    className="mb-2 block font-medium text-neutral-700 text-sm dark:text-neutral-300"
                  >
                    {t("EditTale.job")}
                  </label>
                  <SelectJob
                    id="job"
                    value={job}
                    onValueChange={(code) => setJob(code as JobCode)}
                    disabled={isSaving}
                  />
                </div>

                {/* Roulette Selection (Optional) */}
                <div>
                  <label
                    htmlFor="roulette"
                    className="mb-2 block font-medium text-neutral-700 text-sm dark:text-neutral-300"
                  >
                    {t("EditTale.roulette")}
                    <span className="ml-1 text-neutral-500 text-xs dark:text-neutral-400">
                      ({t("EditTale.optional")})
                    </span>
                  </label>
                  <SelectRoulette
                    id="roulette"
                    value={roulette}
                    onValueChange={(code) => setRoulette(code as RouletteCode)}
                    disabled={isSaving}
                  />
                </div>

                {/* Memo (Optional) */}
                <div>
                  <label
                    htmlFor="memo"
                    className="mb-2 block font-medium text-neutral-700 text-sm dark:text-neutral-300"
                  >
                    {t("EditTale.memo")}
                    <span className="ml-1 text-neutral-500 text-xs dark:text-neutral-400">
                      ({t("EditTale.optional")})
                    </span>
                  </label>
                  <textarea
                    id="memo"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    disabled={isSaving}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 text-sm shadow-sm transition-all duration-200 placeholder:text-neutral-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                    rows={3}
                  />
                </div>

                <div className="flex flex-row justify-end gap-3">
                  {/* In Progress Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inProgress"
                      checked={inProgress}
                      onChange={(e) => setInProgress(e.target.checked)}
                      disabled={isSaving}
                      className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700"
                    />
                    <label
                      htmlFor="inProgress"
                      className="ml-2 flex cursor-pointer items-center gap-1 text-neutral-700 text-sm dark:text-neutral-300"
                    >
                      {t("EditTale.inProgress")}
                      <ArrowLeftEndOnRectangleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                      className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700"
                    />
                    <label
                      htmlFor="result"
                      className="ml-2 flex cursor-pointer items-center gap-1 text-neutral-700 text-sm dark:text-neutral-300"
                    >
                      {t("EditTale.result")}
                      <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving || !content || !job}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-sm text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    {isSaving ? t("EditTale.saving") : t("EditTale.save")}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSaving}
                    className="flex-1 rounded-lg border border-neutral-300 px-4 py-2.5 font-medium text-neutral-700 text-sm shadow-sm transition-all duration-200 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
                  >
                    {t("EditTale.cancel")}
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
