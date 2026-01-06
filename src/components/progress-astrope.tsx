"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  ArrowTopRightOnSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useLocale, useTranslations } from "next-intl";

import { getShowProgressCookie } from "@/app/actions/config";
import { getAllTales } from "@/lib/db";
import { countMentorRoulette } from "@/lib/roulette";

const ASTROPE_TARGET = 2000;

export function ProgressAstrope() {
  const t = useTranslations();
  const locale = useLocale();

  const [mentorRuns, setMentorRuns] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(locale),
    [locale],
  );

  const loadMentorRuns = useCallback(
    async (withLoadingState: boolean) => {
      try {
        if (withLoadingState) setIsLoading(true);
        setError(null);
        const tales = await getAllTales();
        setMentorRuns(countMentorRoulette(tales));
      } catch (err) {
        console.error("Failed to load mentor roulette count", err);
        setError(t("ProgressAstrope.error"));
      } finally {
        if (withLoadingState) setIsLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    let cancelled = false;
    getShowProgressCookie()
      .then((value) => {
        if (!cancelled) setShowProgress(value === true);
      })
      .catch((err) => {
        console.error("Failed to read mentor cookie", err);
        if (!cancelled) setShowProgress(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onConfigShowProgress = (event: Event) => {
      if (event instanceof CustomEvent && typeof event.detail === "boolean") {
        setShowProgress(event.detail);
      }
    };

    window.addEventListener("config:showProgress", onConfigShowProgress);
    return () => {
      window.removeEventListener("config:showProgress", onConfigShowProgress);
    };
  }, []);

  useEffect(() => {
    loadMentorRuns(true).catch(() => {
      // Error is already handled in loadMentorRuns
    });
  }, [loadMentorRuns]);

  useEffect(() => {
    const onTaleUpdate = () => {
      void loadMentorRuns(false);
    };
    window.addEventListener("tale:update", onTaleUpdate);
    return () => window.removeEventListener("tale:update", onTaleUpdate);
  }, [loadMentorRuns]);

  const remainingRuns = Math.max(ASTROPE_TARGET - mentorRuns, 0);
  const progressPercent = Math.min(100, (mentorRuns / ASTROPE_TARGET) * 100);
  const progressLabel =
    progressPercent >= 99.95 ? 100 : Number(progressPercent.toFixed(1));

  const formattedCount = numberFormatter.format(mentorRuns);
  const formattedTarget = numberFormatter.format(ASTROPE_TARGET);
  const formattedRemaining = numberFormatter.format(remainingRuns);

  const achievementLink = `https://${locale}.finalfantasyxiv.com/lodestone/playguide/db/achievement/58ffb398c8f`;

  if (!showProgress) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-linear-to-br from-slate-900 via-slate-900 to-zinc-900 text-white shadow-lg dark:border-neutral-800">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-amber-400/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-indigo-500/40 blur-2xl" />
      </div>

      <div className="relative flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
            <SparklesIcon className="h-6 w-6 text-amber-200" aria-hidden />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-[11px] text-amber-100/80 uppercase tracking-[0.08em]">
              {t("ProgressAstrope.badge")}
            </p>
            <p className="font-semibold text-lg leading-tight md:text-xl">
              <a
                className="eorzeadb_link inline-flex items-center gap-1 no-underline hover:no-underline"
                href={achievementLink}
                target="_blank"
                rel="noreferrer"
              >
                {t("ProgressAstrope.title")}
                <ArrowTopRightOnSquareIcon className="size-3" aria-hidden />
              </a>
            </p>
          </div>
        </div>

        <div className="w-full md:max-w-md">
          <div className="mb-2 flex items-center justify-between text-white/70 text-xs">
            <span>{t("ProgressAstrope.progressLabel")}</span>
            <span className="font-semibold text-white">{progressLabel}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
            <div
              role="progressbar"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-full rounded-full bg-linear-to-r from-amber-300 via-orange-400 to-pink-500 transition-[width] duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">
              {t("ProgressAstrope.counter", {
                count: formattedCount,
                target: formattedTarget,
              })}
            </span>
            <span className="text-amber-100 text-xs">
              {remainingRuns > 0
                ? t("ProgressAstrope.remaining", {
                    remaining: formattedRemaining,
                  })
                : t("ProgressAstrope.completed")}
            </span>
          </div>
          {error ? (
            <p className="mt-2 text-red-100 text-xs">{error}</p>
          ) : isLoading ? (
            <p className="mt-2 text-white/70 text-xs">{t("Common.loading")}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
