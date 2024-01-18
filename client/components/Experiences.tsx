'use client'

import { experienceData } from "@/lib/data"

const Experiences = () => {
  return (
    <div className="flex flex-col justify-center mt-20 md:mt-32 pb-10 w-full">
          <p className="font-[500]">worked as.</p> 
          <div className="mt-8 flex flex-col gap-y-8">
            {experienceData.map((data)=>(
                      <div className="border-l-2 hover:border-purple-300  hover:duration-200 flex flex-col gap-y-1 p-4" key={data.id}>
                        <div className="flex  items-center justify-between">
                          <p className="text-base font-[500] capitalize">{data.title}</p>
                          <p className="capitalize text-sm 2xl:text-base text-gray-500/85">{data.duration}</p>
                      </div>
                      <ul className="flex p-4 flex-col gap-y-2">
                          {data.overview.map((item)=>(
                              <li className="list-disc text-sm 2xl:text-base text-gray-500/85">{item}</li>
                          ))}
                      </ul>
                  </div>
            ))}
          </div>
    </div>
  )
}

export default Experiences