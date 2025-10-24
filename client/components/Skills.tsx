'use client'

import { skillData } from "@/lib/data"

const Skills = () => {
  return (
    <div className="flex flex-col justify-center mt-10 mb-10 lg:mb-20 lg:mt-20">
      <p className="font-[500] text-center md:text-left">
        languages, frameworks & tools, I've worked with.
      </p>
      <div className="flex flex-col mt-6 lg:mt-10 gap-y-8 md:gap-y-8">
        {skillData.map((item) => (
          <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-8" key={item.id}>
            <div className="font-semibold w-full md:w-32 text-center md:text-left">
              {item.category}:
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-3 text-gray-500/85 justify-center md:justify-start">
              {item.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-black rounded-md text-sm dark:border dark:border-gray-700"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className={`w-4 h-4 ${skill.name === "Next.js" || skill.name === "Express.js" || skill.name === "Socket.io" ? "dark:invert" : ""}`}
                  />
                  {skill.name}
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
