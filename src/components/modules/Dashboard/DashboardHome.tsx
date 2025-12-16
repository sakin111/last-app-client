/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { IconCoin } from '@tabler/icons-react';

import { User, Compass, LayoutDashboard } from "lucide-react";

export default function DashboardHome({ user }: { user: any }) {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <LayoutDashboard className="w-7 h-7" /> Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Welcome back, {user?.name || "User"}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/myProfile">
            <Card className="bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-neutral-600 transition cursor-pointer">
              <CardContent className="p-6 flex flex-col gap-4">
                <User className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">View or update your profile information</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/myTravel">
            <Card className="bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-neutral-600 transition cursor-pointer">
              <CardContent className="p-6 flex flex-col gap-4">
                <Compass className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold">My Travels</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Manage your travel posts and plans</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/subscriptionPlan">
            <Card className="bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-neutral-600 transition cursor-pointer">
              <CardContent className="p-6 flex flex-col gap-4">
                <IconCoin className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                <div>
                  <h2 className="text-lg font-semibold">Subscription</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Pick what you like and Go</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Admin Section */}
        {user?.role === "admin" && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Link href="/dashboard/users">
                <Card className="bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-neutral-600 transition cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">View and control user accounts</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/travels">
                <Card className="bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-neutral-600 transition cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Manage Travels</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Moderate travel plans posted by users</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
