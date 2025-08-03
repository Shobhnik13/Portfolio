'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { blogData } from '@/lib/data';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const slideInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
};

const Blog = () => {
    const [viewMore, setViewMore] = useState(false);
    const visibleBlogs = viewMore ? blogData : blogData.slice(0, 3);

    return (
        <motion.div
            className="flex flex-col justify-center mt-16 pb-10"
            {...fadeInUp}
        >
            {/* Header */}
            <motion.p
                className="font-[500]"
                {...slideInLeft}
            >
                blogs.
            </motion.p>

            {/* Blog Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            >
                <AnimatePresence initial={false}>
                    {visibleBlogs.map((blog, index) => (
                        <motion.div
                            layout
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="border-l-2 hover:border-purple-300 hover:duration-200 flex flex-col gap-y-1 p-4 transition-colors duration-300"
                            whileHover={{ x: 10, transition: { duration: 0.2 } }}
                        >
                            <motion.a
                                href={blog.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Blog Image */}
                                <motion.div
                                    className="w-full aspect-[16/9] mb-4 overflow-hidden rounded-lg bg-gray-100"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-center object-cover transition-transform duration-300 hover:scale-[1.02]"
                                    />
                                </motion.div>

                                {/* Title */}
                                <motion.h3
                                    className="text-base font-[500] capitalize text-gray-900 hover:font-bold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    {blog.title}
                                </motion.h3>
                            </motion.a>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* View More Button */}
            {blogData.length > 3 && (
                <motion.div
                    className="flex justify-center mt-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    <motion.button
                        className="w-[140px] md:w-[180px] lg:w-[220px] h-10 md:h-12 text-sm md:text-base bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setViewMore(!viewMore)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {viewMore ? 'View less' : 'View more'}
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Blog;