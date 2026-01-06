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
      <LanguageIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
      <select
        value={value}
        onChange={(e) => handleLocaleChange(e.target.value)}
        disabled={isPending}
        className={`cursor-pointer appearance-none rounded-lg border border-neutral-300 bg-white py-2.5 pr-10 pl-10 font-medium text-neutral-700 text-sm shadow-sm transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 ${isPending ? "bg-neutral-100 dark:bg-neutral-750" : ""}
        `}
        aria-label="Select Language"
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />
    </div>
  );
}
