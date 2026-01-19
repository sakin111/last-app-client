/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/services/Auth/tokenHandler";
import { createRequest } from "@/services/Dashboard/travel-comments.service";
import { useState } from "react";



const RequestButton = ({ travelId, checkSub }: { travelId: string; checkSub?: any }) => {

  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    try {
      setLoading(true);

      const token = await getCookie("accessToken");

      if (!token) {
        toast.error("Please login to send a request");
        return;
      }
        if (!checkSub) {
              toast("you must subscribe to post a review");
              return;
           }

      const result = await createRequest(travelId);

      if (result?.success) {
        toast.success("Request sent successfully!");
      } else {
        toast.error(result?.message || "Failed to send request");
        console.error("Request error:", result);
      }
    } catch (error) {
      console.error("Request error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleRequest} disabled={loading}>
      {loading ? "Sending..." : "Request"}
    </Button>
  );
};

export default RequestButton;
