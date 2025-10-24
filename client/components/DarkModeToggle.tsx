'use client'

import { useState, useEffect } from "react"

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-gray-300/20 dark:hover:bg-gray-700/20 transition-colors duration-200 flex items-center justify-center"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="none"
                stroke={isDark ? "white" : "black"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Outer circle */}
                <circle cx="12" cy="12" r="10" />
                {isDark ? (
                    // Thin crescent moon inside
                    <path d="M12 2a10 10 0 0 0 0 20 7 7 0 0 1 0-14z" />
                ) : (
                    // Minimal sun with center + thin rays
                    <>
                        <circle cx="12" cy="12" r="4" />
                        <line x1="12" y1="1" x2="12" y2="4" />
                        <line x1="12" y1="20" x2="12" y2="23" />
                        <line x1="1" y1="12" x2="4" y2="12" />
                        <line x1="20" y1="12" x2="23" y2="12" />
                        <line x1="4.5" y1="4.5" x2="6.5" y2="6.5" />
                        <line x1="17.5" y1="17.5" x2="19.5" y2="19.5" />
                        <line x1="4.5" y1="19.5" x2="6.5" y2="17.5" />
                        <line x1="17.5" y1="6.5" x2="19.5" y2="4.5" />
                    </>
                )}
            </svg>
        </button>
    )
}

export default DarkModeToggle
