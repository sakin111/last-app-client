"use client";

import { Suspense } from "react";
import PaymentCancel from "@/components/Shared/PaymentCancel";

function PaymentCancelContent() {
  return <PaymentCancel />;
}

const paymentCancelPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Processing...</div>}>
      <PaymentCancelContent />
    </Suspense>
  );
};

export default paymentCancelPage;