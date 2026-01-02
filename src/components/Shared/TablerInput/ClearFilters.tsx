"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface ClearFiltersProps {
  preserveParams?: string[];
}

export function ClearFilters({ preserveParams = [] }: ClearFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClearFilters = () => {
    const params = new URLSearchParams();
    
    preserveParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) params.set(param, value);
    });
    
    router.push(`?${params.toString()}`);
  };

  const hasFilters = Array.from(searchParams.keys()).some(
    (key) => !preserveParams.includes(key) && key !== "page" && key !== "limit"
  );

  if (!hasFilters) return null;

  return (
    <button
      onClick={handleClearFilters}
      className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted transition-colors"
    >
      <X className="h-4 w-4" />
      Clear Filters
    </button>
  );
}