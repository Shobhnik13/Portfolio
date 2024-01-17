'use client'


import { projectData } from "@/lib/data"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { GoArrowUpRight } from "react-icons/go"

const Projects = () => {
    
  return (
    <div className="flex flex-col justify-center mt-20 md:mt-32 pb-10">
         <p className="font-[500]">projects.</p>  
        <div className="flex flex-col mt-10 gap-y-8">
            {projectData.map((data)=>(
                <div className="border-l-2 hover:border-orange-300  hover:duration-200 flex flex-col gap-y-1 p-4" key={data.id}>
                    <p className="text-base font-[500] capitalize">{data.title}</p>
                    <div className="flex flex-row gap-x-4 text-sm 2xl:text-base text-gray-500/85">
                        <Link className="flex gap-x-1 items-center justify-center hover:underline" target="_blank" href={`${data.LiveLink}`}>Live preview  <GoArrowUpRight className="text-base mt-1"/></Link>
                        <Link className="flex gap-x-1 items-center justify-center hover:underline" target="_blank" href={`${data.GithubLink}`}>GitHub  <GoArrowUpRight className="text-base mt-1"/></Link>
                    </div>
                    <Badge variant={'secondary'} className="mt-2 text-gray-500/85 capitalize w-[105px] flex items-center justify-center text-center">{data.status}</Badge>
                    <ul className="flex p-4 flex-col gap-y-2">
                        {data.overview.map((item)=>(
                            <li className="list-disc text-sm 2xl:text-base text-gray-500/85">{item}</li>
                        ))}
                    </ul>
                    <p className="text-sm 2xl:text-base text-gray-500/85">{`tech stack: ${data.techStack}`}</p>
                </div>
            ))}    
        </div>   
    </div>
  )
}

export default Projects