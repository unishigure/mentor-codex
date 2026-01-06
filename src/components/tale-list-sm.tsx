"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
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
      <div className="py-8 text-center dark:text-neutral-300">
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
        <div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
          {t("TaleList.empty")}
        </div>
      ) : (
        <div className="space-y-3">
          {tales.map((tale) => {
            const jobKey = getJobI18nKey(tale.job);
            const jobLabel = jobKey ? t(jobKey) : tale.job;
            const roleColor = getRoleColorByJobCode(tale.job as JobCode);
            const dutyId = getContentDutyId(tale.content);
            const dutyLink =
              dutyId && dutyId !== "none"
                ? `https://${locale}.finalfantasyxiv.com/lodestone/playguide/db/duty/${dutyId}/`
                : null;

            return (
              <div
                key={tale.key}
                className={`rounded-lg border-[0.5px] border-neutral-300 p-4 shadow-lg dark:border-neutral-700 ${
                  tale.result
                    ? "bg-green-50 dark:bg-green-900/20"
                    : "bg-red-50 dark:bg-red-900/20"
                }`}
              >
                {/* First row: datetime, inProgress icon, result icon */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-neutral-600 text-xs dark:text-neutral-400">
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
                  <div className="flex flex-col gap-2">
                    <span className="font-medium text-neutral-900 text-sm dark:text-neutral-100">
                      {dutyLink ? (
                        <a
                          className="eorzeadb_link inline-flex items-center gap-1 no-underline hover:no-underline"
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
                    <span
                      className={`inline-flex w-fit items-center rounded-xl px-2 py-1 font-medium text-xs ${roleColor}`}
                    >
                      {jobLabel}
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
      <div className="fixed right-4 bottom-4">
        <WriteTale />
      </div>
    </div>
  );
}
