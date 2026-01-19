/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { Loader2, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface SearchInputProps {
  placeholder?: string;
  paramName?: string;
  debounceMs?: number;
}

export function TravelSearchBar({
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

    if (debouncedValue.trim()) {
      params.set(paramName, debouncedValue);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.replace(
        params.toString()
          ? `?${params.toString()}`
          : window.location.pathname,
        { scroll: false }
      );
    });
  }, [debouncedValue, paramName, router]);


  const handleClear = () => {
    setValue("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete(paramName);
    params.delete("page");

    startTransition(() => {
      router.replace(
        params.toString()
          ? `?${params.toString()}`
          : window.location.pathname,
        { scroll: false }
      );
    });
  };

  return (
    <div className="w-full mx-auto bg-background sm:p-4">
      <div className="max-w-2xl mx-auto mb-8 px-4 sm:px-0">
        <div className="relative">
          <div className="flex items-center gap-3 px-4 py-3 rounded-full border-2 border-border bg-background shadow-sm hover:shadow-md transition-shadow focus-within:border-primary focus-within:shadow-lg">
            {isPending ? (
              <Loader2 className="w-5 h-5 text-primary animate-spin" />
            ) : (
              <Search className="w-5 h-5 text-muted-foreground" />
            )}

            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              disabled={isPending}
              className="flex-1 outline-none text-foreground placeholder-muted-foreground bg-transparent"
            />

            {value && !isPending && (
              <Button
                onClick={handleClear}
                variant="outline"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
