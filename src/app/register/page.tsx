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
import Textfield from "@/components/shared/header/TextField/Textfield";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import {
  useCheckEmailExistsMutation,
  useCheckUsernameExistsMutation,
  useRegisterMutation,
} from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import FormServerError from "@/components/shared/FormServerError";
import { ApiErrorResponse } from "@/types/error.types";

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<ApiErrorResponse | null>(null);

  const {
    control,
    handleSubmit,
    reset: resetForm,
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

  console.log("Parent Render");
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

  const usernameExists = isUsernameAvailable?.exists;
  console.log("username Check:", usernameExists);

  // const serverErrors = registerError;
  console.log("Register Error:", registerError);
  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await mutateAsync(data);
      // resetRegisterMutation();
      resetUsernameCheck();
      resetEmailCheck();

      /**
       * Optional:
       * reset form values here
       */
      resetForm();
    } catch (error) {
      setServerError(error as ApiErrorResponse);
    }
    // router.push("/login");
  };

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleOnUsernameChange = (value: string) => {
    // console.log("Username change:", value, timeoutRef);
    /**
     * Always clear previous timeout
     */
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const trimmedValue = value.trim();

    /**
     * Skip API call when:
     * - empty
     * - removing text
     * - less than 3 chars
     */
    if (trimmedValue.length < 3) {
      resetUsernameCheck();
      return;
    }

    /**
     * Debounced API call
     */
    timeoutRef.current = setTimeout(() => {
      checkUsernameExists({ username: trimmedValue });
    }, 500);
  };
  const handleOnEmailChange = (value: string) => {
    // console.log("Username change:", value, timeoutRef);
    /**
     * Always clear previous timeout
     */
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const trimmedValue = value.trim();

    /**
     * Skip API call when:
     * - empty
     * - removing text
     * - less than 3 chars
     */
    if (trimmedValue.length < 3) {
      resetEmailCheck();
      return;
    }

    if (!trimmedValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      resetEmailCheck();
      return;
    }

    /**
     * Debounced API call
     */
    timeoutRef.current = setTimeout(() => {
      checkEmailExists({ email: trimmedValue });
    }, 500);
  };

  const getAvailabilityIcon = (
    isLoading: boolean,
    response?: { exists: boolean },
  ) => {
    if (isLoading) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }

    if (!response) {
      return null;
    }

    return response.exists ? (
      <X className="h-4 w-4 text-red-500" />
    ) : (
      <Check className="h-4 w-4 text-green-500" />
    );
  };
  return (
    <div className="flex items-center justify-center ">
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 rounded-xl border p-6 mx-auto"
        >
          <FieldSet>
            <TypographyH1 text="Register" />
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
                <FieldLegend className="text-center">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </FieldLegend>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FormServerError error={serverError} />

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
          <TypographyH1 text="Registration Successful!" />
          <TypographySmall text="Your account has been created successfully. You can now log in." />
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
