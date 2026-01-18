/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { ApiResponse } from "./admin.service";

export const adminGetAllUser = async (
  signal?: AbortSignal
): Promise<ApiResponse> => {
  try {

    const res = await serverFetch.get(
      `/user/allUser`,
      {
        signal,
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch users");
    }

    return res.json();
  } catch (error: any) {
    if (error.name === "AbortError") throw error;

    return {
      success: false,
      message: "Failed to fetch Users",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 0,
      },
    };
  }
};
