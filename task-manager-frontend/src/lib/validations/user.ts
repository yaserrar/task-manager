import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Minimum 8 characters" }),
});

export const signupSchema = z
  .object({
    name: z.string().min(4, { message: "Username is too short" }),
    email: z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Minimum 8 characters" }),
    password_confirm: z.string().min(8, { message: "Minimum 8 characters" }),
  })
  .refine((obj) => obj.password == obj.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
