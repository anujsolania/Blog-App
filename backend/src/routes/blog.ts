import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlog, updateBlog } from "@anujsolania/common";


const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_KEY: string
    },
    Variables: {
        userid: number
    }
}>()

blogRouter.use("/*", async (c,next) => {
    try {
        const jwt = c.req.header("Authorization") || ""
        const payload = await verify(jwt,c.env.JWT_KEY)
        
        c.set("userid",Number(payload.id))
        await next()
    } catch (error) {
        return c.json({mssg: "you are not logged in"})
    }
})

blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userid = c.get("userid")
    const body = await c.req.json()

    const { success } = createBlog.safeParse(body)
    if (!success) {
        return c.json({mssg: "invalid inputs"})
    }
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userid
            }
        })
        return c.json({mssg: "blog created", id: blog.id})
    } catch (error) {
        console.log(error)
        return c.text("error while creating blog")
    }
})

blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const userid = c.get("userid")
    const body = await c.req.json()
    const { success } = updateBlog.safeParse(body)
    if (!success) {
        return c.json({mssg: "invalid inputs"})
    }
    try {
        const blog = await prisma.blog.update({
            where: {
                id: Number(body.id)
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({mssg: "blog updated", id: blog.id})
    } catch (error) {
        console.log(error)
        return c.text("error while updating blog")
    }
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    
    try {
        const blogs = await prisma.blog.findMany({})
        return c.json({blogs})
    } catch (error) {
        console.log(error)
        return c.text("error while fetching blogs")
    }
})

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogid = c.req.param("id")
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(blogid)
            }
        })
        return c.json({blog})
    } catch (error) {
        console.log(error)
        return c.text("error while fetching the blog")
    }
})



export default blogRouter
