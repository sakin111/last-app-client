/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface SortOption {
  label: string;
  value: string;
  order?: "asc" | "desc";
}

interface SortSelectProps {
  options: SortOption[];
  defaultSort?: string;
}

export function SortSelect({ options, defaultSort }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();


  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || defaultSort || ""
  );


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const currentSort = searchParams.get("sort") || defaultSort || "";

    if (selectedSort === currentSort) return;

    if (selectedSort) {
      params.set("sort", selectedSort);
      params.set("page", "1"); 
    } else {
      params.delete("sort");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  
  }, [selectedSort, router]);

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <select
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        disabled={isPending}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Default Sort</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

