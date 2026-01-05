"use client";

import { useCallback, useEffect, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { getContentI18nKey } from "@/lib/content";
import type { Tale } from "@/lib/db";
import { deleteTale, getAllTales } from "@/lib/db";
import { getJobI18nKey } from "@/lib/job";

export function TaleList() {
  const t = useTranslations();

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
    window.addEventListener("tale:saved", onTaleSaved);
    return () => window.removeEventListener("tale:saved", onTaleSaved);
  }, [loadTales]);

  const handleDelete = async (key: number) => {
    if (!confirm(t("TaleList.deleteConfirm"))) return;

    try {
      await deleteTale(key);
      setTales((prev) => prev.filter((tale) => tale.key !== key));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete tale");
      console.error("Error deleting tale:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center dark:text-gray-300">
        {t("Common.loading")}
      </div>
    );
  }

  return (
    <div className="mx-auto my-4 w-[95%] max-w-300 md:w-3/4">
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
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border-collapse rounded-lg bg-white shadow-lg dark:bg-gray-900">
            <thead>
              <tr className="border-gray-300 border-b bg-gray-200 dark:border-gray-700 dark:bg-gray-800">
                <th className="px-4 py-2 text-left dark:text-gray-200">
                  {t("TaleList.dateTime")}
                </th>
                <th className="px-4 py-2 text-left dark:text-gray-200">
                  {t("TaleList.content")}
                </th>
                <th className="px-4 py-2 text-left dark:text-gray-200">
                  {t("TaleList.job")}
                </th>
                <th className="px-4 py-2 text-center dark:text-gray-200">
                  {t("TaleList.inProgress")}
                </th>
                <th className="px-4 py-2 text-center dark:text-gray-200">
                  {t("TaleList.result")}
                </th>
                <th className="px-4 py-2 text-center dark:text-gray-200">
                  {t("TaleList.actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {tales.map((tale, index) => (
                <tr
                  key={tale.key}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    index !== tales.length - 1
                      ? "border-gray-200 border-b dark:border-gray-700"
                      : ""
                  }`}
                >
                  <td className="px-4 py-2 dark:text-gray-300">
                    {new Date(tale.dateTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 dark:text-gray-300">
                    {t(`${getContentI18nKey(tale.content)}.name`)}
                  </td>
                  <td className="px-4 py-2 dark:text-gray-300">
                    {t(`${getJobI18nKey(tale.job)}`)}
                  </td>
                  <td className="px-4 py-2 text-center dark:text-gray-300">
                    {tale.inProgress ? (
                      <span className="rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {t("TaleList.inProgressLabel")}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">
                        -
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center dark:text-gray-300">
                    {tale.result ? (
                      <span className="rounded bg-green-200 px-2 py-1 text-green-800 text-sm dark:bg-green-900 dark:text-green-200">
                        {t("TaleList.successLabel")}
                      </span>
                    ) : (
                      <span className="rounded bg-red-200 px-2 py-1 text-red-800 text-sm dark:bg-red-900 dark:text-red-200">
                        {t("TaleList.failureLabel")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center dark:text-gray-300">
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(tale.key)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title={t("TaleList.delete")}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
