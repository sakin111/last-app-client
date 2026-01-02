"use client";

import { Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DateRangeFilterProps {
  startDateName?: string;
  endDateName?: string;
  label?: string;
}

export function DateRangeFilter({ 
  startDateName = "startDate", 
  endDateName = "endDate",
  label = "Date Range"
}: DateRangeFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const startDate = searchParams.get(startDateName) || "";
  const endDate = searchParams.get(endDateName) || "";

  const handleDateChange = (name: string, value: string) => {
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
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">{label}:</span>
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleDateChange(startDateName, e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Start Date"
      />
      <span className="text-sm text-muted-foreground">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => handleDateChange(endDateName, e.target.value)}
        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="End Date"
      />
    </div>
  );
}