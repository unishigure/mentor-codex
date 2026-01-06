"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | "ellipsis";

/**
 * Build a compact page list that renders exactly seven items (numbers or ellipses) when there are many pages.
 */
function buildPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages === 0) return null;

  const pageItems = buildPageItems(currentPage, totalPages);

  const goToPrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const goToNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3">
      <button
        type="button"
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="rounded-lg bg-white p-2 text-neutral-700 shadow transition-colors hover:bg-neutral-100 disabled:cursor-default disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="size-5" />
      </button>

      <div className="flex items-center gap-1">
        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: stable static separator rendering
              key={`ellipsis-${index}`}
              type="button"
              disabled
              className="min-w-8 cursor-default rounded-lg bg-white px-3 py-1.5 font-medium text-neutral-400 text-sm shadow dark:bg-neutral-700 dark:text-neutral-500"
              aria-hidden="true"
              tabIndex={-1}
            >
              ...
            </button>
          ) : (
            <button
              type="button"
              key={item}
              onClick={() => onPageChange(item)}
              className={`min-w-8 cursor-pointer rounded-lg px-3 py-1.5 font-medium text-sm transition-colors ${
                currentPage === item
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white text-neutral-700 shadow hover:bg-neutral-100 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="rounded-lg bg-white p-2 text-neutral-700 shadow transition-colors hover:bg-neutral-100 disabled:cursor-default disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
        aria-label="Next page"
      >
        <ChevronRightIcon className="size-5" />
      </button>
    </div>
  );
}
