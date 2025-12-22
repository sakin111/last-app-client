/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { redirectToStripeCheckout } from "@/services/subscribe/stripe";


export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  stripeId: string;
}

interface SubsButtonProps {
  plan: Plan;
}

export default function SubsButton({ plan }: SubsButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await redirectToStripeCheckout({
         stripePriceId: plan.stripeId,
         planId: plan.id,
      });
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error?.message || "Something went wrong during checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
      {plan.description && <p className="text-sm mb-4">{plan.description}</p>}
      <p className="text-md font-medium mb-4">${plan.price} / {plan.duration} days</p>

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
