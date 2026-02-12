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

            {/* Modern Hero Section */}
            <section className="relative overflow-hidden pt-8 pb-20 lg:pt-12 lg:pb-28 px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-orange-50/50 blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-screen-2xl">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                    >
                        {/* Left Content */}
                        <div className="lg:col-span-7 text-left space-y-8">
                            <motion.div variants={fadeInUp} className="space-y-4">
                                <span className="inline-block py-1 px-3 rounded-full bg-black/5 text-sm font-semibold tracking-wide uppercase">
                                    Founder of Kit
                                </span>
                                <h1 className="text-5xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-900">
                                    Design. Build. <br />
                                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                        Repeat.
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                                    I’m Hitesh Lakhani—a creator, author, and designer. I like to build audiences and companies.Right now 110% of my time is focused on building Kit: the operating system for creators who mean business.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <Link to="/books-products">
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group flex cursor-pointer items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-black/20 hover:bg-zinc-800 transition-all"
                                    >
                                        Explore My Work
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </motion.button>
                                </Link>
                                <Link to="/blog">
                                    <motion.button
                                        whileHover={{ backgroundColor: "#f8fafc" }}
                                        className="px-8 py-4 cursor-pointer rounded-full font-bold border-2 border-slate-200 text-slate-900 transition-colors"
                                    >
                                        Read the Blog
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Image Feature */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative z-10 w-full aspect-square md:max-w-md mx-auto">
                                {/* Main Image Container */}
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-full h-full rounded-3xl overflow-hidden border-[12px] border-white shadow-2xl rotate-2"
                                >
                                    <img src={userImage} alt="Hitesh Lakhani" className="object-cover w-full h-full scale-105" />
                                </motion.div>

                                {/* Floating Stats/Badge Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block"
                                >
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Recent Book</p>
                                    <p className="text-lg font-extrabold text-slate-900">The I Am A Creator</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Intro Section - Adjusted margins */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="mt-12 mb-8 md:mb-12 max-w-screen-2xl mx-auto px-4 lg:pl-24 xl:pl-32 text-left"
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

            {/* Kit Founder Section - Adjusted padding */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="bg-[#fafafa] pt-12 pb-8 md:pb-12 px-4"
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

            {/* Reviews/Stats Section */}
            <section className="relative py-8 md:py-12 px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                <div className="max-w-screen-2xl mx-auto relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:flex md:flex-row justify-between items-start gap-y-8 md:gap-y-12 gap-x-6 md:gap-4"
                    >
                        {/* Founded */}
                        <motion.div variants={fadeInUp} className="flex-1 group">
                            <div className="space-y-1">
                                <p className="text-blue-600 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                                    Founded
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">2013</h3>
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium max-w-[160px] leading-snug">
                                    From side project to creator powerhouse.
                                </p>
                            </div>
                        </motion.div>

                        <div className="hidden md:block h-16 w-px bg-slate-100 self-center"></div>

                        {/* Revenue */}
                        <motion.div variants={fadeInUp} className="flex-1 group">
                            <div className="space-y-1">
                                <p className="text-emerald-600 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                                    Revenue
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">$45M</h3>
                                    <span className="text-lg font-bold text-slate-400">+</span>
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium max-w-[160px] leading-snug">
                                    Annual revenue with zero outside funding.
                                </p>
                            </div>
                        </motion.div>

                        <div className="hidden md:block h-16 w-px bg-slate-100 self-center"></div>

                        {/* The Team */}
                        <motion.div variants={fadeInUp} className="flex-1 group">
                            <div className="space-y-1">
                                <p className="text-orange-600 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                                    The Team
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">95</h3>
                                    <span className="text-lg font-bold text-slate-400">+</span>
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium max-w-[160px] leading-snug">
                                    Global team operating with transparency.
                                </p>
                            </div>
                        </motion.div>

                        <div className="hidden md:block h-16 w-px bg-slate-100 self-center"></div>

                        {/* Impact */}
                        <motion.div variants={fadeInUp} className="flex-1 group">
                            <div className="space-y-1">
                                <p className="text-purple-600 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                                    Impact
                                </p>
                                <div className="flex items-baseline gap-1">
                                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">$10M</h3>
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm font-medium max-w-[160px] leading-snug">
                                    Profit shared directly with our employees.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Writing Section*/}
            <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32 bg-white overflow-hidden">
                <div className="max-w-screen-2xl mx-auto">

                    {/* Header Section */}
                    <div className="flex flex-col mb-10 md:mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            Latest <span className="text-blue-500">Writing</span>
                        </h2>
                        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                    </div>

                    {/* Modern Asymmetric Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="lg:col-span-7 group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 mb-6">
                                <img
                                    src={blogVideo}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                        Featured
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm font-bold text-blue-600 uppercase tracking-widest">
                                    <span>Ep. {posts[0].episode}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-slate-400">{posts[0].date}</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 group-hover:text-gray-900 transition-colors leading-tight">
                                    {posts[0].title}
                                </h3>
                                <p className="text-slate-500 text-lg leading-relaxed max-w-2xl">
                                    Nathan breaks down the exact flywheels used to scale Kit to a $45M powerhouse while maintaining 100% ownership.
                                </p>
                            </div>
                        </motion.div>

                        {/* RIGHT: Stacked Secondary Posts (Takes 5/12 columns) */}
                        <div className="lg:col-span-5 flex flex-col gap-8">
                            {posts.slice(1, 4).map((post) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="group flex gap-6 items-center p-4 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-200">
                                        <img src={blogVideo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {post.date}
                                        </p>
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-gray-900 transition-colors leading-snug">
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                                            Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-2">Want the highlights?</h4>
                                    <p className="text-blue-100 text-sm mb-6">Join 50,000+ creators getting weekly strategy deep dives.</p>
                                    <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                                        Join the Newsletter
                                    </button>
                                </div>
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-50 shadow-inner"></div>
                            </motion.div>
                        </div>

                    </div>

                    {/* Footer Link / Pagination */}
                    <div className="mt-8 md:mt-12 border-t border-slate-100 pt-8">
                        <Pagination
                            currentPage={1}
                            totalPages={52}
                            onPageChange={(page) => {
                                if (page === 1) navigate('/blog');
                                else navigate(`/blog?page=${page}`);
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}