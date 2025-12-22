/* eslint-disable @typescript-eslint/no-explicit-any */



import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "../Auth/tokenHandler";



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

   const accessToken = await getCookie("accessToken");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/sub`, {
    method:"POST",
    headers: { 
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      "Content-Type": "application/json",

    },
    credentials:"include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create plan");
  return await res.json();
};

export const getPlans = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/sub/getSub`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch plans");
  }

  return res.json();
};



