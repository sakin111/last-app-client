/* eslint-disable @typescript-eslint/no-explicit-any */



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
    method: "POST",
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      "Content-Type": "application/json",

    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to create plan");
  return await res.json();
};

export const getPlans = async () => {
  const accessToken = await getCookie("accessToken")
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/sub/getSub`,
    {
      method: "GET",
      headers:{
        cookie: accessToken ? `accessToken=${accessToken}` : "",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch plans");
  }

  return res.json();
};


export const getMyPlan = async () => {

  const accessToken = await getCookie("accessToken")
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/sub/myPlan`,
    {
      method: "GET",
      headers: {
        cookie: accessToken ? `accessToken=${accessToken}` : "",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch plans");
  }

  return res.json();
};


export const getAllSubCount = async () => {

  const accessToken = await getCookie("accessToken")
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/sub/allSub`,
    {
      method: "GET",
      headers: {
        cookie: accessToken ? `accessToken=${accessToken}` : "",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch subscriptions count");
  }

  return res.json();
};



export const checkSubscription = async () => {
try {
  const accessToken = await getCookie("accessToken");
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/travel/subscription-status`, {
    method: 'GET',
    headers: {
      cookie: accessToken ? `accessToken=${accessToken}` : '',
    },
    credentials: 'include',
  });
  const data = await response.json();
  
  if (data.success && data.data?.subscription?.paymentStatus === 'COMPLETED') {
    return true;
  }
  return false;
} catch (error) {
  console.error('Error checking subscription status:', error);
  return false;
}
};


