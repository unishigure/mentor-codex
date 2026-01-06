"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { Roulette, type RouletteCode } from "@/lib/roulette";

export function SelectRoulette({
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
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { allItems, rouletteLabelByCode } = useMemo(() => {
    const items = buildAllItems(t);
    return {
      allItems: items,
      rouletteLabelByCode: buildRouletteLabelByCode(items),
    };
  }, [t]);

  const selectedLabel = rouletteLabelByCode.get(value) ?? value;

  const renderOptions = useMemo(() => toRenderOptions(allItems), [allItems]);

  const selectRouletteCode = (rouletteCode: string) => {
    setIsOpen(false);

    if (rouletteCode === value) return;
    onValueChange(rouletteCode);
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div ref={containerRef} className="relative block">
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`h-11.5 w-full cursor-pointer rounded-lg border border-neutral-300 bg-white px-4 py-2.5 pr-10 text-left font-medium text-neutral-700 shadow-sm transition-all duration-200 placeholder:text-neutral-400 hover:border-neutral-400 hover:bg-neutral-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 dark:placeholder:text-neutral-500 ${disabled ? "bg-neutral-100 dark:bg-neutral-750" : ""}`}
      >
        {selectedLabel}
      </button>
      {value && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onValueChange("");
            setIsOpen(false);
          }}
          className="absolute top-1/2 right-10 -translate-y-1/2 rounded p-0.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:text-neutral-500 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" />

      {isOpen ? (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <ul className="max-h-64 overflow-auto py-1">
            {renderOptions.map((option) => {
              if (option.disabled) {
                return (
                  <li
                    key={option.key}
                    className="px-4 py-2 font-semibold text-neutral-500 text-xs dark:text-neutral-400"
                  >
                    {option.label}
                  </li>
                );
              }

              return (
                <li
                  key={option.key}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectRouletteCode(option.value);
                  }}
                  className="cursor-pointer px-4 py-2 text-neutral-700 text-sm hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type RenderOption = {
  key: string;
  label: string;
  value: string;
  disabled?: boolean;
};

function buildAllItems(t: ReturnType<typeof useTranslations>) {
  const items: { code: RouletteCode; label: string }[] = [];
  for (const code of Object.keys(Roulette) as RouletteCode[]) {
    items.push({
      code,
      label: t(`Roulette.${code}`),
    });
  }
  return items;
}

function buildRouletteLabelByCode(
  allItems: { code: RouletteCode; label: string }[],
) {
  const map = new Map<string, string>();
  for (const item of allItems) {
    map.set(item.code, item.label);
  }
  return map;
}

function toRenderOptions(allItems: { code: RouletteCode; label: string }[]) {
  const renderOptions: RenderOption[] = [];
  for (const item of allItems) {
    renderOptions.push({
      key: `roulette-${item.code}`,
      label: item.label,
      value: item.code,
    });
  }

  return renderOptions;
}
