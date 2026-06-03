import { z } from "zod";

export const editProfileSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "First name must contain only letters",
    ),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  // .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Last name must contain only letters"),

  username: z
    .string()
    .nonempty("Username is required")
    .min(2, "Username must be at least 2 characters")
    .max(10, "Username must be less than 10 characters")
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Username must contain only letters, numbers, and underscores",
    ),
  email: z
    .string()
    .nonempty("Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
    .email("Invalid email address"),
  address: z.object({
    address1: z
      .string()
      .nonempty("Address 1 is required")
      .min(2, "Username must be at least 2 characters")
      .max(50, "Username must be less than 50 characters"),
    address2: z.string(),
    country: z.string(),
    state: z.string(),
    city: z.string(),
    postalCode: z.string().max(6, "Postal code cannot be mode than 6 digit"),
  }),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;
