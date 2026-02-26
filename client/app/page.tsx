import AboutMe from '@/components/AboutMe'
import Contact from '@/components/Contact'
import Experiences from '@/components/Experiences'
import GithubContributions from '@/components/GithubContributions'
import HireMe from '@/components/HireMe'
import Intro from '@/components/Intro'
import Skills from '@/components/Skills'
import Strengths from '@/components/Strengths'

export default function Home() {
  return (
    <div className="w-full md:w-[60%] flex flex-col items-start mx-auto space-y-12">
      <div className='md:mt-20'>
      <Intro />
      </div>
      <AboutMe />
      <GithubContributions/>
      {/* <Strengths /> */}
      <HireMe />
      <Experiences />
      <Skills />
      <Contact />
    </div>
  )
}
