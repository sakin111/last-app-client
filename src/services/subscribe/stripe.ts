/* eslint-disable @typescript-eslint/no-explicit-any */

// import { getCookie } from "../Auth/tokenHandler";

interface CheckoutParams {
 stripePriceId: string;
planId: string;
}

export const redirectToStripeCheckout = async (
  params: CheckoutParams
) => {
  try {
    //  const accessToken = await getCookie("accessToken");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/payment/checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
