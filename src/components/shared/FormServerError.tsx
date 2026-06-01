import React from "react";
import { AlertCircle } from "lucide-react";

import { ApiErrorResponse } from "@/types/error.types";

type FormServerErrorProps = {
  error?: ApiErrorResponse | null;
  resetServerErrors?: () => void;
};

function FormServerError({ error, resetServerErrors }: FormServerErrorProps) {
  if (!error) {
    return null;
  }

  /**
   * Filter only non-field errors.
   *
   * Field errors should be displayed
   * by React Hook Form fields.
   */
  let globalErrors =
    error?.errors ||
    error?.errors?.filter((err) => err.errorKey === "unknown") ||
    [];

  /**
   * Prefer explicit global errors
   */
  const messages =
    globalErrors.length > 0
      ? globalErrors.map((err) => err.errorMessage)
      : [error.message];

  console.log("FormServerError messages:", error);

  const handleDismiss = () => {
    if (globalErrors.length > 0 && resetServerErrors) {
      globalErrors = [];
    }
  };

  return (
    <div className="space-y-2 rounded-md border border-red-200 bg-red-50 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex items-start gap-2 text-sm text-red-600"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

          <p>{message}</p>
        </div>
      ))}
    </div>
  );
}

export default FormServerError;
