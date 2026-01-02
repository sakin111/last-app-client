/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TravelMeta} from "@/Types";
import { getAllRequests } from "@/services/Dashboard/travel-comments.service";


export default function AllRequests() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 10);

  const [data, setData] = useState<any>([]);
  const [meta, setMeta] = useState<TravelMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await getAllRequests({ page, limit });
        console.log(res);
        if (!isMounted) return;

        setData(res.data);
        setMeta(res.meta);
      } catch (err) {
        if (!isMounted) return;
        setError("Something went wrong while loading requests.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page, limit]);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    params.set("limit", String(limit));

    router.push(`?${params.toString()}`);
  };

  

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading requests…</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (!data.length) {
    return <p className="text-sm text-muted-foreground">No requests found.</p>;
  }

  return (
    <div className="space-y-6">
      {/* TABLE */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item : any) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.travelPlan.title}</td>
                <td className="px-4 py-2">{item.user.email}</td>
                <td className="px-4 py-2">{item.travelPlan.travelType}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {meta && (
        <div className="flex items-center justify-between text-sm">
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={meta.page === 1}
              onClick={() => goToPage(meta.page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={meta.page === meta.totalPages}
              onClick={() => goToPage(meta.page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
