'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

const GitHubCalendar = dynamic(
    () => import('react-github-calendar').then((mod) => mod.GitHubCalendar as unknown as React.ComponentType<any>),
    { ssr: false }
)

const themes = {
    light: ['#ffffff', '#bfdbfe', '#60a5fa', '#2563eb', '#1e3a8a'],
    dark: ['#374151', '#334155', '#475569', '#94a3b8', '#cbd5e1'],
}

const GithubContributions = () => {
    const { resolvedTheme } = useTheme()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        setIsDark(resolvedTheme === 'dark')
    }, [resolvedTheme])

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)


    return (
        <div className="flex flex-col justify-center mt-20 md:mt-32 pb-10 w-full">
            {/* <p className="font-[500]">coded on.</p> */}

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
                        dark:  ['#f1f5f9', '#93c5fd', '#3b82f6', '#1d4ed8', '#1e3a8a'],
                    }}
                />
            </div>
        </div>
    )
}

export default GithubContributions