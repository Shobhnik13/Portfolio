'use client'
const AboutMe = () => {
  return (
    <div className="flex flex-col justify-center mt-12">
        <p className="font-[500]">about me.</p>    
        <div className="text-gray-500/85 text-sm 2xl:text-base mt-3">
        Hey! I’m a <span className="font-bold">full-stack software engineer</span> and freelancer who loves to build (and occasionally break) cool things. While I work across the stack, I lean more toward the <span className="font-bold">backend side of development</span> — designing scalable systems, building clean APIs, and solving complex data problems. With over <span className="font-bold">2 years of experience</span>, I’ve worked with a range of modern web technologies to ship products that are fast, reliable, and actually useful.
        </div>
    </div>
  )
}

export default AboutMe