"use client";

import { ReactNode } from "react";

interface TableFilterBarProps {
  children: ReactNode;
}

export function TableFilterBar({ children }: TableFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
      {children}
    </div>
  );
}