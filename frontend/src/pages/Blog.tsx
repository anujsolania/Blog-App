import axios from "axios"
import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { Appbar } from "../components/Appbar";

interface Blog {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
  }

export const Blog = () => {
    const [blog, setblog] = useState<Blog>();
    const[loading,setloading] = useState(true)


    const {bid} = useParams()

    async function getBlog() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${bid}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            setblog(response.data.blog)
            setloading(false)
        } catch (error) {
            alert("Error fetching blog")
            console.log(error)
        }
    }

    useEffect(() => {
        getBlog()
    },[])

    if (loading) return <p className="text-center mt-10">Loading…</p>;

    return (
        <div className="h-screen w-screen" >
            <Appbar></Appbar>
            <div className="flex justify-center">
            <div className="flex flex-col md:flex-row w-[90%] gap-10 pt-40 " >

            <div className="flex flex-col w-full md:w-[75%] gap-3" >
            <h1 className="text-4xl font-extrabold" >{blog?.title}</h1>
            <p className="text-slate-500 " >Posted on August 24, 2023</p>
            <p>{blog?.content} </p>
            </div>

            <div className="flex flex-col w-full md:w-[25%] gap-3" >
                <p className="" >Author</p>
                <div className="flex flex-row gap-3" >
                    <div className="flex text-slate-200 items-center"> 
                        <button className="bg-slate-300 h-5 w-5 border rounded-2xl" ></button>
                    </div>
                    <div className="flex flex-col justify-center gap-2" >
                        <h1 className="text-xl font-extrabold" >Jokester</h1>
                        <p className="text-slate-700 text-sm font-light" >Master of mirth, purveyor of puns, and the funniest person in the kingdom.</p>
                    </div>
                </div>
            </div>

            </div>
            </div>
        </div>
    )
}