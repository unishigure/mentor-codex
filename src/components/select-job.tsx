"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

import { Job, type Role } from "@/lib/job";

export function SelectJob({
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
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { allItems, jobLabelByCode } = useMemo(() => {
    const items = buildAllItems(t);
    return { allItems: items, jobLabelByCode: buildJobLabelByCode(items) };
  }, [t]);

  const selectedLabel = jobLabelByCode.get(value) ?? value;
  useEffect(() => setInputValue(selectedLabel), [selectedLabel]);

  const renderOptions = useMemo(
    () => toRenderOptions(allItems, inputValue),
    [allItems, inputValue],
  );
  const firstSelectableOption = useMemo(
    () => renderOptions.find((o) => !o.disabled && o.value !== ""),
    [renderOptions],
  );

  const selectJobCode = (jobCode: string) => {
    const label = jobLabelByCode.get(jobCode) ?? jobCode;
    setIsOpen(false);
    setInputValue(label);

    if (jobCode === value) return;
    onValueChange(jobCode);
  };

  const commitSelectionFromInput = () => {
    const exactCode = findExactJobCodeByInput(jobLabelByCode, inputValue);
    const nextValue = exactCode ?? firstSelectableOption?.value;
    if (!nextValue) return false;

    selectJobCode(nextValue);
    return true;
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setInputValue(selectedLabel);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [selectedLabel]);

  return (
    <div ref={containerRef} className="relative block">
      <input
        id={id}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          setInputValue("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsOpen(false);
            setInputValue(selectedLabel);
            return;
          }

          if (e.key === "Tab" && !e.shiftKey && isOpen) {
            if (commitSelectionFromInput()) {
              e.preventDefault();
            }
            return;
          }

          if (e.key === "Enter") {
            commitSelectionFromInput();
          }
        }}
        disabled={disabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        className={`w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 font-medium text-gray-700 text-sm shadow-sm transition-all duration-200 placeholder:text-gray-400 hover:border-gray-400 hover:bg-gray-50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700 dark:placeholder:text-gray-500 ${disabled ? "bg-gray-100 dark:bg-gray-750" : ""}`}
      />
      <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />

      {isOpen ? (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <ul className="max-h-64 overflow-auto py-1">
            {renderOptions.length === 0 ? (
              <li className="px-4 py-2 text-gray-500 text-sm dark:text-gray-400">
                {selectedLabel}
              </li>
            ) : (
              renderOptions.map((option) => {
                if (option.disabled) {
                  return (
                    <li
                      key={option.key}
                      className="px-4 py-2 font-semibold text-gray-500 text-xs dark:text-gray-400"
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
                      selectJobCode(option.value);
                    }}
                    className="cursor-pointer px-4 py-2 text-gray-700 text-sm hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    {option.label}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type OptionItem =
  | { type: "separator"; role: Role; label: string }
  | { type: "job"; role: Role; code: string; label: string };

type RenderOption = {
  key: string;
  role?: Role;
  label: string;
  value: string;
  disabled?: boolean;
};

function buildAllItems(t: ReturnType<typeof useTranslations>) {
  const items: OptionItem[] = [];
  for (const role of Object.keys(Job) as Role[]) {
    items.push({ type: "separator", role, label: t(`Role.${role}`) });
    for (const jobCode of Object.keys(Job[role])) {
      items.push({
        type: "job",
        role,
        code: jobCode,
        label: t(`Job.${role}.${jobCode}`),
      });
    }
  }
  return items;
}

function buildJobLabelByCode(allItems: OptionItem[]) {
  const map = new Map<string, string>();
  for (const item of allItems) {
    if (item.type === "job") {
      map.set(item.code, item.label);
    }
  }
  return map;
}

function toRenderOptions(allItems: OptionItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = (item: Extract<OptionItem, { type: "job" }>) => {
    if (normalizedQuery === "") return true;
    return (
      item.label.toLowerCase().includes(normalizedQuery) ||
      item.code.toLowerCase().includes(normalizedQuery)
    );
  };

  const filteredJobItems = allItems.filter(
    (item): item is Extract<OptionItem, { type: "job" }> =>
      item.type === "job" && matches(item),
  );
  const visibleRoles = new Set(filteredJobItems.map((j) => j.role));

  const renderOptions: RenderOption[] = [];
  for (const item of allItems) {
    if (item.type === "separator") {
      if (!visibleRoles.has(item.role)) continue;
      renderOptions.push({
        key: `sep-${item.role}`,
        role: item.role,
        label: item.label,
        value: "",
        disabled: true,
      });
      continue;
    }

    if (!matches(item)) continue;
    renderOptions.push({
      key: `job-${item.role}-${item.code}`,
      role: item.role,
      label: item.label,
      value: item.code,
    });
  }

  return renderOptions;
}

function findExactJobCodeByInput(
  jobLabelByCode: Map<string, string>,
  inputValue: string,
) {
  const normalized = inputValue.trim().toLowerCase();
  if (normalized === "") return;

  return Array.from(jobLabelByCode.keys()).find(
    (code) => code.toLowerCase() === normalized,
  );
}
