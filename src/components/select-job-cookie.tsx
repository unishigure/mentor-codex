"use client";

import { useEffect, useState, useTransition } from "react";

import { getJobCookie, setJobCookie } from "@/app/actions/job";
import { SelectJob } from "@/components/select-job";

export function SelectJobCookie() {
  const [value, setValue] = useState("PLD");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadJobCookie = async () => {
      const cookieJob = await getJobCookie();
      if (cookieJob) {
        setValue(cookieJob);
      }
    };
    loadJobCookie();
  }, []);

  const handleValueChange = (nextJobCode: string) => {
    setValue(nextJobCode);
    startTransition(() => setJobCookie(nextJobCode));
  };

  return (
    <SelectJob
      value={value}
      onValueChange={handleValueChange}
      disabled={isPending}
    />
  );
}
