"use client";

import { useEffect, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { deleteTale } from "@/lib/db";

interface DeleteTaleProps {
  taleKey: number;
}

export function DeleteTale({ taleKey }: DeleteTaleProps) {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      await deleteTale(taleKey);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("tale:update"));
      }

      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("DeleteTale.errorDeleting"),
      );
      console.error("Error deleting tale:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg p-2 text-red-600 transition-all duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:text-red-400 dark:hover:bg-red-900/20"
        title={t("DeleteTale.delete")}
      >
        <TrashIcon className="h-5 w-5" />
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
                {t("DeleteTale.title")}
              </h2>

              {error && (
                <div className="mb-4 rounded bg-red-100 p-3 text-red-700 text-sm dark:bg-red-900 dark:text-red-200">
                  {error}
                </div>
              )}

              <p className="mb-6 text-gray-700 text-sm dark:text-gray-300">
                {t("DeleteTale.deleteConfirm")}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-600"
                >
                  {isDeleting
                    ? t("DeleteTale.deleting")
                    : t("DeleteTale.delete")}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isDeleting}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {t("DeleteTale.cancel")}
                </button>
              </div>
            </div>
          </dialog>
        </>
      )}
    </>
  );
}
