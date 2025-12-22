/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";;
import { profileFetch } from "@/lib/profile-fetch";



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


export const adminGetAllUser = async (): Promise<ApiResponse> => {
    try {

        const res = await profileFetch.get("/user/allUser")
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        console.log(data, "this is from service");
        return data
    } catch (error) {
        console.error("Error fetching requests:", error);
        return { success: false, message: "Failed to fetch Users" };
    }
}


export const updateUserStatus = async (
  userId: string, 
  status: 'ACTIVE' | 'INACTIVE' | 'DELETED'
): Promise<ApiResponse> => {
  try {
    const res = await serverFetch.patch(`/user/${userId}/status`, {
      headers: {
        "Content-Type": "application/json"
      },
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
    const res = await serverFetch.delete(`/user/${userId}`, {
      headers: {
        "Content-Type": "application/json"
      }
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