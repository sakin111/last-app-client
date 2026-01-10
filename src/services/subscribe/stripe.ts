/* eslint-disable @typescript-eslint/no-explicit-any */


import { serverFetch } from "@/lib/server-fetch";


interface CheckoutParams {
 stripePriceId: string;
planId: string;
}

export const redirectToStripeCheckout = async (
  params: CheckoutParams
) => {
  try {
    const res = await serverFetch.post(
      `/payment/checkout-session`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(params),
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error(data.message);

    const checkoutUrl = data.data.url;
    if (!checkoutUrl) throw new Error("No checkout URL returned");

   window.location.href = checkoutUrl;
   
  } catch (err: any) {
    console.error("Stripe redirect error:", err.message);
  }
};
