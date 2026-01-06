"use client";

import { useEffect, useTransition } from "react";

import { getJobCookie, setJobCookie } from "@/app/actions/job";
import { SelectJob } from "@/components/select-job";

export function SelectJobCookie({
  value,
  onValueChange,
  disabled,
  id,
}: {
  value: string;
  onValueChange: (jobCode: string) => void;
  disabled?: boolean;
  id?: string;
}) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadJobCookie = async () => {
      const cookieJob = await getJobCookie();
      if (cookieJob) {
        onValueChange(cookieJob);
      }
    };
    loadJobCookie();
  }, [onValueChange]);

  const handleValueChange = (nextJobCode: string) => {
    if (!nextJobCode) return;
    if (nextJobCode === value) return;
    onValueChange(nextJobCode);
    startTransition(() => setJobCookie(nextJobCode));
  };

  return (
    <SelectJob
      id={id}
      value={value}
      onValueChange={handleValueChange}
      disabled={disabled || isPending}
    />
  );
}
