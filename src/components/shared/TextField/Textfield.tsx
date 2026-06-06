import React from "react";

import { Control, FieldValues, Path, useController } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type TextfieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  label: string;
  name: Path<TFormValues>;
  type?: string;
  placeholder?: string;
  withLabel?: boolean;
  handleChange?: (value: string) => void;
  icon?: React.ReactNode;
  onFieldChange?: () => void;
};

function Textfield<TFormValues extends FieldValues>({
  control,
  label,
  name,
  type = "text",
  placeholder,
  withLabel = true,
  handleChange,
  icon,
  onFieldChange,
}: TextfieldProps<TFormValues>) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <Field className="w-full">
      {withLabel && <FieldLabel htmlFor={name}>{label}</FieldLabel>}

      <div className="relative">
        <Input
          id={name}
          value={field.value ?? ""}
          name={field?.name}
          ref={field?.ref}
          onBlur={field?.onBlur}
          type={type === "password" && isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          onChange={(e) => {
            field.onChange(e);
            onFieldChange?.();
            handleChange?.(e.target.value);
          }}
        />

        {icon && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}

        {type === "password" && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        )}
      </div>

      <FieldError
        errors={
          error
            ? [
                {
                  message: error.message,
                },
              ]
            : []
        }
      />
    </Field>
  );
}

export default Textfield;
