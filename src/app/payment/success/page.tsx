"use client";

import { Suspense } from "react";
import PaymentSuccess from "@/components/Shared/PaymentSuccess";

function PaymentSuccessContent() {
  return <PaymentSuccess />;
}

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Processing...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;