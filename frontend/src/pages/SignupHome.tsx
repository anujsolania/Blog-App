import { Quote } from "../components/Quote"
import { Signup } from "../components/Signup"

export const SignupHome = () => {
    return (
        <div className="flex h-screen w-screen" >
            <div className="flex w-full md:w-1/2" >
                <Signup></Signup>
            </div>
            <div className="hidden md:flex w-1/2"  > 
            <Quote></Quote>
            </div>
        </div>
    )
}