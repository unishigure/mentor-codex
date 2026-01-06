"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { useLocale, useTranslations } from "next-intl";

import { getContentI18nKey } from "@/lib/content";
import { formatDateTime } from "@/lib/datetime";
import { getAllTales } from "@/lib/db";
import { getJobI18nKey } from "@/lib/job";
import { getRouletteI18nKey } from "@/lib/roulette";

export function ExportTale() {
  const t = useTranslations();
  const locale = useLocale();

  async function handleExport() {
    try {
      const tales = await getAllTales();
      if (!tales.length) return;

      const headers = [
        t("TaleList.dateTime"),
        t("TaleList.content"),
        t("TaleList.job"),
        t("TaleList.roulette"),
        t("TaleList.inProgress"),
        t("TaleList.result"),
      ];

      const rows = tales.map((tale) => {
        const contentKey = getContentI18nKey(tale.content);
        const contentName =
          contentKey !== null ? t(`${contentKey}.name`) : tale.content;

        const jobKey = getJobI18nKey(tale.job);
        const jobLabel = jobKey ? t(jobKey) : tale.job;

        const rouletteKey = tale.roulette
          ? getRouletteI18nKey(tale.roulette)
          : null;
        const rouletteLabel = rouletteKey ? t(rouletteKey) : "";

        return [
          formatDateTime(tale.dateTime, locale),
          contentName,
          jobLabel,
          rouletteLabel,
          tale.inProgress ? t("TaleList.inProgressLabel") : "",
          tale.result ? t("TaleList.successLabel") : t("TaleList.failureLabel"),
        ];
      });

      const csv = [headers, ...rows]
        .map((row) =>
          row
            .map((value) => {
              const cell = value ?? "";
              return `"${String(cell).replace(/"/g, '""')}"`;
            })
            .join(","),
        )
        .join("\r\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      // Trigger download of the generated CSV
      const link = document.createElement("a");
      link.href = url;
      link.download = `mentor-codex-tales-${new Date().toISOString()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export tales", error);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleExport()}
      className="cursor-pointer rounded-lg p-1 text-neutral-700 transition-all duration-200 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:text-neutral-300 dark:hover:bg-neutral-700/40"
    >
      <ArrowUpTrayIcon className="size-5" />
    </button>
  );
}
