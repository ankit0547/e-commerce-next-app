"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../../../redux/hooks";
import { useState } from "react";
import Textfield from "@/components/shared/TextField/Textfield";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Address = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type Avatar = {
  url: string;
};

type User = {
  address: Address;
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  avatar: Avatar;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

export function ProfileSkeleton() {
  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Skeleton className="h-24 w-24 rounded-full" />

            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-32" />

              <div className="flex gap-2">
                <Skeleton className="h-7 w-20 rounded-full" />
                <Skeleton className="h-7 w-32 rounded-full" />
              </div>
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="rounded-xl border p-6">
          <Skeleton className="mb-6 h-7 w-56" />

          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Address Information */}
        <div className="rounded-xl border p-6">
          <Skeleton className="mb-6 h-7 w-56" />

          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-2 h-4 w-28" />
                <Skeleton className="h-5 w-48" />
              </div>
            ))}
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-xl border p-6">
          <Skeleton className="mb-6 h-7 w-56" />

          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth as { user: User });
  const [isEdit, setEdit] = useState(false);
  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(loginSchema),
    defaultValues: { firstName: user?.firstName ?? "" },
  });

  if (!user) {
    return <ProfileSkeleton />;
  }

  console.log("edit", isEdit);
  return (
    <div className="container mx-auto max-w-5xl p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <Image
              src={user?.avatar.url}
              alt={user?.firstName}
              width={100}
              height={100}
              className="rounded-full border"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold">
                {user.firstName} {user.lastName}
              </h1>

              <p className="text-muted-foreground">@{user.username}</p>

              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {user.status}
                </span>

                {user.isEmailVerified ? (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    Verified
                  </span>
                ) : (
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Email Not Verified
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setEdit((p) => !p)}>Edit Profile</Button>

              <Button variant="outline">Change Password</Button>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {!isEdit && <InfoItem label="First Name" value={user.firstName} />}

            {isEdit && (
              <Textfield
                control={control}
                label="First Name"
                placeholder="First Name"
                type="text"
                name="firstName"
                // onFieldChange={() => resetRegisterMutation()}
              />
            )}

            <InfoItem label="Last Name" value={user.lastName} />

            <InfoItem label="Username" value={user.username} />

            <InfoItem label="Email" value={user.email} />
          </div>
        </div>

        {/* Address */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Address Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem
              label="Address Line 1"
              value={user.address.address1 || "-"}
            />

            <InfoItem
              label="Address Line 2"
              value={user.address.address2 || "-"}
            />

            <InfoItem label="City" value={user.address.city || "-"} />

            <InfoItem label="State" value={user.address.state || "-"} />

            <InfoItem label="Country" value={user.address.country || "-"} />

            <InfoItem
              label="Postal Code"
              value={user.address.postalCode || "-"}
            />
          </div>
        </div>

        {/* Account Info */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Account Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoItem label="Status" value={user.status} />

            <InfoItem
              label="Email Verified"
              value={user.isEmailVerified ? "Yes" : "No"}
            />

            <InfoItem
              label="Member Since"
              value={new Date(user.createdAt).toLocaleDateString()}
            />

            <InfoItem
              label="Last Updated"
              value={new Date(user.updatedAt).toLocaleDateString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="font-medium">{value}</p>
    </div>
  );
}

export default ProfilePage;
