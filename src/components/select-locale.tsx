"use client";

import { useEffect, useState, useTransition } from "react";

import { ChevronDownIcon, LanguageIcon } from "@heroicons/react/24/solid";

import { getLocaleCookie, setLocaleCookie } from "@/actions/locale";

const locales = [
  { code: "jp", name: "日本語" },
  { code: "na", name: "English (US)" },
] as const;

export function SelectLocale() {
  const [value, setValue] = useState("jp");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadLocaleCookie = async () => {
      const cookieLocale = await getLocaleCookie();
      if (cookieLocale) {
        setValue(cookieLocale);
      }
    };
    loadLocaleCookie();
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    setValue(newLocale);
    startTransition(() => setLocaleCookie(newLocale));
  };

  return (
    <div className="relative inline-block">
      <LanguageIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <select
        value={value}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
        className={`cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pr-10 pl-10 font-medium text-gray-700 text-sm shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 ${isPending ? "bg-gray-100 dark:bg-gray-750" : ""}
        `}
        aria-label="Select Language"
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
    </div>
  );
}
