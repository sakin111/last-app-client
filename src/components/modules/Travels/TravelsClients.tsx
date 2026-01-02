/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Paginator } from "@/components/Shared/Paginator";
import { ClearFilters, DateRangeFilter, FilterSelect, SearchInput, SortSelect, TableFilterBar } from "@/components/Shared/TablerInput";
import { TravelMeta } from "@/Types";
import { useRouter, useSearchParams } from "next/navigation";

interface TravelsClientProps {
  travels: any[];
  meta: TravelMeta;
}

export default function TravelsClient({
  travels,
  meta,
}: TravelsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <section className="space-y-6">

       <TableFilterBar>
        <SearchInput placeholder="Search travels..." />
        
        <SortSelect
          options={[
            { label: "Newest First", value: "-createdAt" },
            { label: "Oldest First", value: "createdAt" },
            { label: "Title A-Z", value: "title" },
            { label: "Title Z-A", value: "-title" },
            { label: "Budget Low-High", value: "budgetRange" },
            { label: "Budget High-Low", value: "-budgetRange" },
          ]}
          defaultSort="-createdAt"
        />
        
        <FilterSelect
          name="travelType"
          label="Travel Type"
          options={[
            { label: "SOLO", value: "SOLO" },
            { label: "GROUP", value: "GROUP" },
            { label: "FRIENDS", value: "FRIENDS" },

          ]}
          placeholder="All Types"
        />
        
        <FilterSelect
          name="isExpired"
          label="Status"
          options={[
            { label: "Active", value: "false" },
            { label: "Expired", value: "true" },
          ]}
          placeholder="All Status"
        />
        
        <DateRangeFilter 
          startDateName="startDate"
          endDateName="endDate"
          label="Travel Dates"
        />
        
        <ClearFilters preserveParams={["limit"]} />
      </TableFilterBar>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left font-medium">Title</th>
              <th className="p-4 text-left font-medium">Destination</th>
              <th className="p-4 text-left font-medium">Travel Type</th>
              <th className="p-4 text-left font-medium">Budget Range</th>
              <th className="p-4 text-left font-medium">Start Date</th>
              <th className="p-4 text-left font-medium">End Date</th>
              <th className="p-4 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {travels.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg
                      className="h-12 w-12 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium text-muted-foreground">
                      No travels found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      There are no travel plans to display at the moment.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              travels.map((travel) => (
                <tr key={travel.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{travel.title}</td>
                  <td className="p-4">{travel.destination}</td>
                  <td className="p-4 capitalize">{travel.travelType || "N/A"}</td>
                  <td className="p-4">{travel.budgetRange || "N/A"}</td>
                  <td className="p-4">
                    {travel.startDate
                      ? new Date(travel.startDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    {travel.endDate
                      ? new Date(travel.endDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        travel.isExpired
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {travel.isExpired ? "Expired" : "Active"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {travels.length > 0 && (
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>{(meta.page - 1) * meta.limit + 1}</strong> –{" "}
            <strong>{Math.min(meta.page * meta.limit, meta.total)}</strong> of{" "}
            <strong>{meta.total}</strong>
          </p>

          <Paginator
            page={meta.page}
            totalPages={meta.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </section>
  );
}