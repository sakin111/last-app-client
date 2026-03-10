/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getAIAdventureRecommendations = async () => {
    try {
        const res = await serverFetch.get("/travel/ai-recommendation", {
            next: {
                tags: ["ai-recommendations"],
                revalidate: 3600,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch AI recommendations: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("AI Recommendation Error:", error);
        return {
            success: false,
            message: "Could not fetch AI recommendations at this time.",
            data: [],
        };
    }
};

export const askAIAdventure = async (message: string) => {
    try {
        const res = await serverFetch.post("/travel/ask-ai", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        console.error("Ask AI Error:", error);
        return {
            success: false,
            message: error.message || "Something went wrong while asking AI.",
        };
    }
};
