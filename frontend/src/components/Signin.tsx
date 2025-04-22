import { signinSchema } from "@anujsolania/common"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Signin = () => {
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")

    const body = {email,password}

    const navigate = useNavigate()

    return (
        <div className="flex h-screen w-screen" >
            <div className="flex items-center justify-center w-full" >
                <div className="">
                <div className="flex flex-col items-center justify-center p-5 gap-2" >
                    <h1 className="text-3xl font-bold" >Create an account</h1>
                    <p className="text-slate-500">Already have an account? <Link to={"/"} className="underline" >Signup</Link></p>
                </div>
                <div className="flex flex-col gap-2" >
                    <label htmlFor="Email" className="font-medium" >Email</label>
                        <input className="border rounded-md p-1" type="text" placeholder="Enter your email"
                        value={email} onChange={(e) => {setemail(e.target.value)}}></input>
                    <label htmlFor="Password" className="font-medium">Password</label>
                        <input className="border rounded-md p-1" type="password"
                        value={password} onChange={(e) => {setpassword(e.target.value)}}></input>
                    <button className="border rounded-md bg-black text-slate-50 p-1 mt-4" 
                    onClick={async () => {
                        try {
                            const {success} = signinSchema.safeParse(body)
                            if(!success) return alert("invalid inputssss")

                            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`,body)
                            const token = response.data.jwt
                            if (token) {
                                alert(response.data.mssg)
                                localStorage.setItem("token",token)
                                navigate("/blogs")
                            } else {
                                alert(response.data.mssg)
                            }
                        } catch (error) {
                            console.log(error)
                            alert("some error")
                        }
                    }}>Sign In</button>
                </div> 
                </div>
            </div>
        </div>
    )
}