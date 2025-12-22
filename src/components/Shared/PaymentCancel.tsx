"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCancel() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard"); 
    }, 2000);
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {loading ? (
        <p className="text-lg font-medium">Processing your canceled payment…</p>
      ) : (
        <p className="text-lg font-medium text-red-600">
          Payment canceled
        </p>
      )}
    </div>
  );
}
