"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SubsButton, { Plan } from "./SubButton";
import { getPlans } from "@/services/subscribe/getSub";

export default function Subscription() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true)
        const res = await getPlans();
        if (res.success) {
          const plans = res.data;
          setPlans(plans);
          setLoading(false)
        }
      } catch (error) {
        console.error(error);
        setError("failed to load the subscription plan")
      }
    };

    fetchPlans();
  }, []);


  return (
    <section className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Simple, transparent pricing
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your needs. Cancel anytime.
          </p>
        </div>


        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-foreground" />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 font-medium">{error}</div>
        )}

        {!loading && !error && plans.length === 0 && (
          <div className="text-center text-muted-foreground">No subscription plans available.</div>
        )}


        {!loading && plans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div className="animate-fade-in" key={index}>
                <Card className="relative h-full rounded-2xl border border-border shadow-sm hover:shadow-lg transition bg-card text-card-foreground">

                  {index === 0 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}

                  <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {plan.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {plan.description || "Access all premium features"}
                    </p>
                  </CardHeader>

                  <CardContent className="flex flex-col items-center justify-between gap-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-foreground">
                        ${plan.price}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {plan.duration} days access
                      </p>
                    </div>

                    <SubsButton
                      plan={plan}
                    />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
