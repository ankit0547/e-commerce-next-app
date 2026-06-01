"use client";
import { useUserProfileQuery } from "@/queries/auth.query";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useEffect } from "react";

function Dashboard() {
  const { data: userProfile, isLoading, error } = useUserProfileQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userProfile?.data) {
      dispatch(setUser(userProfile.data.user));
    }
  }, [userProfile, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  console.log("User Profile:", userProfile);
  return <div>Dashboard</div>;
}

export default Dashboard;
