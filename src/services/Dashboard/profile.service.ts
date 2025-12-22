/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";




import { serverFetch } from '@/lib/server-fetch';


export async function getUserProfile() {
  try {

  
    const response = await serverFetch.get(`/user/me`, {
      headers: {
        'Content-Type': 'application/json',
      },
       cache:"no-store"
    });

    if (!response.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null; 
  }
}
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
