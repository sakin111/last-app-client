/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginator } from "@/components/Shared/Paginator";
import {
  ClearFilters,
  DateRangeFilter,
  FilterSelect,
  SearchInput,
  SortSelect,
  TableFilterBar,
} from "@/components/Shared/TablerInput";
import { TravelMeta } from "@/Types";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTravels } from "@/services/Dashboard/travel.service";

interface Travel {
  id: string;
  title: string;
  destination: string;
  travelType: string;
  budgetRange: string;
  startDate: string;
  endDate: string;
  isExpired: boolean;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Travel[];
  meta?: TravelMeta;
}

export default function TravelsClient() {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [meta, setMeta] = useState<TravelMeta | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const abortControllerRef = useRef<AbortController | null>(null);

  const queryKey = useMemo(() => searchParams.toString(), [searchParams]);


  const fetchTravels = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsRefreshing(true);

    try {
      const params: Record<string, string> = {};
      searchParams.forEach((v, k) => (params[k] = v));

      const res: ApiResponse = await getAllTravels(params, controller.signal);

      if (res?.success) {
        setTravels(res.data ?? []);
        setMeta(res.meta ?? null);
      } else {
        setTravels([]);
        toast.error(res?.message || "Failed to fetch travels");
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        toast.error("Unexpected error");
        console.error(e);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [queryKey, searchParams]);

  useEffect(() => {
    fetchTravels();
    return () => abortControllerRef.current?.abort();
  }, [fetchTravels]);

  // -------------------------
  // Pagination (same logic)
  // -------------------------
  const onPageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) params.delete("page");
      else params.set("page", String(page));

      router.replace(params.toString() ? `?${params.toString()}` : "", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  return (
    <section className="space-y-6">
      {/* Filters */}
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

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto">
          <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>User Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Manage all registered users</p>
            </div>
            {isRefreshing && (
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Updating...
              </div>
            )}
          </div>
        </CardHeader>
        </Card>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Travel Type</th>
              <th className="p-4 text-left">Budget</th>
              <th className="p-4 text-left">Start</th>
              <th className="p-4 text-left">End</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading && travels.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  Loading travels...
                </td>
              </tr>
            ) : travels.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No travels found
                </td>
              </tr>
            ) : (
              travels.map((travel) => (
                <tr key={travel.id} className="border-b hover:bg-muted/50">
                  <td className="p-4 font-medium">{travel.title}</td>
                  <td className="p-4">{travel.destination}</td>
                  <td className="p-4 capitalize">{travel.travelType}</td>
                  <td className="p-4">{travel.budgetRange}</td>
                  <td className="p-4">
                    {new Date(travel.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {new Date(travel.endDate).toLocaleDateString()}
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

      
      {travels.length > 0 && meta && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing {(meta.page - 1) * meta.limit + 1} –{" "}
            {Math.min(meta.page * meta.limit, meta.total)} of {meta.total}
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
