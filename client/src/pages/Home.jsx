import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import authority from "../assets/authority.png";
import appDesign from "../assets/appDesign.png";
import psImg from "../assets/psImg.png";
import commitApp from "../assets/commitApp.png"
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import userImage from "../assets/userImage.png"
import blogVideo from "../assets/blogVideo.jpg"

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const PRODUCTS = [
    { title: "THE APP DESIGN HANDBOOK", img: appDesign, link: "/books/app-design" },
    { title: "DESIGNING WEB APPLICATIONS", img: psImg, link: "/books/web-apps" },
    { title: "PHOTOSHOP FOR WEB DESIGN", img: commitApp, link: "/books/photoshop" }
];

const posts = [
    { id: 1, title: "How I Actually Grew To 1M+ Subscribers On YouTube (Noah Kagan)", episode: "114", date: "February 5, 2026", thumbnail: appDesign, link: "#" },
    { id: 2, title: "How To Partner With Anyone In 2026 (Proven Framework)", episode: "113", date: "January 29, 2026", thumbnail: appDesign, link: "#" },
    { id: 3, title: "The Future of Design Systems with Vercel's VP of Design", episode: "112", date: "January 22, 2026", thumbnail: appDesign, link: "#" },
    { id: 4, title: "Building a SaaS from Scratch: 0 to $10k MRR", episode: "111", date: "January 15, 2026", thumbnail: appDesign, link: "#" }
];

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center pt-20 pb-12 md:pt-24 md:pb-16 px-4 text-center">
                <div className="container px-4 md:px-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center space-y-8"
                    >
                        {/* Profile Image with subtle floating effect */}
                        <motion.div
                            variants={fadeInUp}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 shadow-xl"
                        >
                            <img src={userImage} alt="NATHAN BARRY" className="object-cover w-full h-full" />
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                Hello, I'm Nathan Barry.
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                                I’m a creator, author, speaker, designer, and the founder of Kit.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col gap-4 min-[400px]:flex-row">
                            <Link to="/books-products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
                                >
                                    Explore Work
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                            <Link to="/blog">
                                <motion.button
                                    whileHover={{ backgroundColor: "#f3f4f6" }}
                                    className="border px-6 py-3 cursor-pointer rounded-lg font-medium transition"
                                >
                                    Read Blog
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* About/Design Section - Aligned to the Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="mt-12 mb-24 max-w-screen-2xl mx-auto px-4 lg:pl-24 xl:pl-32 text-left"
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    <motion.div variants={fadeInUp} className="md:col-span-5">
                        <h2 className="text-6xl md:text-8xl font-serif font-bold tracking-tight leading-none text-slate-900">
                            I design <br />
                            <span className="underline decoration-1 underline-offset-8">products.</span>
                        </h2>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="md:col-span-3">
                        <p className="text-lg text-slate-600 font-serif leading-relaxed">
                            I’ve always cared about great visual design, but a few years ago I learned
                            that I loved to teach as well. That led to starting this blog, building iPhone
                            apps, and writing several books.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} className="md:col-span-4 space-y-6">
                        <p className="text-lg text-slate-600 font-serif leading-relaxed">
                            This site chronicles my journey learning to create the best products
                            possible. All while teaching others to do the same.
                        </p>
                        <Link
                            to="/about"
                            className="inline-flex items-center group text-teal-800 font-serif italic font-bold border-b border-teal-100 hover:border-teal-800 transition-colors"
                        >
                            A little more about me
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Kit Founder Section - Aligned to Grid */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="bg-[#fafafa] py-24 px-4"
            >
                <div className="max-w-screen-2xl mx-auto lg:pl-24 xl:pl-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <motion.div variants={fadeInUp} className="md:col-span-8 space-y-6">
                        <h4 className="text-[11px] font-bold tracking-[0.3em] text-blue-600 uppercase">I'M THE FOUNDER OF KIT.</h4>
                        <p className="text-2xl md:text-4xl text-slate-900 font-serif leading-tight">
                            As a creator I realized the tools for building an audience just didn't cut it. So I started Kit: the operating system for creators.
                        </p>
                        <Link to="/about" className="inline-flex items-center gap-2 text-slate-900 font-serif italic font-bold border-b border-slate-200 pb-1 hover:border-slate-900 transition-all group">
                            Learn more about the SaaS journey
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            <section className="relative py-24 px-6 overflow-hidden bg-[#fafafa]">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center relative z-10"
                >
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="group relative bg-white/40 backdrop-blur-md border border-white/20 p-10 w-full h-72 flex flex-col justify-center items-center rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
                    >
                        <div className="text-blue-600 mb-2 font-mono text-sm tracking-widest font-bold uppercase opacity-60">Legacy</div>
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">2013</h3>
                        <p className="text-slate-600 text-sm mt-1 text-center font-medium">Started as side project</p>

                        <div className="h-px w-12 bg-slate-200 my-6"></div>

                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">100%</h3>
                        <p className="text-slate-600 text-sm mt-1 font-medium">Bootstrapped</p>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="group relative bg-white/60 backdrop-blur-lg border border-white/40 p-10 w-full h-80 flex flex-col justify-center items-center rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] md:-mt-8"
                    >
                        <div className="text-green-600 mb-2 font-mono text-sm tracking-widest font-bold uppercase opacity-60">Growth</div>
                        <h3 className="text-5xl font-bold text-slate-900 tracking-tight">$45M+</h3>
                        <p className="text-slate-600 text-base mt-1 font-medium italic">Annual revenue</p>

                        <div className="h-px w-16 bg-slate-200 my-6"></div>

                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">$5M+</h3>
                        <p className="text-slate-600 text-sm mt-1 font-medium">Annual profit</p>

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        whileHover={{ y: -10, transition: { duration: 0.2 } }}
                        className="group relative bg-white/40 backdrop-blur-md border border-white/20 p-10 w-full h-72 flex flex-col justify-center items-center rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
                    >
                        <div className="text-orange-600 mb-2 font-mono text-sm tracking-widest font-bold uppercase opacity-60">Impact</div>
                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">95+</h3>
                        <p className="text-slate-600 text-sm mt-1 text-center font-medium px-4">Team members globally</p>

                        <div className="h-px w-12 bg-slate-200 my-6"></div>

                        <h3 className="text-4xl font-bold text-slate-900 tracking-tight">$10M+</h3>
                        <p className="text-slate-600 text-sm mt-1 font-medium">Profit shared</p>
                    </motion.div>
                </motion.div>
            </section>

            <section className="py-24 px-6 bg-[#f1f4f6]">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
                    >
                        <div>
                            <p className="text-xs tracking-[0.25em] text-blue-900 uppercase mb-4">I TEACH EVERYTHING I KNOW.</p>
                            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                                <span className="underline decoration-2">Become a creator</span> <br />
                                and <span className="underline decoration-2">grow your audience.</span>
                            </h2>
                        </div>
                        <a href="#" className="flex items-center gap-2 text-sm italic text-slate-800 hover:opacity-70 transition">more recent articles →</a>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-12"
                    >
                        {posts.map((post) => (
                            <motion.div variants={fadeInUp} key={post.id} className="space-y-4 group cursor-pointer">
                                <div className="aspect-video overflow-hidden rounded-lg">
                                    <img src={blogVideo} alt={post.title} className="w-full h-full object-cover transition group-hover:scale-105" />
                                </div>
                                <div className="text-sm text-gray-400">Episode {post.episode} • {post.date}</div>
                                <h3 className="text-xl font-semibold group-hover:text-gray-900 transition">{post.title}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                <Pagination
                    currentPage={1}
                    totalPages={52}
                    onPageChange={(page) => {
                        if (page === 1) navigate('/blog');
                        else navigate(`/blog?page=${page}`);
                    }}
                />
            </section>
        </div>
    );
}