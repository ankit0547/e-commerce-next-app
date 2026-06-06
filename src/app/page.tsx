"use client";
import { useAppSelector } from "@/redux/hooks";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";

export default function Home() {
  const { isLoading } = useAppSelector((state) => state.ui);
  return <div className="container mx-auto">{/* <DashboardSidebar /> */}</div>;
}
