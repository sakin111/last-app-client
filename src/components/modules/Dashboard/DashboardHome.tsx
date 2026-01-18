/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Compass,
  TrendingUp,
} from "lucide-react";

import ActivityBarCard from "@/components/Shared/ActivityBarCard";
import ActivityLineChart from "@/components/Shared/ActivityLineCard";





export default function DashboardHome({ user, review, travel, Subscribed }: any) {



  const reviewsR = review?.data?.reviews || [];
  const travels = Array.isArray(travel?.data) ? travel.data : [];
  const subscribe = Subscribed ? Subscribed.data : [];

    console.log(Subscribed);




  const activityData = [
    { label: "Reviews", value: reviewsR.length },
    { label: "Travels", value: travels.length },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight">
              <LayoutDashboard className="w-7 h-7 text-zinc-700 dark:text-zinc-300" />
              Overview
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Welcome back, {user?.name ?? "User"}
            </p>
          </div>


        </header>


        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Review Count" value={reviewsR.length} trend="" />
          <StatCard title="Travel Created" value={travels.length} trend="" />
          <Card className="border border-zinc-200/60 dark:border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Subscription Status
                  </p>

                  <p
                    className={cn(
                      "mt-2 text-2xl font-semibold tracking-tight font-sans",
                      subscribe?.subscription?.paymentStatus
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {subscribe?.subscription?.paymentStatus
                      ? "Subscribed"
                      : "No Plan"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium",
                    subscribe?.subscription?.paymentStatus
                      ? "border-emerald-200 text-emerald-600 dark:border-emerald-900 dark:text-emerald-400"
                      : "border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                  )}
                >
                  {subscribe?.subscription?.paymentStatus ? "ACTIVE" : "INACTIVE"}
                </Badge>
              </div>
            </CardContent>
          </Card>


        </section>


        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <ActivityBarCard
            title="Your Activity overview"
            data={activityData}
          />
          <ActivityLineChart
            title="Your Activity overview"
            data={activityData}
          />


          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Quick Actions</h2>

              <div className="space-y-3">
                <ActionLink href="/travel" icon={Users} label="Find Travelers" />
                <ActionLink href="/dashboard/createTravel" icon={Compass} label="Create New Trip" />
                <ActionLink href="/howItWorks" icon={TrendingUp} label="How It Works" />
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}


function StatCard({
  title,
  value,
  trend,
}: {
  title: string;
  value: number | string;
  trend?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p>
        <div className="flex items-end justify-between mt-2">
          <span className="text-2xl font-semibold">{value}</span>
          <Badge variant="secondary" className="text-xs">{trend}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}


function ActionLink({ href, icon: Icon, label }: any) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-md border px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
