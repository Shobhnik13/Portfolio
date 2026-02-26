'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const loaderMessages: Record<string, string[]> = {
    '/': ['initialising portfolio...'],
    '/projects': ['curating projects...'],
    '/blogs': ['loading blog posts...'],
}

const getMessages = (path: string) => loaderMessages[path] ?? ['loading...']

export default function AppWrapper({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState(0)
    const [visible, setVisible] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [message, setMessage] = useState('')
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const msgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const pathname = usePathname()
    const prevPathname = useRef<string | null>(null)

    const startLoader = (path: string) => {
        const trackedPaths = ['/', '/projects', '/blogs']

        if (!trackedPaths.includes(path)) {
            setVisible(false)
            setLoaded(true)
            return
        }

        if (intervalRef.current) clearInterval(intervalRef.current)
        if (msgIntervalRef.current) clearInterval(msgIntervalRef.current)

        setProgress(0)
        setVisible(true)
        setLoaded(false)

        const messages = getMessages(path)
        let msgIndex = 0
        setMessage(messages[0])

        msgIntervalRef.current = setInterval(() => {
            msgIndex = (msgIndex + 1) % messages.length
            setMessage(messages[msgIndex])
        }, 700)

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current!)
                    clearInterval(msgIntervalRef.current!)
                    setTimeout(() => {
                        setLoaded(true)
                        setTimeout(() => setVisible(false), 500)
                    }, 200)
                    return 100
                }
                return prev + 5
            })
        }, 20)
    }
    useEffect(() => {
        prevPathname.current = pathname
        startLoader(pathname)
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
            if (msgIntervalRef.current) clearInterval(msgIntervalRef.current)
        }
    }, [])

    useEffect(() => {
        if (prevPathname.current === null) return
        if (prevPathname.current === pathname) return
        prevPathname.current = pathname
        startLoader(pathname)
    }, [pathname])

    return (
        <>
            {visible && (
                <div
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-black"
                    style={{
                        opacity: loaded ? 0 : 1,
                        transition: 'opacity 0.5s ease',
                        pointerEvents: loaded ? 'none' : 'all',
                    }}
                >
                    <div className="flex flex-col items-center gap-8">

                        {/* Ring */}
                        <div className="relative w-16 h-16">
                            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                                <circle
                                    cx="32" cy="32" r="28"
                                    stroke="black"
                                    strokeOpacity="0.1"
                                    strokeWidth="2"
                                    className="dark:stroke-white"
                                />
                                <circle
                                    cx="32" cy="32" r="28"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    className="dark:stroke-white"
                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                                    transform="rotate(-90 32 32)"
                                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-black/40 dark:text-white/40">
                                {Math.round(progress)}
                            </span>
                        </div>

                        {/* Bar */}
                        <div className="w-40 h-px bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-black dark:bg-white rounded-full"
                                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                            />
                        </div>

                        {/* Message */}
                        <p className="text-xs font-mono text-black/50 dark:text-white/50 tracking-wider">
                            {message}
                        </p>

                    </div>
                </div>
            )}

            <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}>
                {children}
            </div>
        </>
    )
}