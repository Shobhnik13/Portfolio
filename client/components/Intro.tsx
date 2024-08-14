'use client'

import Image from "next/image"

const Intro = () => {
  return (
    <div className="flex gap-x-4 justify-center md:items-center">
        {/* image  */}
        <div className="mt-2 md:mt-0 rounded-full hover:scale-110 transition-all ease-in-out duration-125 hover:opacity-60">
            <Image className="rounded-full " src={'/IntroImg.jpeg'} height={100} width={100} alt="Into_img"/>
        </div>
        {/* details  */}
        <div className="">
            <h2 className="text-base md:text-xl 2xl:text-2xl font-bold">👋 Hi, I am Shobhnik</h2>
            <p className="text-gray-500/85 text-sm md:text-base 2xl:text-lg mt-3">A frontend software engineer, a lifelong learning fullstack engineer. </p>
            <p className="text-gray-500/85 pt-2 xl:pt-0 text-sm md:text-base 2xl:text-lg">21, he/him</p>
        </div>
    </div>
  )
}

export default Intro