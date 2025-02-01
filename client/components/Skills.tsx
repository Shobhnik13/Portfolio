'use client'

import { skillData } from "@/lib/data"

const Skills = () => {
  return (
    <div className="flex flex-col justify-center mt-10 mb-10 lg:mb-20 lg:mt-20 ">
      <p className="font-[500] text-center md:text-left ">
        languages, frameworks & tools, I've worked with.
      </p>    
      <div className="flex flex-col mt-6 lg:mt-10 gap-y-8 md:gap-y-8 ">
        {skillData.map((item) => (
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-8" key={item.category}>
            <div className="font-semibold w-full md:w-32 text-center md:text-left">
              {item.category}:
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-3 text-gray-500/85 justify-center md:justify-start">
              {item.skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills;
