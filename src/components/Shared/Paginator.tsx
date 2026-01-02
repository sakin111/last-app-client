"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginatorProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

type PageItem = number | "ellipsis";

export function Paginator({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginatorProps) {

  const paginationRange = React.useMemo<PageItem[]>(() => {
    if (totalPages <= 1) return [];

    const range: PageItem[] = [];

    const startPage = Math.max(2, page - siblingCount);
    const endPage = Math.min(totalPages - 1, page + siblingCount);

    range.push(1);

    if (startPage > 2) range.push("ellipsis");

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPages - 1) range.push("ellipsis");

    range.push(totalPages);

    return range;
  }, [page, totalPages, siblingCount]);

  if (totalPages <= 1) return null;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  return (
    <Pagination className={cn("w-full", className)}>
      <PaginationContent className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page === 1}
            onClick={() => goToPage(page - 1)}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {paginationRange.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                isActive={item === page}
                aria-current={item === page ? "page" : undefined}
                onClick={() => goToPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            aria-disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
            className={
              page === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
