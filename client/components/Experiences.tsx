'use client'

import { experienceData } from "@/lib/data"

const Experiences = () => {
  return (
    <div className="flex flex-col justify-center mt-20 md:mt-32 pb-10 w-full">
      <p className="font-[500]">worked as.</p>

      <div className="mt-8 flex flex-col gap-y-8">
        {experienceData.map((data) => (
          <div
            key={data.id}
            className="border-l-2 hover:border-purple-300 dark:hover:border-white hover:duration-200 flex flex-col gap-y-1 p-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-1">
              {/* Title */}
              <p className="text-sm lg:text-base font-[500] capitalize">
                {data.title}
              </p>

              {/* Duration + Location */}
              <div className="flex flex-col text-xs sm:text-sm xl:text-base text-slate-700 dark:text-slate-400">
                <p className="capitalize text-slate-700 dark:text-slate-400">{data.duration}</p>
                <p className="capitalize text-slate-700 dark:text-slate-400">{data.location}</p>
              </div>
            </div>

            {/* Description */}
            <ul className="flex p-4 flex-col gap-y-2">
              {data.overview.map((item, idx) => (
                <li
                  key={idx}
                  className="list-disc text-sm 2xl:text-base text-gray-500/85"
                >
                  {Array.isArray(item)
                    ? item.map((part, i) =>
                      i % 2 === 1 ? (
                        <strong
                          key={i}
                          className="text-black font-medium dark:text-white"
                        >
                          {part}
                        </strong>
                      ) : (
                        <span
                          key={i}
                          className="text-slate-700 dark:text-slate-400"
                        >
                          {part}
                        </span>
                      )
                    )
                    : item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experiences
