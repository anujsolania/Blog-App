import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import { z } from "zod";


export const Signup = () => {
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[name,setname] = useState("")

    return (
        <div className="flex h-screen w-screen" >
            <div className="flex items-center justify-center w-full" >
                <div className="w-[70%]">
                <div className="flex flex-col items-center justify-center p-5 gap-2" >
                    <h1 className="text-3xl font-bold" >Create an account</h1>
                    <p className="text-slate-500">Already have an account? <Link to={"/signin"} className="underline" >Login</Link></p>
                </div>
                <div className="flex flex-col gap-2" >
                    <label htmlFor="Username" className="font-medium" >Username</label>
                        <input className="border rounded-md p-1" type="text" placeholder="Enter your username"
                         value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setname(e.target.value)}} ></input>
                    <label htmlFor="Email" className="font-medium" >Email</label>
                        <input className="border rounded-md p-1" type="text" placeholder="Enter your email"
                        value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setemail(e.target.value)}}></input>
                    <label htmlFor="Password" className="font-medium">Password</label>
                        <input className="border rounded-md p-1" type="password"
                        value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setpassword(e.target.value)}}></input>
                    <button className="border rounded-md bg-black text-slate-50 p-1 mt-4" 
                    onClick={async () => {
                        try {
                            console.log(import.meta.env.VITE_BACKEND_URL)
                            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`,{
                                email,
                                password,
                            })
                            const token = response.data.jwt
                            if (token) {
                                alert("maybe successfull")
                                localStorage.setItem("token",token)
                            } else {
                                alert("signup unsuccessfull")
                            }
                        } catch (error) {
                            console.log(error)
                            alert("some error")
                        }
                    }}>Sign Up</button>
                </div> 
                </div>
            </div>
        </div>
    )
}