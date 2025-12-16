/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";


export interface CreateCheckoutPayload {
  priceId: string;
  plan: string;
}




export interface PlanPayload {
  name: string;
  price: number;
  stripeId: string;
  duration: number;
}

export const createPlan = async (payload: PlanPayload) => {
  const res = await serverFetch.post("/sub", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create plan");
  return res.json();
};

export const getPlans = async () => {
  const res = await serverFetch.get("/sub");
  if (!res.ok) throw new Error("Failed to fetch plans");
  return res.json();
};


