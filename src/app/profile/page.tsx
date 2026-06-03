"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import Textfield from "@/components/shared/TextField/Textfield";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectField from "@/components/shared/Select/Select";
import ConfirmDialog from "@/components/shared/ConfirmDialog/ConfirmDialog";
import { editProfileSchema } from "@/schemas/editProfile.schema";
import { useProfileUpdateMutation } from "@/queries/user.query";

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
type EditProfileForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  address: {
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
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
  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isDirty, dirtyFields },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      address: {
        address1: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
      },
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const getProfileFormValues = (user: User) => ({
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    email: user?.email,
    address: {
      address1: user?.address?.address1,
      address2: user?.address?.address2,
      country: user?.address?.country,
      state: user?.address?.state,
      city: user?.address?.city,
      postalCode: user?.address?.postalCode,
    },
  });

  useEffect(() => {
    resetForm(getProfileFormValues(user));
  }, [user, resetForm]);

  const {
    mutateAsync: updateProfile,
    isPending: isLoggingIn,
    data: updateProfileData,
    isSuccess,
    error: loginError,
    reset: resetLogin,
  } = useProfileUpdateMutation();

  const onSubmit = (data: EditProfileForm) => {
    debugger;
    updateProfile(data);
    // login(data);
  };

  // const onError = (ee) => {
  //   console.log("eeeeee", ee);
  // };

  console.log("updateProfileData", updateProfileData);

  if (!user) {
    return <ProfileSkeleton />;
  }
  console.log("edit", isDirty);
  return (
    <div className="container mx-auto max-w-5xl p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <Image
                src={user?.avatar?.url}
                alt={user?.firstName}
                width={100}
                height={100}
                className="rounded-full border"
              />

              <div className="flex-1">
                <h1 className="text-3xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>

                <p className="text-muted-foreground">@{user?.username}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {user?.status}
                  </span>

                  {user?.isEmailVerified ? (
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
                {!isEdit && (
                  <Button onClick={() => setEdit((p) => !p)}>
                    Edit Profile
                  </Button>
                )}

                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Personal Information</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {!isEdit && (
                <InfoItem label="First Name" value={user?.firstName} />
              )}

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

              {!isEdit && <InfoItem label="Last Name" value={user?.lastName} />}
              {isEdit && (
                <Textfield
                  control={control}
                  label="Last Name"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  // onFieldChange={() => resetRegisterMutation()}
                />
              )}

              {!isEdit && <InfoItem label="Username" value={user?.username} />}
              {isEdit && (
                <Textfield
                  control={control}
                  label="Username"
                  placeholder="Username"
                  type="text"
                  name="username"
                  // onFieldChange={() => resetRegisterMutation()}
                />
              )}

              {!isEdit && <InfoItem label="Email" value={user?.email} />}
              {isEdit && (
                <Textfield
                  control={control}
                  label="Email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  // onFieldChange={() => resetRegisterMutation()}
                />
              )}
            </div>
          </div>

          {/* Address */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Address Information</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {!isEdit && (
                <InfoItem
                  label="Address Line 1"
                  value={user?.address?.address1 || "-"}
                />
              )}

              {!isEdit && (
                <InfoItem
                  label="Address Line 2"
                  value={user?.address?.address2 || "-"}
                />
              )}
              {!isEdit && (
                <InfoItem
                  label="Country"
                  value={user?.address?.country || "-"}
                />
              )}
              {!isEdit && (
                <InfoItem label="State" value={user?.address?.state || "-"} />
              )}
              {!isEdit && (
                <InfoItem label="City" value={user?.address?.city || "-"} />
              )}
              {!isEdit && (
                <InfoItem
                  label="Postal Code"
                  value={user?.address?.postalCode || "-"}
                />
              )}

              {isEdit && (
                <Textfield
                  control={control}
                  label="Address 1"
                  placeholder="Address 1"
                  type="text"
                  name={"address.address1"}
                  // onFieldChange={() => resetRegisterMutation()}
                />
              )}
              {isEdit && (
                <Textfield
                  control={control}
                  label="Address 2"
                  placeholder="Address 2"
                  type="text"
                  name="address.address2"
                  // onFieldChange={() => resetRegisterMutation()}
                />
              )}

              {isEdit && (
                <SelectField
                  control={control}
                  label="Country"
                  name="address.country"
                  placeholder="Select Country"
                  options={[
                    {
                      label: "India",
                      value: "india",
                    },
                    {
                      label: "UK",
                      value: "uk",
                    },
                    {
                      label: "US",
                      value: "us",
                    },
                  ]}
                />
              )}
              {isEdit && (
                <SelectField
                  control={control}
                  label="State"
                  name="address.state"
                  placeholder="Select State"
                  options={[
                    {
                      label: "Uttar Pradesh",
                      value: "up",
                    },
                    {
                      label: "New Delhi",
                      value: "nd",
                    },
                    {
                      label: "Punjab",
                      value: "pb",
                    },
                  ]}
                />
              )}
              {isEdit && (
                <SelectField
                  control={control}
                  label="City"
                  name="address.city"
                  placeholder="Select City"
                  options={[
                    {
                      label: "Agra",
                      value: "ag",
                    },
                    {
                      label: "Mathura",
                      value: "mth",
                    },
                  ]}
                />
              )}

              {isEdit && (
                <Textfield
                  control={control}
                  label="Postal code"
                  placeholder="Postal code"
                  type="text"
                  name="address.postalCode"
                  // onFieldChange={() => resetRegisterMutation()}
                />
              )}
            </div>
          </div>

          {isEdit && (
            <div className="flex justify-end gap-2">
              {!isDirty && (
                <Button variant="outline" onClick={() => setEdit((p) => !p)}>
                  Cancel
                </Button>
              )}
              {isDirty && (
                <ConfirmDialog
                  title="Discard Changes"
                  description="You have unsaved changes. Do you want to discard them?"
                  confirmText="Discard"
                  onConfirm={() => {
                    resetForm();
                    setEdit(false);
                  }}
                  trigger={<Button variant="outline">Cancel</Button>}
                />
              )}

              {isDirty && <Button type="submit">Save</Button>}
            </div>
          )}

          {/* Account Info */}
          {/* <div className="rounded-xl border bg-card p-6 shadow-sm">
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
        </div> */}
        </div>
      </form>
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
