import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createBlog = z.object({
    title: z.string().min(4,{message: "Title's too short"}),
    content: z.string().min(20,{message: "Content's too short"})
})

export const updateBlog = z.object({
    title: z.string().optional(),
    content: z.string().optional()
})

export type signupType = z.infer<typeof signupSchema>
export type signinType = z.infer<typeof signinSchema>
export type createBlogType = z.infer<typeof createBlog>
export type updateBlogType = z.infer<typeof updateBlog>




