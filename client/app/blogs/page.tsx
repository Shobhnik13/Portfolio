"use client"

import BlogsHero from "@/components/BlogHero"
import BlogCard from "@/components/BlogCard"
import { blogData } from "@/lib/data"


export default function BlogsPage() {
    return (
        <div className="w-full flex flex-col items-center">
            <BlogsHero />
            <div className="w-full max-w-5xl mt-12 px-4">
                {blogData.map((post, index) => (
                    <BlogCard
                        key={index}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        readTime={post.readTime}
                        tags={post.tags}
                        href={post.href}
                    />
                ))}
            </div>
        </div>
    )
}
