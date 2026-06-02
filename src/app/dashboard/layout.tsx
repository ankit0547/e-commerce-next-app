"use client";
import { useUserProfileQuery } from "@/queries/auth.query";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";
import ProfileSkeleton from "./profile/page";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useUserProfileQuery();
  const user = data?.user;
  console.log("data", data);
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load profile</div>;
  }

  return children;
}
