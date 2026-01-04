"use client";

import { useTransition } from "react";

import { setLocaleCookie } from "@/app/lib/actions";

const locales = [
  { code: "ja", name: "日本語" },
  { code: "en", name: "English" },
] as const;

export function SelectLocale({ currentLocale }: { currentLocale: string }) {
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(async () => {
      await setLocaleCookie(newLocale);
      window.location.reload();
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={currentLocale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
        className={`cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 font-medium text-gray-700 text-sm shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 ${isPending ? "bg-gray-100 dark:bg-gray-750" : ""}
        `}
        aria-label="Select Language"
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>

      {/* Custom arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 dark:text-gray-500 ${
            isPending ? "opacity-50" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
