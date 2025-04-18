
export const Blog = () => {
    return (
        <div className="flex h-screen w-screen justify-center" >
            <div className="flex w-[90%] pt-40" >

            <div className="flex flex-col w-[75%] gap-3 pr-10" >
            <h1 className="text-4xl font-extrabold w-full" >Taxing Laughter: The Joke Tax Chronicles</h1>
            <p className="text-slate-500 " >Posted on August 24, 2023</p>
            <p>
                Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne.
                One day, his advisors came to him with a problem: the kingdom was running out of money.
                Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet.
                The king was furious, but he couldn't seem to stop Jokester. And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.
            </p>
            </div>

            <div className="flex flex-col w-[25%] gap-3" >
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
    )
}