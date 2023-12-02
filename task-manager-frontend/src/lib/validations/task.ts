import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title is required" })
    .max(200, { message: "200 caracteres max" }),
  description: z
    .string({ required_error: "Description is required" })
    .max(400, { message: "400 caracteres max" }),
  status: z.string({ required_error: "Status is required" }),
});

export type TaskSchema = z.infer<typeof taskSchema>;
