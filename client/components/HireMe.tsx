'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { GoArrowUpRight } from "react-icons/go";
const HireMe = () => {
  return (
    <div className=" flex flex-col justify-center gap-y-3 mt-4 bg-purple-100 shadow-md rounded-lg p-4">
        <p className="text-sm 2xl:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque odit repellendus beatae consequuntur illum illo nobis magni ipsum itaque deleniti?</p>
        <p className=" text-sm 2xl:text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam enim sunt perferendis consectetur laudantium natus nulla laborum impedit cum deleniti.</p>
        <div className="flex gap-x-4">
            <Link href={'https://cal.com/shobhnik13/15min'} target="_blank">
            <Button className="hover:scale-95 ease-in-out transition-all duration-100">Schedule a meet / cal.com</Button>
            </Link>

            <Link target="_blank" className="flex text-sm 2xl:text-base hover:underline flex-row gap-x-1 items-center justify-center" href={'https://drive.google.com/file/d/1-g3eK0N73DkjA7ZaY1eUl5fv7GJOucXc/view?usp=sharing'}>Resume <GoArrowUpRight className="text-base mt-1"/> </Link>
        </div>
    </div>
  )
}

export default HireMe