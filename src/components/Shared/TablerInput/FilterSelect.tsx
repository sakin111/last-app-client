"use client";

import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  name: string;
  label: string;
  options: FilterOption[];
  placeholder?: string;
}

export function FilterSelect({ 
  name, 
  label, 
  options, 
  placeholder = "All" 
}: FilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(name) || "";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(name, value);
      params.set("page", "1"); 
    } else {
      params.delete(name);
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <select
        value={currentValue}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
