
export const Appbar = () => {
    return (
        <div className="flex w-screen p-5">
            <div className="flex w-1/2 justify-start font-bold" >
            <h1 className="text-xl" >Blogs App</h1>
            </div>
            <div className="flex w-1/2 justify-end gap-10">
            <h1 className="text-lg" >Hey, Blogger Anuj </h1>
            <button className="w-8 h-8 border rounded"><i className="ri-menu-line"></i></button>
            </div>
        </div>
    )
}