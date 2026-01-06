/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  Compass,
  TrendingUp,
} from "lucide-react";

import ActivityBarCard from "@/components/Shared/ActivityBarCard";
import ActivityLineChart from "@/components/Shared/ActivityLineCard";





export default function AdminHome({ users,sub, travels }: any) {

  
  const totalUsers = typeof users?.data === "number" ? users.data : 0;
  const totalSubscriptions = typeof sub?.data === "number" ? sub.data : 0;
  const totalTravels = Array.isArray(travels?.data) ? travels.data : [];



    const activityData = [

    { label: "Travels", value: totalTravels.length },
    { label: "Users", value: totalUsers },
    { label: "Subscriptions", value: totalSubscriptions },
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
             Admin DashBoard Control
            </p>
          </div>

  
        </header>

    
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard title="Travel Created" value={totalTravels.length} trend="" />
          <StatCard title="User Count" value={totalUsers} trend="" />
         <StatCard title="Subscription Count" value={totalSubscriptions} trend="" />

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
