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

export const commentSchema = z.object({
  content: z.string().min(1, {message: "Please add a comment"})
})

export type CommentModel = z.infer<typeof commentSchema>;
export type LoginModel = z.infer<typeof loginSchema>;
export type RegisterModel = z.infer<typeof registerSchema>;

//Articles
export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export type Category = {
  id: number;
  documentId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export type Comment = {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user: User;
  category: Category;
  comments: Comment[];
};

export type ApiResponse = {
  data: Article[];
};