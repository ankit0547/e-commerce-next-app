"use client";
import { useAppSelector } from "@/redux/hooks";

export default function Home() {
  const { isLoading } = useAppSelector((state) => state.ui);
  return <div className="container mx-auto">HOme</div>;
}
