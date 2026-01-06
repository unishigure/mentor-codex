"use client";

import { type ChangeEvent, useMemo, useRef, useState } from "react";

import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { Content, type ContentCode } from "@/lib/content";
import type { Tale } from "@/lib/db";
import { saveTale } from "@/lib/db";
import { Job, type JobCode } from "@/lib/job";
import { Roulette, type RouletteCode } from "@/lib/roulette";

type NameMap = Map<string, string>;

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (current || row.length) {
        row.push(current);
        rows.push(row);
      }
      current = "";
      row = [];
      if (char === "\r" && next === "\n") i += 1;
      continue;
    }

    current += char;
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  return rows;
}

function buildContentNameMap(t: ReturnType<typeof useTranslations>): NameMap {
  const map: NameMap = new Map();

  for (const [category, contents] of Object.entries(Content)) {
    if (typeof contents !== "object" || contents === null) continue;

    for (const [code, payload] of Object.entries(contents)) {
      const translationKey = `Content.${category}.${code}.name`;
      const translated = t(translationKey);
      const rawName = (payload as { name?: string }).name;

      if (translated) map.set(translated, code);
      if (rawName) map.set(rawName, code);
      map.set(code, code);
    }
  }

  return map;
}

function buildJobNameMap(t: ReturnType<typeof useTranslations>): NameMap {
  const map: NameMap = new Map();

  for (const [role, jobs] of Object.entries(Job)) {
    if (typeof jobs !== "object" || jobs === null) continue;

    for (const [code, label] of Object.entries(jobs)) {
      const translationKey = `Job.${role}.${code}`;
      const translated = t(translationKey);

      if (translated) map.set(translated, code);
      if (label) map.set(label, code);
      map.set(code, code);
    }
  }

  return map;
}

function buildRouletteNameMap(t: ReturnType<typeof useTranslations>): NameMap {
  const map: NameMap = new Map();

  for (const [code, label] of Object.entries(Roulette)) {
    const translationKey = `Roulette.${code}`;
    const translated = t(translationKey);

    if (translated) map.set(translated, code);
    if (label) map.set(label, code);
    map.set(code, code);
  }

  return map;
}

function parseDateValue(value: string): Date | null {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function rowsAreEmpty(rows: string[][]): boolean {
  return rows.every((row) => row.every((cell) => cell.trim() === ""));
}

function headersMatch(headers: string[], expected: string[]): boolean {
  if (headers.length < expected.length) return false;
  return expected.every(
    (label, index) => headers[index]?.trim() === label.trim(),
  );
}

export function ImportTale() {
  const t = useTranslations();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const expectedHeaders = useMemo(
    () => [
      t("TaleList.dateTime"),
      t("TaleList.content"),
      t("TaleList.job"),
      t("TaleList.roulette"),
      t("TaleList.inProgress"),
      t("TaleList.result"),
    ],
    [t],
  );

  const contentNameMap = useMemo(() => buildContentNameMap(t), [t]);
  const jobNameMap = useMemo(() => buildJobNameMap(t), [t]);
  const rouletteNameMap = useMemo(() => buildRouletteNameMap(t), [t]);

  const resolveWithMap = (map: NameMap, value: string): string | undefined => {
    const normalized = value?.trim();
    if (!normalized) return undefined;
    return map.get(normalized);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Allow re-selecting the same file
    event.target.value = "";

    if (!file) return;

    setIsImporting(true);

    try {
      const text = await file.text();
      const rows = parseCsv(text).filter((row) => row.some((cell) => cell));

      if (rows.length === 0 || rowsAreEmpty(rows)) {
        console.error("No usable rows found in the CSV");
        return;
      }

      const [headers, ...dataRows] = rows;

      if (!headersMatch(headers, expectedHeaders)) {
        console.error("CSV headers do not match expected format");
        return;
      }

      const talesToSave: Tale[] = [];

      dataRows.forEach((row, index) => {
        if (row.length < 6) return;

        const [
          dateValue,
          contentValue,
          jobValue,
          rouletteValue,
          inProgressValue,
          resultValue,
        ] = row;

        const dateTime = parseDateValue(dateValue?.trim());
        const content = resolveWithMap(contentNameMap, contentValue);
        const job = resolveWithMap(jobNameMap, jobValue);
        const roulette = resolveWithMap(rouletteNameMap, rouletteValue);

        const inProgress =
          inProgressValue?.trim() === t("TaleList.inProgressLabel") ||
          inProgressValue?.trim().toLowerCase() === "true";
        const result =
          resultValue?.trim() === t("TaleList.successLabel") ||
          resultValue?.trim().toLowerCase() === "true";

        if (!dateTime || !content || !job) return;

        talesToSave.push({
          key: Date.now() + index + talesToSave.length,
          content: content as ContentCode,
          job: job as JobCode,
          roulette: roulette as RouletteCode | undefined,
          inProgress,
          result,
          dateTime,
        });
      });

      if (talesToSave.length === 0) {
        console.error("No valid tales to import");
        return;
      }

      await Promise.all(talesToSave.map((tale) => saveTale(tale)));
      window.dispatchEvent(new Event("tale:update"));

      console.log(`Imported ${talesToSave.length} tales successfully`);
    } catch (err) {
      console.error("Failed to import tales", err);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={isImporting}
        aria-label={t("ImportTale.buttonLabel")}
        title={t("ImportTale.buttonLabel")}
        className="cursor-pointer rounded-lg p-1 text-neutral-700 transition-all duration-200 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:text-neutral-300 dark:hover:bg-neutral-700/40"
      >
        <ArrowDownTrayIcon className="size-5" />
      </button>
    </div>
  );
}
