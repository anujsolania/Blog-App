import { Appbar } from "../components/Appbar"

export const Createblog = () => {
    return (
        <div className="h-screen w-screen" >
            <Appbar></Appbar>
            <hr className="border-t border-gray-200 p-8" ></hr>
            <div className="flex justify-center " >
            <div className="flex flex-col w-[80%] gap-10">
                <h1 className="text-4xl text-center" >Create new Blog</h1>
                <input className="border text-lg rounded-xl p-4 bg-slate-50" placeholder="Enter title" ></input>
                <textarea className="border p-4 rounded-xl bg-slate-50" rows={10} placeholder="Enter content" ></textarea>
            </div>
            </div>
        </div>
    )
}