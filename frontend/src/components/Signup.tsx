import { Link } from "react-router-dom"

export const Signup = () => {
    return (
        <div className="flex h-screen w-screen" >
            <div className="flex items-center justify-center w-full" >
                <div className="p-40 border">
                <div className="flex flex-col items-center justify-center p-5 gap-2" >
                    <h1 className="text-3xl font-bold" >Create an account</h1>
                    <p className="text-slate-500">Already have an account? <Link to={"/signin"} className="underline" >Login</Link></p>
                </div>
                <div className="flex flex-col gap-2" >
                    <label htmlFor="Username" className="font-medium" >Username</label>
                        <input className="border rounded-md p-1" type="text" placeholder="Enter your username" ></input>
                    <label htmlFor="Email" className="font-medium" >Email</label>
                        <input className="border rounded-md p-1" type="text" placeholder="Enter your email"></input>
                    <label htmlFor="Password" className="font-medium">Password</label>
                        <input className="border rounded-md p-1" type="password"></input>
                    <button className="border rounded-md bg-black text-slate-50 p-1 mt-4" >Sign Up</button>
                </div> 
                </div>
            </div>
        </div>
    )
}