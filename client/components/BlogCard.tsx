"use client"

import Link from "next/link"
import { GoArrowUpRight } from "react-icons/go"

export default function BlogCard({
    title,
    description,
    date,
    readTime,
    tags,
    href,
}: {
    title: string
    description: string
    date: string
    readTime: string
    tags: string[]
    href: string
}) {
    return (
        <div className="border-b border-neutral-800 py-6 px-4 sm:py-8 sm:px-6 group">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-8">
                <div className="flex-1 flex flex-col gap-2 sm:gap-4">
                    {/* Title */}
                    <h2 className="font-serif text-lg sm:text-xl md:text-2xl ">{title}</h2>

                    {/* Metadata: small screens below title */}
                    <div className="flex sm:hidden items-center gap-4 text-xs text-neutral-500 mt-1">
                        <p className="uppercase tracking-wide">{date}</p>
                        <p className="uppercase tracking-wide">{readTime}</p>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mt-1 sm:mt-0">
                        {description}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap text-xs sm:text-sm">
                        {tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-neutral-500 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                        {tags.length > 3 && (
                            <span className="text-neutral-500 uppercase tracking-wide">
                                +{tags.length - 3}
                            </span>
                        )}
                    </div>

                    {/* MEDIUM link stays below tags */}
                    <Link
                        href={href}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 font-medium transition-all duration-200 hover:underline"
                    >
                        MEDIUM
                        <span className="transition-transform duration-200 inline-block ">
                            <GoArrowUpRight size={12} />
                        </span>
                    </Link>
                </div>

                {/* Right-side metadata for medium+ screens */}
                <div className="hidden sm:flex flex-col text-right flex-shrink-0 gap-1">
                    <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wide">{date}</p>
                    <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wide">{readTime}</p>
                </div>
            </div>
        </div>
    )
}
