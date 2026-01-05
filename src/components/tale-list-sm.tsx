"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { useLocale, useTranslations } from "next-intl";

import { DeleteTale } from "@/components/delete-tale";
import { EditTale } from "@/components/edit-tale";
import { getContentDutyId, getContentI18nKey } from "@/lib/content";
import { formatDateTime } from "@/lib/datetime";
import type { Tale } from "@/lib/db";
import { getAllTales } from "@/lib/db";
import { getJobI18nKey } from "@/lib/job";

export function TaleListSm() {
  const t = useTranslations();
  const locale = useLocale();

  const [tales, setTales] = useState<Tale[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) {
    return (
      <div className="py-8 text-center dark:text-gray-300">
        {t("Common.loading")}
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 w-[95%] max-w-300">
      {error && (
        <div className="mb-4 rounded bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      )}

      {tales.length === 0 ? (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          {t("TaleList.empty")}
        </div>
      ) : (
        <div className="space-y-3">
          {tales.map((tale) => {
            const dutyId = getContentDutyId(tale.content);
            const dutyLink =
              dutyId && dutyId !== "none"
                ? `https://${locale}.finalfantasyxiv.com/lodestone/playguide/db/duty/${dutyId}/`
                : null;

            return (
              <div
                key={tale.key}
                className={`rounded-lg p-4 shadow-lg ${
                  tale.result
                    ? "bg-green-50 dark:bg-green-900/20"
                    : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                {/* First row: datetime, inProgress icon, result icon */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-gray-600 text-xs dark:text-gray-400">
                    {formatDateTime(tale.dateTime, locale)}
                  </span>
                  <div className="flex items-center gap-2">
                    {tale.inProgress && (
                      <ArrowLeftEndOnRectangleIcon
                        className="h-5 w-5 text-blue-600 dark:text-blue-400"
                        title={t("TaleList.inProgressLabel")}
                      />
                    )}
                  </div>
                </div>

                {/* Second row: content name, job name, delete button */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-900 text-sm dark:text-gray-100">
                      {dutyLink ? (
                        <a
                          className="inline-flex items-center gap-1 no-underline hover:no-underline"
                          href={dutyLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {t(`${getContentI18nKey(tale.content)}.name`)}
                          <ArrowTopRightOnSquareIcon
                            className="size-3"
                            aria-hidden
                          />
                        </a>
                      ) : (
                        t(`${getContentI18nKey(tale.content)}.name`)
                      )}
                    </span>
                    <span className="text-gray-700 text-xs dark:text-gray-300">
                      {t(`${getJobI18nKey(tale.job)}`)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <EditTale tale={tale} />
                    <DeleteTale taleKey={tale.key} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
