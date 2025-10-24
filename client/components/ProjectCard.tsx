"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ProjectCard({ title, image, link = "#", name }: any) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-950/50 overflow-hidden backdrop-blur-md hover:border-neutral-700 transition-all duration-300"
        >
            {/* Image Section */}
            <div className="relative w-full h-48 sm:h-52 md:h-60 rounded-t-2xl overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover object-center min-h-full min-w-full scale-105 transition-transform duration-500"
                    />
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
            </div>

            {/* Project Title */}
            <h3 className="px-4 border-t bg-gray-100 dark:bg-neutral-900 text-gray-800 dark:text-neutral-300 border-neutral-800 font-semibold text-center pt-2 pb-1 text-base sm:text-lg font-[family-name:var(--font-instrument-serif)]  tracking-wider ">
                {title}
            </h3>

            {/* Bottom Section */}
            <div className="flex items-center justify-center border-t  p-3 sm:p-4 rounded-b-2xl 
                            bg-neutral-200 dark:bg-neutral-950 transition-colors duration-300">
                <Link
                    href={`/projects/${name}`}
                    className="text-sm text-gray-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 flex items-center"
                >
                    Details →
                </Link>
            </div>
        </motion.div>
    )
}
