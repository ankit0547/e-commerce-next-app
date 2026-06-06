"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.replace("/login");
  //   }
  // }, [isLoading, isAuthenticated, router]);
  return (
    <>
      {/* <UserInitializer> */}
      <div className="container mx-auto">{children}</div>
      {/* </UserInitializer> */}
    </>
  );
}
