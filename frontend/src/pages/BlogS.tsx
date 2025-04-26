import axios from "axios"
import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";

interface Blog {
    id: number;
    title: string;
    content: string;
    published: boolean;
    authorId: number;
  }
  

export const BlogS = () => {
    const [blogs, setblogs] = useState<Blog[]>([]);
    const[loading,setloading] = useState(true)

    const navigate = useNavigate()

    async function getBlogs() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            setblogs(response.data.blogs)
            setloading(false)
        } catch (error) {
            alert("Error fetching blogs")
            console.log(error)
        }
    }

    useEffect(() => {
        getBlogs()
    },[])

    if (loading) return <p className="text-center mt-10">Loading…</p>;

    return (
        <div className="h-screen w-screen" >
            <Appbar></Appbar>
            <div className="flex justify-center">
            <div className="flex flex-col w-[60%] cursor-pointer" >
            {blogs.map((blog) => (
            <div key={blog.id} onClick={async () => {
                navigate(`/${blog.id}`)
            }} >

            <hr className="border-t border-slate-300 mt-[10%] mb-[8%] "></hr>
            <div className="flex gap-2" >
            <div className="flex items-center" >
            <button className="h-5 w-5 bg-slate-400 rounded-2xl" ></button>
            </div>
            <p>Peter V.</p>
            <div className="flex items-center" >
            <button className="h-1 w-1 bg-slate-600 rounded-2xl" ></button>
            </div>
            <p className="text-slate-600" >Dec 3,2023</p>
            </div>
            <div className="flex flex-col gap-1 pt-2 pb-10" >
            <h1 className="text-2xl font-bold" >{blog.title}</h1>
            <p className="font-serif text-slate-700" >{blog.content}</p>
            </div>
            <div>
            <p>3 min read </p>
            </div>

            </div> 
            ))}
            </div>
            </div>
        </div>
    )
}