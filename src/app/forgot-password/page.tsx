"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH1 } from "@/components/ui/typography";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import Textfield from "@/components/shared/TextField/Textfield";
import FormServerError from "@/components/shared/FormServerError";

import {
  forgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/schemas/forgot-password.schema";
import { useForgotPasswordMutation } from "@/queries/auth.query";
import { ApiErrorResponse } from "@/types/error.types";

export default function ForgotPasswordPage() {
  const { control, handleSubmit } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const {
    mutate: forgotPassword,
    isPending: isForgotPasswordLoading,
    isSuccess,
    data,
    error: forgotPasswordError,
    reset: resetForgotPasswordError,
  } = useForgotPasswordMutation();

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    console.log(data);
    await forgotPassword(data);
  };

  console.log("isSuccess:", isSuccess, data, forgotPasswordError);

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center">
        <div className="mx-auto mt-10 w-full max-w-md rounded-xl border p-6 text-center">
          <TypographyH1 label="Check Your Email" />

          <FieldDescription className="mt-3">
            We&apos;ve sent a password reset link to your email address.
          </FieldDescription>

          <p className="mt-4 text-sm text-muted-foreground">
            If an account exists with that email, you&apos;ll receive reset
            instructions shortly.
          </p>

          <Button asChild className="mt-6 w-full">
            <Link href="/login">Back to Login</Link>
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
          <TypographyH1 label="Forgot Password" />

          <FieldDescription>
            Enter your email address and we&apos;ll send you a password reset
            link.
          </FieldDescription>

          <FieldGroup>
            <Textfield
              control={control}
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              name="email"
              onFieldChange={() => resetForgotPasswordError()}
            />
          </FieldGroup>
        </FieldSet>

        <FormServerError
          error={forgotPasswordError as ApiErrorResponse | null}
        />

        <Button disabled={isForgotPasswordLoading} size="lg" className="w-full">
          {isForgotPasswordLoading ? (
            <>
              <Spinner className="mr-2" />
              Sending Link...
            </>
          ) : (
            "Send Reset Link"
          )}
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
