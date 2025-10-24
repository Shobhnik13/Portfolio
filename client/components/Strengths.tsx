'use client'

import { strengthsData } from "@/lib/data"

const Strengths = () => {
    return (
        <div className="flex flex-col justify-center mt-12">
            <p className="font-[500] dark:text-slate-300">what i do best.</p>

            <ul className="mt-3 text-sm 2xl:text-base text-slate-700 dark:text-slate-600 list-disc list-inside space-y-2">
                {strengthsData.map((strength, index) => (
                    <li key={index} className="font-[500]">
                        {strength}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Strengths
