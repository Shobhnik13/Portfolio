'use client'

import { socialData } from "@/lib/data"
import Link from "next/link"
import { GoArrowUpRight } from "react-icons/go"

const Contact = () => {
  return (
    <div className="flex flex-col justify-center mt-10  pb-20">
          <p className="font-[500]">contact, socials & coding profiles.</p>
          <div className="flex flex-col mt-8 gap-y-4">
                {socialData.map((data)=>(
                    <div key={data.id} className="flex flex-row gap-x-10">
                        <p className="text-sm font-[500] capitalize">{data.title}</p>
                        <Link  className="text-sm 2xl:text-base flex items-center justify-center gap-x-1 hover:underline text-gray-500/85" href={`${data.link}`} target="_blank">{data.subText} <GoArrowUpRight className="text-base mt-1"/></Link>
                    </div>  
                ))}
          </div>
    </div>
  )
}

export default Contact