/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCookie } from "../Auth/tokenHandler";
import { ApiResponse } from "./admin.service";

export const adminGetAllUser = async (
  signal?: AbortSignal
): Promise<ApiResponse> => {
  try {
    const accessToken = await getCookie("accessToken");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/allUser`,
      {
        method: "GET",
        signal,
        headers: {
          Cookie: accessToken ? `accessToken=${accessToken}` : "",
        },
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
