import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'
import Experiences from '@/components/Experiences'
import HireMe from '@/components/HireMe'
import Intro from '@/components/Intro'
import Projects from '@/components/Projects'

export default function Home() {
  return (
      <div className='w-full md:w-[60%] flex flex-col items-start  mx-auto p-4 pt-20 h-screen '>
        <Intro/>
        <AboutMe/>
        <HireMe/>
        <Experiences/>
        <Projects/>
        <Contact/>
      </div> 
  )
}