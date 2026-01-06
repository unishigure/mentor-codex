"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useLocale, useTranslations } from "next-intl";

import { DeleteTale } from "@/components/delete-tale";
import { EditTale } from "@/components/edit-tale";
import { WriteTale } from "@/components/write-tale";
import { getContentDutyId, getContentI18nKey } from "@/lib/content";
import { formatDateTime } from "@/lib/datetime";
import type { Tale } from "@/lib/db";
import { getAllTales } from "@/lib/db";
import type { JobCode } from "@/lib/job";
import { getJobI18nKey, getRoleColorByJobCode } from "@/lib/job";

export function TaleList() {
  const t = useTranslations();
  const locale = useLocale();

  const [tales, setTales] = useState<Tale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const loadTales = useCallback(async (withLoadingState: boolean) => {
    try {
      if (withLoadingState) setIsLoading(true);
      setError(null);
      const data = await getAllTales();
      data.sort(
        (a, b) =>
          new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
      );
      setTales(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tales");
      console.error("Error loading tales:", err);
    } finally {
      if (withLoadingState) setIsLoading(false);
    }
  }, []);

  // Load all tales on component mount
  useEffect(() => {
    loadTales(true);
  }, [loadTales]);

  // Refresh list when a tale is created elsewhere
  useEffect(() => {
    const onTaleSaved = () => {
      void loadTales(false);
    };
    window.addEventListener("tale:update", onTaleSaved);
    return () => window.removeEventListener("tale:update", onTaleSaved);
  }, [loadTales]);

  // Calculate pagination
  const totalPages = Math.ceil(tales.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTales = tales.slice(startIndex, endIndex);

  // Reset to page 1 if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <div className="py-8 text-center dark:text-neutral-300">
        {t("Common.loading")}
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 max-w-7xl">
      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      {tales.length === 0 ? (
        <>
          <div className="py-4 text-center text-neutral-500 dark:text-neutral-400">
            {t("TaleList.empty")}
          </div>
          <div className="flex justify-center">
            <WriteTale />
          </div>
        </>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-neutral-300 shadow-lg dark:border-neutral-700">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-neutral-900">
                <thead>
                  <tr className="bg-neutral-200 dark:bg-neutral-800">
                    <th className="p-4 text-left text-xs dark:text-neutral-200">
                      {t("TaleList.dateTime")}
                    </th>
                    <th className="p-4 text-left text-xs dark:text-neutral-200">
                      {t("TaleList.content")}
                    </th>
                    <th className="p-4 text-left text-xs dark:text-neutral-200">
                      {t("TaleList.job")}
                    </th>
                    <th className="p-4 text-center text-xs dark:text-neutral-200">
                      {t("TaleList.inProgress")}
                    </th>
                    <th className="p-4 text-center text-xs dark:text-neutral-200">
                      {t("TaleList.result")}
                    </th>
                    <th className="p-4 text-center text-xs dark:text-neutral-200">
                      {t("TaleList.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTales.map((tale, index) => {
                    const contentKey = getContentI18nKey(tale.content);
                    const contentName =
                      contentKey !== null
                        ? t(`${contentKey}.name`)
                        : tale.content;
                    const jobKey = getJobI18nKey(tale.job);
                    const jobLabel = jobKey ? t(jobKey) : tale.job;
                    const roleColor = getRoleColorByJobCode(
                      tale.job as JobCode,
                    );
                    const dutyId = getContentDutyId(tale.content);
                    const dutyLink =
                      dutyId && dutyId !== "none"
                        ? `https://${locale}.finalfantasyxiv.com/lodestone/playguide/db/duty/${dutyId}/`
                        : null;

                    return (
                      <tr
                        key={tale.key}
                        className={`h-12 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                          index !== currentTales.length - 1
                            ? "border-neutral-300 dark:border-neutral-700"
                            : ""
                        }`}
                      >
                        <td className="px-4 py-2 text-sm dark:text-neutral-300">
                          {formatDateTime(tale.dateTime, locale)}
                        </td>
                        <td className="px-4 py-2 text-sm dark:text-neutral-300">
                          {dutyLink ? (
                            <a
                              className="eorzeadb_link inline-flex items-center gap-1 no-underline hover:no-underline"
                              href={dutyLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {contentName}
                              <ArrowTopRightOnSquareIcon
                                className="size-3"
                                aria-hidden
                              />
                            </a>
                          ) : (
                            contentName
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm dark:text-neutral-300">
                          <span
                            className={`inline-flex items-center rounded-xl px-2 py-1 font-medium text-xs ${roleColor}`}
                          >
                            {jobLabel}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center text-sm dark:text-neutral-300">
                          {tale.inProgress ? (
                            <span className="inline-flex items-center gap-1 rounded-xl bg-blue-200/50 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900/50 dark:text-blue-200">
                              <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
                              {t("TaleList.inProgressLabel")}
                            </span>
                          ) : (
                            <span className="text-neutral-400 dark:text-neutral-500">
                              -
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-center text-sm dark:text-neutral-300">
                          {tale.result ? (
                            <span className="inline-flex items-center gap-1 rounded-xl bg-green-200/50 px-2 py-1 text-green-800 text-xs dark:bg-green-900/50 dark:text-green-200">
                              <CheckCircleIcon className="size-3.5" />
                              {t("TaleList.successLabel")}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-xl bg-red-200/50 px-2 py-1 text-red-800 text-xs dark:bg-red-900/50 dark:text-red-200">
                              <XCircleIcon className="size-3.5" />
                              {t("TaleList.failureLabel")}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-center dark:text-neutral-300">
                          <div className="flex items-center justify-center gap-1">
                            <EditTale tale={tale} />
                            <DeleteTale taleKey={tale.key} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Empty rows to fill the page */}
                  {Array.from({
                    length: itemsPerPage - currentTales.length,
                  }).map((_, index) => (
                    <tr
                      key={`empty-page${currentPage}-row${
                        // biome-ignore lint/suspicious/noArrayIndexKey
                        index
                      }`}
                      className="h-12 border-neutral-300 dark:border-neutral-700"
                    >
                      <td className="px-4 py-2">&nbsp;</td>
                      <td className="px-4 py-2">&nbsp;</td>
                      <td className="px-4 py-2">&nbsp;</td>
                      <td className="px-4 py-2">&nbsp;</td>
                      <td className="px-4 py-2">&nbsp;</td>
                      <td className="px-4 py-2">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}

            <div className="flex items-center justify-center gap-2 px-4 py-3 dark:bg-neutral-900">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-lg bg-white p-2 text-neutral-700 shadow transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                aria-label="Previous page"
              >
                <ChevronLeftIcon className="size-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-8 rounded-lg px-3 py-1.5 font-medium text-sm transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white dark:bg-blue-500"
                          : "bg-white text-neutral-700 shadow hover:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg bg-white p-2 text-neutral-700 shadow transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
                aria-label="Next page"
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <WriteTale />
          </div>
        </>
      )}
    </div>
  );
}
