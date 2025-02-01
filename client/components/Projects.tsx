'use client'


import { projectData } from "@/lib/data"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { GoArrowUpRight } from "react-icons/go"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

const Projects = () => {
    
  return (
    <div className="flex flex-col justify-center mt-16 pb-10">
         <p className="font-[500]">projects.</p>  
        <div className="flex flex-col mt-8 gap-y-8">
            {projectData.map((data)=>(
                <div className="border-l-2 hover:border-purple-300  hover:duration-200 flex flex-col gap-y-1 p-4" key={data.id}>
                    <p className="text-base font-[500] capitalize">{data.title}</p>
                    <div className="flex flex-row gap-x-4 text-sm 2xl:text-base text-gray-500/85">
                   {data && data.status ==='Under Review'?(
                    <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="flex gap-x-1 items-center justify-center hover:underline">Live preview  <GoArrowUpRight className="text-base mt-1"/></TooltipTrigger>
                            <TooltipContent>
                                    <p>As this project is under review so live preview is not available, please visit the github link fore more info!</p>
                          </TooltipContent>
                         </Tooltip>
                        </TooltipProvider>):( <Link className="flex gap-x-1 items-center justify-center hover:underline" target="_blank" href={`${data.LiveLink}`}>Live preview  <GoArrowUpRight className="text-base mt-1"/></Link>) }
                        {/* // git link is contant in both unbder review and maintained projects as well wqe just need to hsndle the live for under review and maintained */}
                        <Link className="flex gap-x-1 items-center justify-center hover:underline" target="_blank" href={`${data.GithubLink}`}>GitHub  <GoArrowUpRight className="text-base mt-1"/></Link>
                    </div>
                    <Badge variant={'secondary'} className={`mt-2 ${data.status ==='Under Review' ?'bg-orange-500 text-white':'bg-green-500 text-black'} capitalize w-[110px] flex items-center justify-center text-center`}>{data.status}</Badge>
                    <ul className="flex p-4 flex-col gap-y-2">
                        {data.overview.map((item)=>(
                            <li className="list-disc text-sm 2xl:text-base text-gray-500/85">{item}</li>
                        ))}
                    </ul>
                    <p className="capitalize text-sm 2xl:text-base text-gray-500/85">{`tech stack: ${data.techStack}`}</p>
                </div>
            ))}    
        </div>   
    </div>
  )
}

export default Projects