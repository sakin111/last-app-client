"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/services/Auth/tokenHandler";
import { createRequest as createRequestService } from "@/services/Dashboard/travel-comments.service";



const RequestButton = ({ travelId, checkSub }: { travelId: string, checkSub?: boolean }) => {
  const router = useRouter();

  const handleRequest = async () => {
    const token = await getCookie("accessToken");

    if (!token) {
      toast.error("Please login to send a request");
      router.push("/login");
      return;
    }

    if (!checkSub) {
      toast("You need an active subscription to send a request");
      router.push("/subscription");
      return;
    }


    const result = await createRequestService(travelId);

    if (result.success) {
      toast.success("Request sent successfully!");
    } else {
      toast.error(result.message || "Failed to send request");
    }
  };

  return (
    <Button onClick={handleRequest}>Request</Button>
  );
};

export default RequestButton;
