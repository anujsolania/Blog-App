import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinSchema, signupSchema } from "@anujsolania/common";
import { compare, hash } from "bcryptjs";




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
        const userCheck = await prisma.user.findFirst({ 
            where: {
                email: body.email 
            }
         })
        if (userCheck) {
            return c.json({ mssg: "Email already registered" })
        }
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: await hash(body.password, 10),
            }
        });
        
        const jwt = await sign({ id: user.id }, c.env.JWT_KEY);
        return c.json({mssg: "Signup successfull", jwt });
    } catch(e) {
        console.log(e)
        c.status(403);
        return c.json({ mssg: "signup error" });
    }
})

userRouter.post("/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success } = signinSchema.safeParse(body)
    console.log(body)
    if (!success) {
        return c.json({mssg: "invalid inputs"})
    }

    try {
        const user = await prisma.user.findFirst({ 
            where: {
                email: body.email 
            }
         })
        if (!user) {
            return c.json({ mssg: "User not found" })
        }
        const isValid = await compare(body.password, user.password)
        if (!isValid) {
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
