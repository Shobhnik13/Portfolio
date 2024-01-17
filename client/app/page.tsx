import AboutMe from '@/components/AboutMe'
import HireMe from '@/components/HireMe'
import Intro from '@/components/Intro'

export default function Home() {
  return (
  <div className='w-full md:w-[60%] flex flex-col items-start  mx-auto p-4 pt-20 h-screen '>
    <Intro/>
    <AboutMe/>
    <HireMe/>
  </div>  
  )
}
