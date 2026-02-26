'use client'

import { useEffect, useState, useCallback } from 'react'

const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0)
    const [fadeOut, setFadeOut] = useState(false)

    const complete = useCallback(() => {
        setFadeOut(true)
        setTimeout(onComplete, 600)
    }, [onComplete])

    useEffect(() => {
        setProgress(0)
        setFadeOut(false)

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(complete, 200)
                    return 100
                }
                return prev + 1.5
            })
        }, 30)

        return () => clearInterval(interval)
    }, [complete])

    return (
        <div
            className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-black transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            <div className="flex flex-col items-center gap-8">

                {/* Ring */}
                <div className="relative w-16 h-16">
                    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                        {/* Track */}
                        <circle
                            cx="32" cy="32" r="28"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-black/10 dark:text-white/10"
                        />
                        {/* Fill */}
                        <circle
                            cx="32" cy="32" r="28"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            className="text-black dark:text-white"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                            transform="rotate(-90 32 32)"
                            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-slate-400 dark:text-slate-500">
                        {Math.round(progress)}
                    </span>
                </div>

                {/* Bar */}
                <div className="w-40 h-px bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black dark:bg-white rounded-full"
                        style={{
                            width: `${progress}%`,
                            transition: 'width 0.1s linear',
                        }}
                    />
                </div>

            </div>
        </div>
    )
}

export default Loader