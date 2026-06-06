"use client";
import { useUserProfileQuery } from "@/queries/auth.query";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isSuccess, isError } = useUserProfileQuery({
    retry: false,
  });
  return children;
}
