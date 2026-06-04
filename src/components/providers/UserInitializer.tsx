"use client";

import { useEffect } from "react";

import { useUserProfileQuery } from "@/queries/auth.query";

import { useAppDispatch } from "@/redux/hooks";

import { setUser, logoutAction } from "@/redux/features/auth/authSlice";

export default function UserInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const { data, isSuccess, isError, isLoading } = useUserProfileQuery({
    retry: false,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(logoutAction());
    }
  }, [data, isSuccess, isError, isLoading, dispatch]);

  return children;
}
