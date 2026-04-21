import { useEffect, useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'

export default function Contributions({ username }: { username: string }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains('dark'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  return (
    <div className="overflow-x-auto">
      <GitHubCalendar
        username={username}
        blockSize={10}
        blockMargin={3}
        fontSize={11}
        showTotalCount={false}
        showColorLegend={false}
        theme={{
          light: ['#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#404040'],
          dark:  ['#262626', '#404040', '#525252', '#737373', '#a3a3a3'],
        }}
      />
    </div>
  )
}
