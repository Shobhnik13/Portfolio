'use client'

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sun, Moon } from "lucide-react"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState<boolean | null>(null)

  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    if (stored === "dark") {
      document.documentElement.classList.add("dark")
      setDarkMode(true)
    } else if (stored === "light") {
      document.documentElement.classList.remove("dark")
      setDarkMode(false)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", prefersDark)
      setDarkMode(prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    if (darkMode === null) return
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.classList.toggle("dark", newMode)
    localStorage.setItem("theme", newMode ? "dark" : "light")
  }

  const handleNameClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  const navItems = [
    { id: "projects", title: "projects", href: "/projects" },
    { id: "blogs", title: "blogs", href: "/blogs" },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ease-in-out ${isScrolled ? "pt-2 sm:pt-4" : "pt-0"}`}>
      <div
        className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled
          ? "max-w-xs sm:max-w-2xl md:max-w-4xl px-2 sm:px-4 md:px-6 rounded-xl sm:rounded-2xl"
          : "max-w-6xl px-4 sm:px-6 lg:px-8"
          }`}
        style={{
          transition: "background 0.6s ease, box-shadow 0.6s ease, border 0.6s ease, backdrop-filter 0.6s ease",
          background: isScrolled ? (darkMode ? "rgba(15,15,15,0.65)" : "rgba(255,255,255,0.6)") : (darkMode ? "transparent" : "transparent"),
          backdropFilter: isScrolled ? "blur(20px) saturate(180%)" : "none",
          border: isScrolled ? (darkMode ? "1px solid rgba(80,80,80,0.4)" : "1px solid rgba(200,200,200,0.5)") : "1px solid transparent",
          boxShadow: isScrolled ? (darkMode ? "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(80,80,80,0.3)" : "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)") : "none",
        }}
      >
        <div className="flex justify-between items-center h-10 sm:h-12 md:h-16">
          {/* LEFT — Name */}
          <div
            className={`tracking-wide font-[family-name:var(--font-instrument-serif)] text-sm sm:text-base md:text-lg transition-colors duration-300 ${darkMode ? "text-white" : "text-black"}`}
            onClick={handleNameClick}
            style={{ cursor: "pointer" }}
          >
            Shobhnik
          </div>

          {/* RIGHT — Links + Dark mode */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className={`tracking-wide text-sm sm:text-base md:text-lg font-[family-name:var(--font-instrument-serif)] font-medium transition-all duration-200 px-1 sm:px-2 py-1 whitespace-nowrap ${isActive
                    ? "font-bold text-black dark:text-white underline"
                    : darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                    }`}
                >
                  {item.title}
                </button>
              )
            })}

            {mounted && darkMode !== null ? (
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-1 sm:p-1.5 rounded-full border border-gray-400 dark:border-gray-600 hover:scale-110 transition-transform"
              >
                {darkMode ? <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-black" />}
              </button>
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10" />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
