"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import type { ContentCode } from "@/app/lib/content";
import type { Tale } from "@/app/lib/db";
import { saveTale } from "@/app/lib/db";
import type { JobCode } from "@/app/lib/job";
import { SelectContent } from "./select-content";
import { SelectJob } from "./select-job";

export function WriteTale({ onSaved }: { onSaved?: () => void }) {
  const t = useTranslations();

  const [content, setContent] = useState<ContentCode | "">("");
  const [job, setJob] = useState<JobCode | "">("");
  const [inProgress, setInProgress] = useState(false);
  const [result, setResult] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // Reset form
      setContent("");
      setJob("");
      setInProgress(false);
      setResult(true);

      // Notify parent component
      onSaved?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("WriteTale.errorSaving"));
      console.error("Error saving tale:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <h2 className="font-bold text-gray-900 text-xl dark:text-gray-100">
        {t("WriteTale.title")}
      </h2>

      {error && (
        <div className="rounded bg-red-100 p-3 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

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
          className="ml-2 cursor-pointer text-gray-700 text-sm dark:text-gray-300"
        >
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
          className="ml-2 cursor-pointer text-gray-700 text-sm dark:text-gray-300"
        >
          {t("WriteTale.result")}
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSaving || !content || !job}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        {isSaving ? t("WriteTale.saving") : t("WriteTale.save")}
      </button>
    </form>
  );
}
