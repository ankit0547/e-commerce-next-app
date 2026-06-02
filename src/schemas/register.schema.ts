import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(100, "First name must be less than 100 characters")
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "First name must contain only letters",
    ),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(100, "Last name must be less than 100 characters"),
  // .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Last name must contain only letters"),

  username: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(100, "Username must be less than 100 characters")
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Username must contain only letters, numbers, and underscores",
    ),
  email: z
    .string()
    .nonempty("Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/\d/, "Must contain a number")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
