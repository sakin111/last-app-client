/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "@/services/Auth/tokenHandler";

export const getUserProfile = async () => {
  try {
    const token = await getCookie("accessToken");
    if (!token) throw new Error("Unauthorized");

    const res = await serverFetch.get(`/user/me`, {
      cache: "no-store"
    });

    if (!res.ok) throw new Error("Failed");

    const result = await res.json();
    return result.data;
    
  } catch (err) {
    console.error("Error fetching profile:", err);
    return null;
  }
};

export const updateProfile = async (form :any) => {
  try {
    const res = await serverFetch.patch(`/user/update-profile`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) throw new Error("Failed");

    const json = await res.json();
    return { success: true, data: json.data };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false };
  }
};


export const updateProfileImage = async (formData: FormData) => {
  try {


    const res = await serverFetch.patch(`/user/update-profileImage`, {
      body: formData,
    });

    if (!res.ok) throw new Error("Failed");

    const json = await res.json();
    return { success: true, data: json.data };
  } catch {
    return { success: false };
  }
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {


    const res = await serverFetch.post(`/auth/change-password`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      return { success: false, message: error.message };
    }

    return { success: true };
  } catch {
    return { success: false };
  }
};
