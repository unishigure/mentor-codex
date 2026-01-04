"use client";

import { useEffect, useState, useTransition } from "react";

import { setJobCookie } from "@/app/actions/job";
import { SelectJob } from "./select-job";

export function SelectJobCookie({
  initialJob = "PLD",
}: {
  initialJob?: string;
}) {
  const [value, setValue] = useState(initialJob);
  const [isPending, startTransition] = useTransition();

  useEffect(() => setValue(initialJob), [initialJob]);

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
