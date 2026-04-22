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
        colorScheme={dark ? 'dark' : 'light'}
        blockSize={10}
        blockMargin={3}
        fontSize={11}
        showTotalCount={false}
        showColorLegend={false}
        theme={{
          light: ['#e8e8e8', '#a8a8a8', '#787878', '#484848', '#181818'],
          dark:  ['#202020', '#484848', '#686868', '#909090', '#c0c0c0'],
        }}
      />
    </div>
  )
}
