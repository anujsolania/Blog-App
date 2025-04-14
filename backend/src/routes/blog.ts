import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";


const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_KEY: string
    }
}>()

blogRouter.post("/", async (c) => {
    return c.text("hello hono!")
})

blogRouter.put("/", async (c) => {
    return c.text("hello hono!")
})

blogRouter.get("/:id", async (c) => {
    return c.text("hello hono!")
})

blogRouter.get("/bulk", async (c) => {
    return c.text("hello hono!")
})


export default blogRouter
