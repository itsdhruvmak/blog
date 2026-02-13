import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../components/Pagination";
import blogVideo from "../assets/blogVideo.jpg";
import literature from "../assets/literaturre.jpg";
import lothal from "../assets/lothal.png";
import { useEffect } from "react";
import api from "../api/axios";


export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await api.get("/api/blogs");
                if (response.data.success) {
                    setPosts(response.data.data);
                } else {
                    setError("Failed to fetch blogs");
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
                setError("An error occurred while fetching blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container pt-8 pb-12 md:pt-16 md:pb-24 px-4 mx-auto overflow-hidden bg-white">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 mb-20 text-center"
            >
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter sm:text-6xl text-black uppercase">
                    Blog
                </h1>
                <p className="text-lg text-gray-400 max-w-xl font-medium tracking-tight">
                    Videos on building, scaling, and the creative process.
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto min-h-[600px]">
                <motion.div
                    layout
                    className="grid gap-x-4 gap-y-10 sm:gap-x-10 sm:gap-y-16 grid-cols-2"
                >
                    <AnimatePresence mode="popLayout">
                        {currentPosts.map((post, index) => (
                            <motion.div
                                key={post._id}
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
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                    <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
                                        <span className="bg-black text-white px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] font-bold tracking-[0.2em]">
                                            EP {post.episode}
                                        </span>
                                    </div>
                                </a>

                                <div className="mt-4 sm:mt-8 space-y-2 sm:space-y-3">
                                    <div className="text-[9px] sm:text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase">
                                        {post.date}
                                    </div>

                                    {/* WRAPPER LINK FOR TITLE */}
                                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                                        {/* Adjusted font size for mobile: text-lg vs text-2xl */}
                                        <h3 className="text-sm sm:text-2xl font-bold text-black leading-tight tracking-tight group-hover:text-gray-600 transition-colors duration-300 cursor-pointer line-clamp-2">
                                            {post.title}
                                        </h3>
                                    </a>

                                    <div className="relative pt-1 sm:pt-2 w-fit">
                                        <a
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[10px] sm:text-[13px] font-bold uppercase tracking-widest text-black cursor-pointer"
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