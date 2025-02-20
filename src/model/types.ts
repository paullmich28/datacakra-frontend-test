import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Field can't be empty" }),
  password: z.string().min(8, { message: "Field must be 8 characters or more" })
})

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string().min(1, { message: "Field can't be empty" }),
  password: z.string().min(8, { message: "Field must be 8 characters or more" }),
  confirmPassword: z.string().min(8, { message: "Field must be 8 characters or more" })
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords don't match",
      path: ["password"],
    });

    ctx.addIssue({
      code: "custom",
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});

export type LoginModel = z.infer<typeof loginSchema>;
export type RegisterModel = z.infer<typeof registerSchema>;
