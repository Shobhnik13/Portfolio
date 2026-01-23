'use client'

import Image from "next/image"

const Intro = () => {
  const birthDate = new Date(2003, 6, 13)

  const getAge = () => {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const hasHadBirthdayThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate())

    if (!hasHadBirthdayThisYear) age--

    return age
  }
  return (
    <div className="flex gap-x-4 ">
      {/* image  */}
      <div className="mt-2 md:mt-0 rounded-full hover:scale-110 transition-all ease-in-out duration-125 hover:opacity-60">
        <Image className="rounded-full " src={'/IntroImg.jpeg'} height={100} width={100} alt="Into_img" />
      </div>
      {/* details  */}
      <div className="">
        <h2 className="text-base md:text-xl 2xl:text-2xl font-bold">👋 Hi, I am Shobhnik</h2>
        <p className="text-slate-700 dark:text-slate-400 text-sm md:text-base 2xl:text-lg mt-3">A reliable software engineer based in India, the one you’ll regret not working with </p>
        <p className="text-slate-700 dark:text-slate-400 pt-2 xl:pt-0 text-sm md:text-base 2xl:text-lg">{getAge()}, he/him</p>
      </div>
    </div>
  )
}

export default Intro