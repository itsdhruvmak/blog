import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../components/Pagination";
import api from "../api/axios";

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

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
            <div className="flex items-center justify-center min-h-[600px] bg-white">
                <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-4 bg-white">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Notice</h2>
                <p className="text-slate-500 mb-6 text-sm">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="border border-slate-200 text-slate-900 px-6 py-2 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen selection:bg-slate-900 selection:text-white">
            {/* Studio Masthead */}
            <header className="pt-24 pb-20 px-4 lg:px-24 xl:px-32">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                            <span className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase">Archive Index</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-none font-sans">
                            THE <span className="text-slate-300">MODERN</span> GALLERY
                        </h1>
                        <p className="text-slate-400 text-sm max-w-md font-medium leading-relaxed tracking-tight">
                            A curated exhibition of digital craft, building cycles, and creative observations.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="px-4 lg:px-24 xl:px-32 pb-32">
                <div className="max-w-screen-2xl mx-auto space-y-20">

                    {/* Modern Architectural Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                        <AnimatePresence mode="popLayout">
                            {currentPosts.map((post, index) => (
                                <motion.div
                                    key={post._id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.6 }}
                                    className="group flex flex-col cursor-pointer"
                                >
                                    <a href={post.link} target="_blank" rel="noopener noreferrer" className="block space-y-8">
                                        {/* Image Container with Embedded Meta */}
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Top-Right Tag */}
                                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white/90 backdrop-blur text-[8px] font-black text-slate-950 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                                    Enter
                                                </div>
                                            </div>

                                            {/* Bottom-Left Embedded Badge */}
                                            <div className="absolute bottom-4 left-4">
                                                <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 border border-white/10">
                                                    <span className="text-[9px] font-black text-white uppercase tracking-widest">EP {post.episode}</span>
                                                    <div className="h-2 w-px bg-white/20" />
                                                    <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">{post.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Below */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">Observation</span>
                                                {index === 0 && currentPage === 1 && (
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
                                                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Newest</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight uppercase group-hover:text-blue-600 transition-colors duration-300">
                                                {post.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                                                {post.description}
                                            </p>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Modern Centered Pagination */}
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-24 flex flex-col items-center gap-6" // Reduced gap
                    >
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                        <span className="text-[10px] font-black text-slate-200 uppercase tracking-[1em] block text-center">
                            End Observation
                        </span>
                    </motion.div> */}
                </div>
            </main>
        </div>
    );
}
