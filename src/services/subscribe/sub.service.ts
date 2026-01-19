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
  const res = await serverFetch.post(`/sub/create`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || "Failed to create plan");
  return data;
};

export const getMyPlan = async () => {
  const res = await serverFetch.get("/sub/myPlan", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch plans");
  }

  return res.json();
};


export const getAllSubCount = async () => {
  const res = await serverFetch.get("/sub/allSub", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subscriptions count");
  }

  return res.json();
};

export const checkSubscription = async () => {
  try {
    const response = await serverFetch.get("/travel/subscription-status", {
      cache: "no-store",
    });
    const data = await response.json();

    const paymentStatus = data.data?.subscription?.paymentStatus;
    if (data.success && paymentStatus) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    return false;
  }
};


