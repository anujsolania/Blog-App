import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinSchema, signupSchema } from "@anujsolania/common";



const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_KEY: string
    }
}>()

userRouter.get("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL	,
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany({})

    return c.json({users})
})

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signupSchema.safeParse(body)
    if (!success) {
        return c.json({mssg: "invalid inputs"})
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password
            }
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_KEY);
        return c.json({ jwt });
    } catch(e) {
        console.log(e)
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
})

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signinSchema.safeParse(body)
    if (!success) {
        return c.json({mssg: "invalid inputs"})
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })
        if (!user) {
            c.status(403)
            return c.json({mssg: "user doesn't exist"})
        }
        const jwt = await sign({id: user.id},c.env.JWT_KEY)
        return c.json({mssg: "Login successfull",jwt})

    } catch (error) {
        c.status(403)
        console.log(error)
        return c.json({mssg: "signin error"})
    }
})

export default userRouter
