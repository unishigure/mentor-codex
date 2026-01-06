"use client";

import { useEffect, useTransition } from "react";

import { getIsMentorCookie, setIsMentorCookie } from "@/app/actions/roulette";
import { SelectRoulette } from "@/components/select-roulette";

export function SelectRouletteCookie({
  value,
  onValueChange,
  disabled,
  id,
}: {
  value: string;
  onValueChange: (rouletteCode: string) => void;
  disabled?: boolean;
  id?: string;
}) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadRouletteCookie = async () => {
      const isMentor = await getIsMentorCookie();
      if (isMentor) {
        onValueChange("mentor");
      }
    };
    loadRouletteCookie();
  }, [onValueChange]);

  const handleValueChange = (nextRouletteCode: string) => {
    if (nextRouletteCode === value) return;

    onValueChange(nextRouletteCode);

    startTransition(() => {
      if (nextRouletteCode === "mentor") {
        setIsMentorCookie(true);
      } else {
        setIsMentorCookie(false);
      }
    });
  };

  return (
    <SelectRoulette
      id={id}
      value={value}
      onValueChange={handleValueChange}
      disabled={disabled || isPending}
    />
  );
}
