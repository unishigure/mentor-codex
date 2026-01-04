"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

import { setJobCookie } from "@/app/actions/job";
import { Job, type Role } from "@/app/lib/job";

export function SelectJob({ initialJob = "PLD" }: { initialJob?: string }) {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  const options: { label: string; value: string; disabled?: boolean }[] = [];
  for (const role of Object.keys(Job) as Role[]) {
    // Add a separator for each role
    options.push({ label: t(`Role.${role}`), value: "", disabled: true });
    for (const jobCode of Object.keys(Job[role])) {
      options.push({ label: t(`Job.${role}.${jobCode}`), value: jobCode });
    }
  }

  const handleJobChange = (newJob: string) => {
    startTransition(async () => {
      await setJobCookie(newJob);
      window.location.reload();
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={initialJob}
        onChange={(e) => handleJobChange(e.target.value)}
        disabled={isPending}
        className={`cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 text-sm shadow-sm transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 ${isPending ? "bg-gray-100 dark:bg-gray-750" : ""}`}
      >
        {options.map((option) => (
          <option
            key={option.label}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
    </div>
  );
}
