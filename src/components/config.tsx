"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { ExportTale } from "@/components/export-tale";
import { ImportTale } from "@/components/import-tale";
import { SelectLocale } from "@/components/select-locale";
import { ShowProgressCard } from "@/components/show-progress-card";

export function Config() {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("Config.title")}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-neutral-700 transition-colors duration-150 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:text-neutral-200 dark:hover:text-white"
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
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h2 className="font-bold text-neutral-900 text-xl dark:text-neutral-100">
                        {t("Config.title")}
                      </h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <ImportTale />
                        <ExportTale />
                      </div>
                      <SelectLocale />
                    </div>
                  </div>
                  <ShowProgressCard />
                </div>
              </dialog>
            </>,
            document.body,
          )
        : null}
    </>
  );
}
