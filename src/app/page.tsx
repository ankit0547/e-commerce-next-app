// import Header from "@/components/shared/header/Header";
"use client";
import { useEffect } from "react";
import { useUserProfileQuery } from "@/queries/auth.query";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, setLoadingProfile } from "@/redux/features/auth/authSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data: userDetails, isLoading } = useUserProfileQuery();
  // const user =

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(setLoadingProfile(isLoading));

  //     if (userDetails?.user) {
  //       dispatch(setUser(userDetails?.user));
  //     }

  //     dispatch(setLoadingProfile(false));
  //   }
  // }, [userDetails, dispatch, isLoading, user]);
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(setUser(userDetails?.user));
  //   }
  //   if (isLoading) {
  //     dispatch(setLoadingProfile(true));
  //   }
  // }, [user, dispatch, userDetails?.user]);
  return <main></main>;
}
