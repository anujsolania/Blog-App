import { Quote } from "../components/Quote"
import { Signin } from "../components/Signin"

export const SigninHome = () => {
    return (
        <div className="flex h-screen w-screen" >
            <div className="flex w-full md:w-1/2" >
                <Signin></Signin>
            </div>
            <div className="hidden md:flex w-1/2"  > 
            <Quote></Quote>
            </div>
        </div>
    )
}