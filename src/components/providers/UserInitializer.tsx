"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserProfileQuery } from "@/queries/auth.query";
import { useAppDispatch } from "@/redux/hooks";
import { logoutAction, setUser } from "@/redux/features/auth/authSlice";

export default function UserInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const { data, isSuccess, isError } = useUserProfileQuery({
    enabled: !!accessToken,
    retry: false,
  });

  useEffect(() => {
    if (!accessToken) {
      dispatch(logoutAction());
      return;
    }

    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }

    if (isError) {
      dispatch(logoutAction());
      router.replace("/login");
    }
  }, [accessToken, data, isSuccess, isError, dispatch, router]);

  return <>{children}</>;
}
