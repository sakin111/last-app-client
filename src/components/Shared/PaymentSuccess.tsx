"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    // optional: verify session (NOT required if webhook is used)
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <p className="text-lg font-medium">Finalizing your subscription…</p>
      ) : (
        <p className="text-lg font-medium text-green-600">
          Subscription activated 🎉
        </p>
      )}
    </div>
  );
}
