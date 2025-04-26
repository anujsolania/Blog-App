import { useState } from "react"
import { Appbar } from "../components/Appbar"
import { createBlog } from "@anujsolania/common"
import axios from "axios"

export const Createblog = () => {
    const[title,settitle] = useState("")
    const[content,setcontent] = useState("")

    return (
        <div className="h-screen w-screen" >
            <Appbar></Appbar>
            <div className="flex justify-center " >
            <div className="flex flex-col w-[80%] gap-10">
                <h1 className="text-4xl text-center" >New Blog</h1>
                <input className="border text-lg rounded-xl p-4 bg-slate-50" placeholder="Enter title" 
                value={title} onChange={(e) => {settitle(e.target.value)}}></input>
                <textarea className="border p-4 rounded-xl bg-slate-50" rows={10} placeholder="Enter content" 
                value={content} onChange={(e) => {setcontent(e.target.value)}}></textarea>
                <button className="w-1/4 md:w-1/8 border bg-black text-slate-200 rounded-xl p-2" 
                onClick={async () => {

                    const result = createBlog.safeParse({title: title.trim(),content: content.trim()})
                    console.log(result)
                    if(!result.success) return alert(result.error.issues[0].message)
    
                    try {
                        const token = localStorage.getItem("token")
                        if(!token) return alert("token not found")
                        
                        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog/createblog`,{
                            title,content
                        },{
                            headers: {
                                Authorization: token
                            }
                        })
                        if (response.status === 200) {
                            alert(response.data.mssg)
                            settitle("")
                            setcontent("")
                        }
                    } catch (error) {
                        console.log(error)
                        alert("some errorrrrr")
                    }
                }}>Publish</button>
            </div>
            </div>
        </div>
    )
}