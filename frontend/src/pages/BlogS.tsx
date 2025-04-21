
export const BlogS = () => {
    return (
        <div className="flex h-screen w-screen justify-center" >
            <div className="flex flex-col w-[60%] " >
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
            <h1 className="text-2xl font-bold" >How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing</h1>
            <p className="font-serif text-slate-700" >No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for man...</p>
            </div>
            <div>
            <p>3 min read </p>
            </div>
            </div>
        </div>
    )
}