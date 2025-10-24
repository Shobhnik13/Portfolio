'use client'

const AboutMe = () => {
  return (
    <div className="flex flex-col justify-center mt-12">
      <p className="font-[500] dark:text-slate-300">about me.</p>

      <div className="text-sm 2xl:text-base mt-3 text-slate-700 dark:text-slate-400">
        Hey! I’m a <span className="font-medium dark:text-white">software engineer</span> with a passion for building (and occasionally breaking) innovative products. While I’m comfortable across the stack, I specialize in <span className="font-medium dark:text-white">backend development</span>, designing scalable systems, crafting clean APIs, tackling complex data challenges, and following to LLD & HLD principles. With over <span className="font-medium dark:text-white">2 years of experience</span>, I’ve leveraged modern web technologies to deliver fast, reliable, and practical solutions that make a real impact.
      </div>
    </div>
  )
}

export default AboutMe
