import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type Option = {
  label: string;
  value: string;
};

type SelectFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>;
  label: string;
  name: Path<TFormValues>;
  placeholder?: string;
  options: Option[];
  withLabel?: boolean;
  onFieldChange?: () => void;
};

function SelectField<TFormValues extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  options,
  withLabel = true,
  onFieldChange,
}: SelectFieldProps<TFormValues>) {
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

      <Select
        value={field.value}
        onValueChange={(value) => {
          field.onChange(value);
          onFieldChange?.();
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

export default SelectField;
