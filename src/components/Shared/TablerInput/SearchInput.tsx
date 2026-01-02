/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition, SetStateAction } from "react";



interface SearchInputProps {
  placeholder?: string;
  paramName?: string;
  debounceMs?: number;
}

export function SearchInput({
  placeholder = "Search...",
  paramName = "searchTerm",
  debounceMs = 500,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState(searchParams.get(paramName) || "");
  const debouncedValue = useDebounce(value, debounceMs);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialValue = searchParams.get(paramName) || "";


    if (debouncedValue === initialValue) return;

    if (debouncedValue) {
      params.set(paramName, debouncedValue);
      params.set("page", "1"); 
    } else {
      params.delete(paramName);
      params.delete("page");    
    }

    startTransition(() => {
      router.replace(params.toString() ? `?${params.toString()}` : "", { scroll: false });
    });

  }, [debouncedValue, paramName, router]);

  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        value={value}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
}

