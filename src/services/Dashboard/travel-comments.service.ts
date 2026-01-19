/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

import { serverFetch } from "@/lib/server-fetch";

import { TravelResponse } from "@/Types";
import { getCookie } from "../Auth/tokenHandler";


const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;


export const createRequest = async (travelPlanId: string) => {
  try {
    const accessToken = await getCookie("accessToken");
    const res = await fetch(`${baseUrl}/request/createRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: accessToken ? `accessToken=${accessToken}` : "",
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

interface GetRequestsParams {
  page: number;
  limit: number;
}

export async function getAllRequests(
  params: GetRequestsParams
): Promise<TravelResponse<any>> {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });

  const res = await serverFetch.get(`/request/getAll?${query.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch requests");
  }

  return res.json();
}
export const getRequestsForMyPlans = async () => {
  try {
    const res = await serverFetch.get("/request/my/plans", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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

    const res = await serverFetch.patch(`/request/${requestId}/status`, {
      headers: {
        "Content-Type": "application/json",
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
    const res = await serverFetch.get("/review/getAll", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();
    if (process.env.NODE_ENV === "development") {
      console.log(result, "this is review");
    }
    return result;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching reviews:", error);
    }
    return { success: false, message: "Failed to fetch reviews" };
  }
};

export const getIndividualR = async (page: number = 1, limit: number = 10) => {
  try {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const res = await serverFetch.get(`/review/individual?${query.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!result?.data) {
      if (!result.success) {
        throw new Error(result.message || "Unauthorized");
      }
      return { success: false, message: "Unauthorized", data: [] };
    }

    return result;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return {
      success: false,
      message: "Failed to fetch reviews",
    };
  }
};


export const getReviewById = async (reviewId: string) => {
  try {
    const res = await serverFetch.get(`/review/${reviewId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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
    const res = await serverFetch.get(`/review/${travelId}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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

