"use client"
import { useState, useEffect } from "react"
import Intro from "./Intro"
import AboutMe from "./AboutMe"
import HireMe from "./HireMe"
import Experiences from "./Experiences"
import Skills from "./Skills"
import Projects from "./Projects"
import Blog from "./Blogs"
import Contact from "./Contact"

const Navbar = () => {
    const [activeSection, setActiveSection] = useState("about")
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { id: "about", title: "about", href: "#about" },
        { id: "experience", title: "experience", href: "#experience" },
        { id: "skills", title: "skills", href: "#skills" },
        { id: "projects", title: "projects", href: "#projects" },
        { id: "blogs", title: "blogs", href: "#blogs" },
        { id: "contact", title: "contact", href: "#contact" },
    ]

    const handleNavClick = (sectionId: any) => {
        setActiveSection(sectionId)
        document.getElementById(sectionId)?.scrollIntoView({
            behavior: "smooth",
        })
    }

    return (
        <>
            {/* Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ease-in-out ${isScrolled ? "pt-2 sm:pt-4" : "pt-0"}`}
            >
                <div
                    className={`mx-auto transition-all duration-300 ease-in-out ${isScrolled
                            ? "max-w-xs sm:max-w-2xl md:max-w-4xl px-2 sm:px-4 md:px-6 rounded-xl sm:rounded-2xl"
                            : "max-w-6xl px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md border-b border-gray-200/60"
                        }`}
                    style={
                        isScrolled
                            ? {
                                background: `
                    linear-gradient(135deg, 
                      rgba(60, 60, 60, 0.4) 0%,
                      rgba(40, 40, 40, 0.6) 25%,
                      rgba(20, 20, 20, 0.8) 50%,
                      rgba(10, 10, 10, 0.9) 75%,
                      rgba(0, 0, 0, 0.95) 100%
                    ),
                    linear-gradient(45deg,
                      rgba(80, 80, 80, 0.3) 0%,
                      transparent 50%,
                      rgba(0, 0, 0, 0.7) 100%
                    )
                  `,
                                backdropFilter: "blur(20px) saturate(180%)",
                                border: "1px solid rgba(60, 60, 60, 0.3)",
                                borderTop: "1px solid rgba(80, 80, 80, 0.4)",
                                borderLeft: "1px solid rgba(70, 70, 70, 0.3)",
                                boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.6),
                    inset 0 1px 0 rgba(80, 80, 80, 0.3),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.4)
                  `,
                            }
                            : {}
                    }
                >
                    <div className="flex justify-center items-center h-10 sm:h-12 md:h-16">
                        <div
                            className={`flex transition-all duration-300 ${isScrolled
                                    ? "space-x-1 sm:space-x-3 md:space-x-6 lg:space-x-8"
                                    : "space-x-3 sm:space-x-6 md:space-x-8 lg:space-x-12"
                                }`}
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`text-[10px] sm:text-xs md:text-sm 2xl:text-base font-medium transition-all ease-in-out duration-125 hover:opacity-80 px-1 sm:px-2 py-1 whitespace-nowrap ${activeSection === item.id
                                            ? isScrolled
                                                ? "text-white font-bold drop-shadow-sm"
                                                : "text-black font-bold"
                                            : isScrolled
                                                ? "text-gray-200 hover:text-white drop-shadow-sm"
                                                : "text-gray-500/85 hover:text-black"
                                        }`}
                                    style={
                                        isScrolled
                                            ? {
                                                textShadow: "0 1px 2px rgba(0, 0, 0, 0.8)",
                                            }
                                            : {}
                                    }
                                >
                                    {item.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-14 sm:pt-16 md:pt-20">
                {/* All Sections */}
                <div id="about" className="w-full space-y-12 mb-16">
                    <div className="w-full">
                        <Intro />
                    </div>
                    <div className="w-full">
                        <AboutMe />
                    </div>
                    <div className="w-full">
                        <HireMe />
                    </div>
                </div>

                <div id="experience" className="w-full space-y-12 mb-16">
                    <div className="w-full">
                        <Experiences />
                    </div>
                </div>

                <div className="w-full mb-16" id="skills">
                    <Skills />
                </div>

                <div id="projects" className="w-full space-y-12 mb-16">
                    <div className="w-full">
                        <Projects />
                    </div>
                </div>

                <div className="w-full mb-16" id="blogs">
                    <Blog />
                </div>

                <div id="contact" className="w-full">
                    <Contact />
                </div>
            </div>
        </>
    )
}

export default Navbar
