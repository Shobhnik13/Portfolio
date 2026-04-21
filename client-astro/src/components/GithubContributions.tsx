import { useEffect, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'

export default function GithubContributions() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col justify-center mt-20 md:mt-32 pb-10 w-full">
      <div className="mt-8 border-l-2 hover:border-blue-400 dark:hover:border-slate-400 transition-all duration-300 p-4 overflow-x-auto">
        <GitHubCalendar
          username="SHOBHNIK13"
          blockSize={14}
          blockMargin={4}
          fontSize={14}
          showTotalCount={false}
          showColorLegend={false}
          theme={{
            light: ['#f1f5f9', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
            dark: ['#f1f5f9', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
          }}
        />
      </div>
    </div>
  )
}
