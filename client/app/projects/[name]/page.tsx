import Link from "next/link"
import { Link as ExternalLinkIcon, GithubIcon } from "lucide-react"
import { projectData } from "@/lib/data"
import { notFound, useParams } from "next/navigation"

export default function ProjectShowcase({ params }: { params: { name: string } }) {
    const projectDetails = projectData.filter(proj => proj.name === params.name)[0]

    if (!projectDetails) {
        return notFound()
    }
    return (
        <main className="min-h-screen ">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <Link href="/projects" className="text-sm dark:text-neutral-300 text-gray-600 hover:text-gray-900 mb-8 inline-block">
                    ← Back to projects
                </Link>

                {/* Title Section */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-bold dark:text-white text-gray-900">{projectDetails?.title}</h1>
                    <div className="flex gap-3">
                        {projectDetails.gitLink !== "" && <Link href={projectDetails.gitLink} target="_blank" className="p-2 cursor-pointer  rounded-full transition-colors">
                            <GithubIcon className="w-5 h-5 text-gray-700 dark:text-neutral-300 " />
                        </Link>}
                        {projectDetails?.LiveLink !== "" && <Link href={projectDetails.LiveLink} target="_blank" className="p-2 cursor-pointer rounded-full transition-colors">
                            <ExternalLinkIcon className="w-5 h-5 text-gray-700 dark:text-neutral-300" />
                        </Link>}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {projectDetails?.techStack?.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 border border-gray-300  dark:text-white rounded-full text-sm text-gray-700  transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Dashboard Image */}
                <div className="mb-8 rounded-lg overflow-hidden border ">
                    <img src={projectDetails?.image} alt="Lazy Commit Dashboard" className="w-full h-auto object-cover" />
                </div>


                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-neutral-400 mb-4">Description</h2>
                    <ul className="space-y-3 text-gray-700">
                        {projectDetails.overview.map((item, index) => (
                            <li key={index} className="flex gap-3">
                                <span className="text-gray-400 flex-shrink-0">•</span>
                                <span>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main >
    )
}
