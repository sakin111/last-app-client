/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getCookie } from "../Auth/tokenHandler";
import { serverFetch } from "@/lib/server-fetch";




interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}




// export const adminGetAllUser = async (
//   params?: { [key: string]: string | string[] | undefined },
//     signal?: AbortSignal
// ): Promise<ApiResponse> => {
//   try {
//     let url = "/user/allUser";
    
//     if (params) {
//       const queryParams = new URLSearchParams();
      
//       Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined && value !== null && value !== '') {
//           queryParams.append(key, String(value));
//         }
//       });

//       const queryString = queryParams.toString();
//       if (queryString) {
//         url = `${url}?${queryString}`;
//       }
//     }



//     const res = await fetch(url,{ 
//       signal,
//       method: "GET",
//       headers: {
//         Cookie: await getCookie("accessToken") ? `accessToken=${await getCookie("accessToken")}` : ""
//       },
//       credentials: "include"
//     });
    
//     if (!res.ok) {
//       const errorData = await res.json().catch(() => ({}));
//       throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
//     }
    
//     const data = await res.json();
//     if (process.env.NODE_ENV === "development") {
//       console.log('Users data:', data);
//     }
    
//     return data;
//   } catch (error: any) {
//     if (process.env.NODE_ENV === "development") {
//       console.error("Error fetching users:", error);
//     }
//      if (error.name === "AbortError") {
//       throw error;
//      }
//     return { 
//       success: false, 
//       message: "Failed to fetch Users",
//       data: [],
//       meta: {
//         page: 1,
//         limit: 10,
//         total: 0,
//         totalPage: 0
//       }
//     };
//   }
// };



export const adminGetAllUser = async (
  signal?: AbortSignal
): Promise<ApiResponse> => {
  try {
    const accessToken = await getCookie("accessToken");
    const url = "/user/allUser";

    const res = await fetch(url, { 
      signal,
      method:"GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken}` : ""
      },
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    if (process.env.NODE_ENV === "development") {
      console.log('Users data:', data);
    }
    
    return data;
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching users:", error);
    }
    if (error.name === "AbortError") {
      throw error;
    }
    return { 
      success: false, 
      message: "Failed to fetch Users",
      data: [],
      meta: {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 0
      }
    };
  }
};


export const updateUserStatus = async (
  userId: string,
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED'
): Promise<ApiResponse> => {
  try {
    const accessToken = await getCookie("accessToken")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/${userId}/status`, {
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: accessToken ? `accessToken=${accessToken}` : ""

      },
      credentials: "include",
      body: JSON.stringify({ status })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      success: false,
      message: "Failed to update user status"
    };
  }
};

export const deleteUser = async (userId: string): Promise<ApiResponse> => {
  try {
    const accessToken = await getCookie("accessToken")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/delete/${userId}`, {
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: accessToken ? `accessToken=${accessToken}` : ""
      },
      credentials:"include"
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Failed to delete user"
    };
  }
};


export const getAllUserCount = async () => {
  try {
    const accessToken = await getCookie("accessToken")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user/allUserCount`, {
      method:"GET",
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken}` : ""
      },
      credentials:"include"
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error counting user:", error);
    return {
      success: false,
      message: "Failed to count user"
    };
  }
};