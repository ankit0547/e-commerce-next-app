"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useLoginMutation } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import FormServerError from "@/components/shared/FormServerError";
import { ApiErrorResponse } from "@/types/error.types";
import Textfield from "@/components/shared/TextField/Textfield";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    mutateAsync: login,
    isPending: isLoggingIn,
    data: loginData,
    isSuccess,
    error: loginError,
    reset: resetLogin,
  } = useLoginMutation();
  const onSubmit = (data: LoginSchemaType) => {
    login(data);
  };

  // const user = loginData?.user;

  useEffect(() => {
    if (isSuccess && loginData) {
      //  Update the auth state with user data
      router.push("/");
    }
  }, [isSuccess, router, loginData, dispatch]);

  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 rounded-xl border p-6 mx-auto mt-10"
      >
        <FieldSet>
          <TypographyH1 label="Login" />
          <FieldDescription>Login to your account</FieldDescription>
          <FieldGroup>
            <Textfield
              control={control}
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              onFieldChange={() => resetLogin()}
            />

            <Textfield
              label="Password"
              placeholder="Password"
              type="password"
              name="password"
              control={control}
              onFieldChange={() => resetLogin()}
            />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLegend className="text-left">
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot your password?
                </Link>
              </FieldLegend>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLegend className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:underline"
                >
                  Register
                </Link>
              </FieldLegend>
            </Field>
          </FieldGroup>
        </FieldSet>

        <FormServerError error={loginError as ApiErrorResponse | null} />

        <Button disabled={isLoggingIn} size="lg" className="w-full">
          {isLoggingIn ? (
            <>
              <Spinner className="mr-2" /> Loading...{" "}
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
}
