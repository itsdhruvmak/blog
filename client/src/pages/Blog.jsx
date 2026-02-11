import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../components/Pagination";
import blogVideo from "../assets/blogVideo.jpg"

const posts = [
    {
        id: 1,
        title: "How I Actually Grew To 1M+ Subscribers On YouTube (Noah Kagan)",
        episode: "114",
        date: "February 5, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 2,
        title: "How To Partner With Anyone In 2026 (Proven Framework)",
        episode: "113",
        date: "January 29, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 3,
        title: "The Future of Design Systems with Vercel's VP of Design",
        episode: "112",
        date: "January 22, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 4,
        title: "Building a SaaS from Scratch: 0 to $10k MRR",
        episode: "111",
        date: "January 15, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 5,
        title: "Building a SaaS from Scratch: 0 to $10k MRR",
        episode: "111",
        date: "January 15, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 6,
        title: "Building a SaaS from Scratch: 0 to $10k MRR",
        episode: "111",
        date: "January 15, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 7,
        title: "Building a SaaS from Scratch: 0 to $10k MRR",
        episode: "111",
        date: "January 15, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    {
        id: 8,
        title: "Building a SaaS from Scratch: 0 to $10k MRR",
        episode: "111",
        date: "January 15, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    },
    ,
    {
        id: 9,
        title: "Building a SaaS from Scratch: 0 to $10k MRR",
        episode: "111",
        date: "January 15, 2026",
        thumbnail: blogVideo,
        link: "https://youtu.be/y-eykYhsa-c?si=BBhxXOheFTqAfPnY",
    }
];

export default function BlogPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <div className="container pt-8 pb-12 md:pt-16 md:pb-24 px-4 mx-auto overflow-hidden bg-white">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 mb-20 text-center"
            >
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-black uppercase">
                    Blog
                </h1>
                <p className="text-lg text-gray-400 max-w-xl font-medium tracking-tight">
                    Videos on building, scaling, and the creative process.
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto min-h-[600px]">
                <motion.div
                    layout
                    className="grid gap-x-10 gap-y-16 sm:grid-cols-2"
                >
                    <AnimatePresence mode="popLayout">
                        {currentPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                    ease: [0.215, 0.61, 0.355, 1]
                                }}
                                className="group flex flex-col"
                            >
                                {/* WRAPPER LINK FOR THUMBNAIL */}
                                <a
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm cursor-pointer"
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ duration: 0.6, ease: "circOut" }}
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-full object-cove transition-all duration-700"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-black text-white px-3 py-1 text-[10px] font-bold tracking-[0.2em]">
                                            EP {post.episode}
                                        </span>
                                    </div>
                                </a>

                                <div className="mt-8 space-y-3">
                                    <div className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                                        {post.date}
                                    </div>

                                    {/* WRAPPER LINK FOR TITLE */}
                                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                                        <h3 className="text-2xl font-bold text-black leading-tight tracking-tight group-hover:text-gray-600 transition-colors duration-300 cursor-pointer">
                                            {post.title}
                                        </h3>
                                    </a>

                                    <div className="relative pt-2 w-fit">
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[13px] font-bold uppercase tracking-widest text-black cursor-pointer"
                                        >
                                            Read Article
                                        </a>
                                        <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-500 ease-in-out" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-t border-gray-100 pt-12"
            >
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </motion.div>
        </div>
    );
}