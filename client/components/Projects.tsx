'use client'

import { useState } from "react"
import { projectData } from "@/lib/data"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { GoArrowUpRight } from "react-icons/go"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"

const Projects = () => {
  const [viewMore, setViewMore] = useState(false)
  const visibleProjects = projectData.slice(0, 2)

  return (
    <div className="flex flex-col justify-center mt-16 pb-10">
      <p className="font-[500]">projects.</p>

      <motion.div layout className="flex flex-col mt-8 gap-y-8">
        <AnimatePresence initial={false}>
          {(viewMore ? projectData : visibleProjects).map((data) => (
            <motion.div
              layout
              key={data.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="border-l-2 hover:border-purple-300 hover:duration-200 flex flex-col gap-y-1 p-4"
            >
              <p className="text-base font-[500] capitalize">{data.title}</p>
              <div className="flex flex-row gap-x-4 text-sm 2xl:text-base text-gray-500/85">
                {data?.LiveLink && (
                  <Link
                    className="flex gap-x-1 items-center justify-center hover:underline"
                    target="_blank"
                    href={data.LiveLink}
                  >
                    Live preview <GoArrowUpRight className="text-base mt-1" />
                  </Link>
                )}
                {data?.GithubLink && (
                  <Link
                    className="flex gap-x-1 items-center justify-center hover:underline"
                    target="_blank"
                    href={data.GithubLink}
                  >
                    GitHub <GoArrowUpRight className="text-base mt-1" />
                  </Link>
                )}
              </div>
              <Badge
                variant="secondary"
                className={`mt-2 ${
                  data.status === 'Under Review'
                    ? 'bg-orange-500 text-white'
                    : 'bg-green-500 text-black'
                } capitalize w-[110px] flex items-center justify-center text-center`}
              >
                {data.status}
              </Badge>
              <ul className="flex p-4 flex-col gap-y-2">
                {data.overview.map((item, idx) => (
                  <li key={idx} className="list-disc text-sm 2xl:text-base text-gray-500/85">
                    {Array.isArray(item)
                      ? item.map((part, i) =>
                          i % 2 === 1 ? (
                            <strong key={i} className="text-gray-800 font-semibold">
                              {part}
                            </strong>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )
                      : item}
                  </li>
                ))}
              </ul>
              <p className="capitalize text-sm 2xl:text-base text-gray-500/85">{`tech stack: ${data.techStack}`}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center mt-5">
        <Button
          className="w-[140px] md:w-[180px] lg:w-[220px] h-10 md:h-12 text-sm md:text-base"
          onClick={() => setViewMore(!viewMore)}
        >
          {viewMore ? 'View less' : 'View more'}
        </Button>
      </div>
    </div>
  )
}

export default Projects
