/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "@/services/Auth/tokenHandler";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;


export const createRequest = async (travelPlanId: string) => {
  try {
    const res = await serverFetch.post(`/request/createRequest`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ travelPlanId }),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error creating request:", error);
    return { success: false, message: error.message };
  }
};


export const getAllRequests = async () => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("No Token provided");
    }

    const res = await fetch(`${baseUrl}/request/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching requests:", error);
    return { success: false, message: "Failed to fetch requests" };
  }
};

export const getRequestsForMyPlans = async () => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("No Token provided");
    }

    const res = await fetch(`${baseUrl}/request/my/plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching requests for my plans:", error);
    return { success: false, message: "Failed to fetch requests" };
  }
};

export const updateRequestStatus = async (
  requestId: string,
  status: string
) => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("No Token provided");
    }

    const res = await fetch(`${baseUrl}/request/${requestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error updating request status:", error);
    return { success: false, message: error.message || "Failed to update request status" };
  }
};





export const getAllReviews = async () => {
  try {
    const res = await fetch(`${baseUrl}/review/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return { success: false, message: "Failed to fetch reviews" };
  }
};

export const getReviewById = async (reviewId: string) => {
  try {
    const res = await fetch(`${baseUrl}/review/${reviewId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching review:", error);
    return { success: false, message: "Failed to fetch review" };
  }
};


export const getReviews = async (travelId: string) => {
  try {
    const res = await fetch(`${baseUrl}/review/${travelId}/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return { success: false, message: "Failed to fetch reviews" };
  }
};

export const addReview = async (targetId: string, rating: number, content: string) => {
  try {

    const res = await serverFetch.post(`/review/${targetId}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, content }),
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error adding review:", error);
    return { success: false, message: error.message };
  }
};

