/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { getCookie } from "@/services/Auth/tokenHandler";
import { serverFetch } from "@/lib/server-fetch";
import { TravelQuery, TravelResponse } from "@/Types";

const TravelValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  destination: z.string().min(2, "Destination must be at least 2 characters"),
  startDate: z.iso.datetime("Invalid start date format"),
  endDate: z.iso.datetime("Invalid end date format"),
  budgetRange: z.string(),
  travelType: z.string(),
  description: z.string().optional(),
  visibility: z.coerce.boolean().optional().default(true)
});

export const travelCreate = async (_currentState: any, formData: FormData): Promise<any> => {
  try {
    const accessToken = await getCookie("accessToken");

    if (!accessToken) {
      throw new Error("No Token provided");
    }


    const dataToValidate = {
      title: formData.get("title")?.toString() || "",
      destination: formData.get("destination")?.toString() || "",
      startDate: formData.get("startDate")?.toString() || "",
      endDate: formData.get("endDate")?.toString() || "",
      budgetRange: formData.get("budgetRange")?.toString() || "",
      travelType: formData.get("travelType")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      visibility: formData.get("visibility")?.toString() || "true"
    };

    const validatedData = TravelValidationSchema.safeParse(dataToValidate);
    
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message,
        }))
      };
    }

    const sendForm = new FormData();
    const validated = validatedData.data;

    sendForm.append("title", validated.title);
    sendForm.append("destination", validated.destination);
    sendForm.append("startDate", validated.startDate);
    sendForm.append("endDate", validated.endDate);
    sendForm.append("budgetRange", validated.budgetRange);
    sendForm.append("travelType", validated.travelType);
    if (validated.description) {
      sendForm.append("description", validated.description);
    }
    sendForm.append("visibility", String(validated.visibility));

    const files = formData.getAll("images") as File[];
    files.forEach((file) => sendForm.append("images", file));

    console.log("Sending to API...");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/travel/create-travel`, {
      method: "POST",
      body: sendForm,
      credentials: "include",
      headers: {
        'Cookie': `accessToken=${accessToken}`
      }
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();


    if (!result.success) {
      throw new Error(result.message || "Travel creation failed");
    }

    redirect("/travel");

  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    console.error("Travel creation error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Travel creation failed. Please try again.",
    };
  }
};

export const getAllTravels = async (): Promise<any> => {
  try {
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/travel/getTravel`, {
      cache: 'no-store'
    })
    const result = await res.json()
    return result;
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const myTravel = async (): Promise<any> => {
  try {
  
    const res = await serverFetch.get(`/travel/myTravel`, {
      cache: 'no-store'
    })
    const result = await res.json()
    if(!result.data){
      return []
    }
    return result;
  } catch (error) {
    console.error(error)
    throw error
  }
}


export const UpdateMyTravel = async (travelId: string, formData: any): Promise<any> => {
  try {
 const res = await serverFetch.patch(`/travel/${travelId}`, {
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
  cache: "no-store" 
});

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const DeleteMyTravelById = async (travelId:string): Promise<any> => {
  try {
  
    const res = await serverFetch.delete(`/travel/${travelId}`, {
      cache: 'no-store'
    })
    const result = await res.json()
    return result;
  } catch (error) {
    console.error(error)
    throw error
  }
}




export async function getTravels(
  query: TravelQuery
): Promise<TravelResponse<any>> {

  const accessToken = await getCookie("accessToken")

  const params = new URLSearchParams({
    page: query.page ?? "1",
    limit: query.limit ?? "10",
    search: query.search ?? "",
    sortBy: query.sortBy ?? "createdAt",
    sortOrder: query.sortOrder ?? "desc",
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/travel/getAll?${params.toString()}`,
    {
      method: "GET",
      headers:{
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      },
      cache:"no-cache"
    }
    
  );

  if (!res.ok) {
    throw new Error("Failed to fetch travel plans");
  }

  return res.json();
}



