"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographySmall } from "@/components/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchemaType } from "@/schemas/register.schema";
import {
  FieldSet,
  Field,
  FieldGroup,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import Textfield from "@/components/shared/TextField/Textfield";
import { useRef } from "react";
import { Check, Loader2, X } from "lucide-react";
import {
  useCheckEmailExistsMutation,
  useCheckUsernameExistsMutation,
  useRegisterMutation,
} from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import FormServerError from "@/components/shared/FormServerError";
import { ApiErrorResponse } from "@/types/error.types";
import PasswordRule from "@/components/shared/PasswordRule";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset: resetForm,
    watch,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    mutateAsync,
    isPending: isRegistering,
    isSuccess,
    error: registerError,
    reset: resetRegisterMutation,
  } = useRegisterMutation();

  const {
    mutate: checkUsernameExists,
    isPending: isCheckingUsername,
    data: isUsernameAvailable,
    reset: resetUsernameCheck,
  } = useCheckUsernameExistsMutation();

  const {
    mutate: checkEmailExists,
    isPending: isCheckingEmail,
    data: isEmailAvailable,
    reset: resetEmailCheck,
  } = useCheckEmailExistsMutation();

  const onSubmit = async (data: RegisterSchemaType) => {
    await mutateAsync(data);
    resetUsernameCheck();
    resetEmailCheck();
    resetForm();
  };

  const debouncedUsernameCheck = useCallback(
    debounce((username: string) => {
      checkUsernameExists({ username });
    }, 500),
    [],
  );

  const handleOnUsernameChange = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length < 3) {
      debouncedUsernameCheck.cancel();
      resetUsernameCheck();
      return;
    }

    debouncedUsernameCheck(trimmedValue);
  };
  useEffect(() => {
    return () => {
      debouncedUsernameCheck.cancel();
    };
  }, [debouncedUsernameCheck]);

  const debouncedEmailCheck = useMemo(
    () =>
      debounce((email: string) => {
        checkEmailExists({ email });
      }, 500),
    [checkEmailExists],
  );

  const handleOnEmailChange = (value: string) => {
    const trimmedValue = value.trim();

    // Minimum length check
    if (trimmedValue.length < 3) {
      debouncedEmailCheck.cancel();
      resetEmailCheck();
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedValue)) {
      debouncedEmailCheck.cancel();
      resetEmailCheck();
      return;
    }

    // Debounced API call
    debouncedEmailCheck(trimmedValue);
  };

  useEffect(() => {
    return () => {
      debouncedEmailCheck.cancel();
    };
  }, [debouncedEmailCheck]);

  const getAvailabilityIcon = (
    isLoading: boolean,
    response?: { exists: boolean },
  ) => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (!response) return null;
    return response.exists ? (
      <X className="h-4 w-4 text-red-500" />
    ) : (
      <Check className="h-4 w-4 text-green-500" />
    );
  };

  const password = watch("password");
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
  return (
    <div className="flex items-center justify-center ">
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 rounded-xl border p-6 mx-auto"
        >
          <FieldSet>
            <TypographyH1 label="Register" />
            <FieldDescription>Create a new account</FieldDescription>
            <FieldGroup>
              <Textfield
                control={control}
                label="First Name"
                placeholder="First Name"
                type="text"
                name="firstName"
                onFieldChange={() => resetRegisterMutation()}
              />

              <Textfield
                control={control}
                label="Last Name"
                placeholder="Last Name"
                type="text"
                name="lastName"
                onFieldChange={() => resetRegisterMutation()}
              />
              <div className="relative">
                <Textfield
                  control={control}
                  label="Username"
                  placeholder="Username"
                  type="text"
                  name="username"
                  handleChange={(e) => handleOnUsernameChange(e)}
                  onFieldChange={() => resetRegisterMutation()}
                  icon={getAvailabilityIcon(
                    isCheckingUsername,
                    isUsernameAvailable,
                  )}
                />
              </div>

              <div className="relative">
                <Textfield
                  control={control}
                  label="Email"
                  placeholder="Email"
                  type="email"
                  name="email"
                  handleChange={(e) => handleOnEmailChange(e)}
                  onFieldChange={() => resetRegisterMutation()}
                  icon={getAvailabilityIcon(isCheckingEmail, isEmailAvailable)}
                />
              </div>

              <Textfield
                control={control}
                label="Password"
                placeholder="Password"
                type="password"
                name="password"
                onFieldChange={() => resetRegisterMutation()}
              />
            </FieldGroup>
          </FieldSet>
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
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLegend className="text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </FieldLegend>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FormServerError error={registerError as ApiErrorResponse | null} />

          <Button disabled={isRegistering} size="lg" className="w-full">
            {isRegistering ? (
              <>
                <Spinner className="mr-2" /> Loading...{" "}
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      )}

      {isSuccess && (
        <div className="w-full max-w-md space-y-4 rounded-xl border p-6 mx-auto text-center">
          <Check className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <TypographyH1 label="Registration Successful!" />
          <TypographySmall label="Your account has been created successfully. You can now log in." />
          <Button
            onClick={() => router.push("/login")}
            size="lg"
            className="w-full"
          >
            Go to Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
