/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { getCookie } from "./tokenHandler";
import { UserInfo } from "@/Types";
import { serverFetch } from "@/lib/server-fetch";



export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {

        const response = await serverFetch.get("/user/me", {
        cache: 'no-store',
        })

        const result = await response.json();


        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }


            userInfo = {
                id: result.data.id || "User Id",
                name: result.data.name || "Unknown User",
                email: result.data.email,
                role: result.data.role,
            }
        }



        return userInfo;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "",
            email: "",
            role: "PATIENT",
        };
    }

}