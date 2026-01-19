/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TravelMeta } from "@/Types";
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
      <Card className="border-border bg-card text-card-foreground">
        <CardContent className="p-0 overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Email</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((item: any) => (
                <tr key={item.id} className="hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3 align-middle">{item.travelPlan.title}</td>
                  <td className="px-4 py-3 align-middle">{item.user.email}</td>
                  <td className="px-4 py-3 align-middle">{item.travelPlan.travelType}</td>
                  <td className="px-4 py-3 align-middle">
                    <Badge variant="outline" className="capitalize">
                      {item.status.toLowerCase()}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* PAGINATION */}
      {meta && (
        <div className="flex items-center justify-between text-sm px-1">
          <span className="text-muted-foreground">
            Page <span className="font-medium text-foreground">{meta.page}</span> of <span className="font-medium text-foreground">{meta.totalPages}</span>
          </span>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === 1}
              onClick={() => goToPage(meta.page - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={meta.page === meta.totalPages}
              onClick={() => goToPage(meta.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
