"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH1 } from "@/components/ui/typography";

import Textfield from "@/components/shared/TextField/Textfield";
import FormServerError from "@/components/shared/FormServerError";

import Link from "next/link";

import {
  resetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/schemas/reset-password.schema";
import PasswordRule from "@/components/shared/PasswordRule";
import { useResetPasswordMutation } from "@/queries/auth.query";
import { ApiErrorResponse } from "@/types/error.types";
import { useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const { control, handleSubmit, watch } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const {
    mutateAsync: resetPassword,
    isPending: isResetting,
    error: resetError,
    isSuccess,
    reset: resetServerError,
  } = useResetPasswordMutation();

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    await resetPassword({ ...data, resetToken: params.resetToken as string });
  };

  const passwordChecks = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = Object.values(passwordChecks).filter(Boolean).length;

  const getStrength = () => {
    if (strengthScore <= 2)
      return {
        label: "Weak",
        color: "bg-red-500",
      };

    if (strengthScore <= 4)
      return {
        label: "Medium",
        color: "bg-yellow-500",
      };

    return {
      label: "Strong",
      color: "bg-green-500",
    };
  };

  const strength = getStrength();

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center">
        <div className="mx-auto mt-10 w-full max-w-md rounded-xl border p-6 text-center">
          <TypographyH1 label="Password Updated" />

          <FieldDescription className="mt-3">
            Your password has been reset successfully.
          </FieldDescription>

          <p className="mt-4 text-sm text-muted-foreground">
            For security reasons, please use your new password the next time you
            sign in.
          </p>

          <Button asChild className="mt-6 w-full">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-10 w-full max-w-md space-y-4 rounded-xl border p-6"
      >
        <FieldSet>
          <TypographyH1 label="Reset Password" />

          <FieldDescription>
            Create a new password for your account.
          </FieldDescription>

          <FieldGroup>
            <Textfield
              control={control}
              label="New Password"
              placeholder="Enter new password"
              type="password"
              name="password"
              onFieldChange={() => resetServerError()}
            />

            <Textfield
              control={control}
              label="Confirm Password"
              placeholder="Confirm new password"
              type="password"
              name="confirmPassword"
              onFieldChange={() => resetServerError()}
            />
          </FieldGroup>
        </FieldSet>

        {/* Password Requirements */}
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLegend>Password Strength</FieldLegend>

              {/* Strength Bar */}
              <div className="mb-4">
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-2 rounded-full transition-all ${strength.color}`}
                    style={{
                      width: `${(strengthScore / 5) * 100}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-sm font-medium">{strength.label}</p>
              </div>

              {/* Requirements */}
              <div className="rounded-md bg-muted p-3 text-sm">
                <ul className="space-y-2">
                  <PasswordRule
                    valid={passwordChecks.minLength}
                    text="At least 8 characters"
                  />

                  <PasswordRule
                    valid={passwordChecks.uppercase}
                    text="One uppercase letter"
                  />

                  <PasswordRule
                    valid={passwordChecks.lowercase}
                    text="One lowercase letter"
                  />

                  <PasswordRule
                    valid={passwordChecks.number}
                    text="One number"
                  />

                  <PasswordRule
                    valid={passwordChecks.specialChar}
                    text="One special character"
                  />
                </ul>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FormServerError error={resetError as ApiErrorResponse | null} />

        <Button type="submit" size="lg" className="w-full">
          {isResetting ? "Resetting..." : "Reset Password"}
        </Button>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLegend className="text-center">
                Remember your password?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </FieldLegend>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
