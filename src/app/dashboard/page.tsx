"use client";

import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";

export default function DashboardPage() {
  return (
    <>
      {/* <Header /> */}
      <div className="space-y-4 p-6">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <DashboardSidebar />
      </div>
    </>
  );
}
