'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { GoArrowUpRight } from "react-icons/go";

const HireMe = () => {
  return (
    <div className="flex flex-col justify-center gap-y-3 mt-4 bg-purple-100 rounded-lg p-4
      border border-gray-300 dark:bg-black dark:border-gray-700 dark:text-slate-400 transition-colors shadow-sm shadow-purple-200 dark:shadow-slate-400 duration-300">

      {/* <p className="text-sm 2xl:text-base dark:text-slate-400">
        I am currently open for
        <span className="font-bold italic dark:text-white"> software engineering / backend roles </span>,
        which involves building and maintaining scalable softwares.
      </p> */}

      <p className="text-sm 2xl:text-base dark:text-slate-400">
        Developers or organizations, who are building great softwares or businesses. Interested in working together?
        <span className="font-bold italic dark:text-white"> Feel free to schedule a meet!</span>
      </p>

      <div className="flex gap-x-4 mt-2">
        <Link href={'https://cal.com/shobhnik13/15min'} target="_blank">
          <Button
            className="transition-transform duration-100 ease-in-out hover:scale-95
              bg-purple-200 text-black border border-gray-300 
              dark:bg-black dark:text-white dark:border-gray-600
              hover:bg-purple-300 hover:text-black"
          >
            Schedule a meet
          </Button>
        </Link>

        <Link target="_blank"
          className="flex text-sm 2xl:text-base hover:underline flex-row gap-x-1 items-center justify-center
                    text-gray-700 dark:text-slate-400 transition-transform duration-100 ease-in-out hover:scale-95"
          href={'https://drive.google.com/file/d/1cuEWRpMEgK-7zeMsC5Gf1ETmabCTtz8r/view?usp=drive_link'}>
          Resume <GoArrowUpRight className="text-base mt-1 dark:text-white" />
        </Link>
      </div>
    </div>
  )
}

export default HireMe
