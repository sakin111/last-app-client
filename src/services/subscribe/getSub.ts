"use server"

import { getCookie } from "../Auth/tokenHandler";


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