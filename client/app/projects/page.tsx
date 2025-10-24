"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProjectCard from "@/components/ProjectCard"
import { projectData } from "@/lib/data"
import ProjectsHero from "@/components/ProjectsHero"



export default function ProofOfWorkPage() {
    const [tab, setTab] = useState("all")

    const filteredProjects = tab === "all" ? projectData : projectData.filter((p) => p.type === tab)

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <ProjectsHero />

            <Tabs
                defaultValue="all"
                onValueChange={setTab}
                className="w-full md:w-[85%] mx-auto mt-12"
            >
                <TabsList className="flex justify-center bg-transparent border border-neutral-800 rounded-xl overflow-hidden w-fit mx-auto mb-10 p-0">
                    <TabsTrigger
                        value="all"
                        className="px-8 tracking-wide font-[family-name:var(--font-instrument-serif)] py-2 text-sm md:text-base text-neutral-600 dark:text-white font-normal transition-all duration-300 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
                    >
                        All
                    </TabsTrigger>
                    <TabsTrigger
                        value="fullstack"
                        className="px-8 tracking-wide font-[family-name:var(--font-instrument-serif)] py-2 text-sm md:text-base text-neutral-600 dark:text-white font-normal transition-all duration-300 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
                    >
                        Full Stack
                    </TabsTrigger>
                    <TabsTrigger
                        value="backend"
                        className="px-8 tracking-wide font-[family-name:var(--font-instrument-serif)] py-2 text-sm md:text-base text-neutral-600 dark:text-white font-normal transition-all duration-300 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
                    >
                        Backend
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            <AnimatePresence mode="wait">
                <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 px-2 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full md:w-[85%] mx-auto pb-16"
                >
                    {filteredProjects.map((proj) => (
                        <ProjectCard
                            key={proj.id}
                            title={proj.title}
                            image={proj.image}
                            link={proj.LiveLink || "#"}
                            name={proj.name}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
