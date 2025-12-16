"use client";

import { serverFetch } from "@/lib/server-fetch";
import { useState } from "react";
import { Button } from "../ui/button";


export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  stripeId: string;
}

interface SubscribeFormProps {
  priceId: string;
  plan: Plan
}


export default function SubsButton({ priceId, plan }: SubscribeFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await serverFetch.post("/payment/checkout-session", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripePriceId: priceId, plan: plan.name }),
      });

      const data = await res.json();
      if (data?.data?.sessionUrl) {
        window.location.href = data.data.sessionUrl;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">

      <Button
        onClick={handleSubscribe}
        disabled={loading}
        variant="default"
      >
        {loading ? "Redirecting..." : "Subscribe Now"}
      </Button>
    </div>
  );
}
