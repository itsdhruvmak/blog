import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import userImage from "../assets/userImage.png"
import api from '../api/axios';

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


export default function Home() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await api.get('/api/blogs');
            if (response.data.success) {
                setBlogs(response.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch blogs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">

            {/* Modern Hero Section */}
            <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32">
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
                                    Indian Writer
                                </span>
                                <h1 className="text-5xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-900">
                                    Observe. Write. <br />
                                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                        Repeat.
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                                    I’m Hitesh Lakhani—a writer, observer, and storyteller. I spend my days exploring the quiet intersections of urban life and human emotion through prose. When I’m not lost in a manuscript, I’m likely wandering the streets of Mumbai, searching for the stories that usually go untold.
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
                                    <p className="text-lg font-extrabold text-slate-900">The I Am A Writer</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Premium Bookshelf Section - Selected Bibliography */}
            <section className="pt-16 md:pt-24 pb-8 md:pb-12 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none hidden lg:block">
                    <span className="text-[180px] font-black leading-none uppercase tracking-tighter">Archive</span>
                </div>

                <div className="max-w-screen-2xl mx-auto px-4 lg:pl-24 xl:pl-32 lg:pr-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <span className="inline-block py-1 px-3 bg-blue-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.3em]">
                                The Library
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">
                                Selected <br /> <span className="text-blue-600">Bibliography</span>
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-md"
                        >
                            <p className="text-lg text-slate-500 font-medium leading-relaxed italic">
                                "A writer's work is a record of his curiosities. Here are the volumes that define my journey through Indian culture and urban storytelling."
                            </p>
                        </motion.div>
                    </div>

                    {/* The Bookshelf Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {[
                            { title: "The I Am A Writer", year: "2023", color: "from-slate-100 to-slate-200" },
                            { title: "Mumbai Rhythms", year: "2021", color: "from-blue-100 to-indigo-100" },
                            { title: "The Silent Manuscript", year: "2019", color: "from-orange-50 to-orange-100" },
                            { title: "Urban Tales of India", year: "2017", color: "from-zinc-100 to-zinc-200" }
                        ].map((book, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer perspective-1000"
                            >
                                {/* 3D Book Container */}
                                <div className="relative aspect-[3/4] transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(-25deg)_rotateX(5deg)_translateZ(20px)]">
                                    {/* Spine shadow */}
                                    <div className="absolute inset-0 bg-black/10 rounded-r-lg blur-md translate-x-1 translate-y-2 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Main Cover Placeholder */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${book.color} border border-slate-200 rounded-r-lg shadow-2xl overflow-hidden flex flex-col justify-between p-8`}>
                                        <div className="space-y-4">
                                            <div className="w-12 h-[2px] bg-slate-900 opacity-20" />
                                            <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                                                {book.title}
                                            </h3>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Published {book.year}</p>
                                            <span className="text-[10px] font-bold italic text-slate-900">H. Lakhani</span>
                                        </div>
                                    </div>

                                    {/* Book Spine (3D depth) */}
                                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-slate-300 origin-left [transform:rotateY(-90deg)] group-hover:bg-slate-400 transition-colors" />
                                </div>

                                {/* Label below book */}
                                <div className="mt-8 space-y-2 text-center lg:text-left">
                                    <Link to="/books" className="inline-flex items-center gap-2 group/btn">
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-900 group-hover/btn:text-blue-600 transition-colors">View Details</span>
                                        <ArrowRight size={14} className="text-slate-400 group-hover/btn:translate-x-1 transition-all" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-20 pt-16 border-t border-slate-200 flex flex-col items-center text-center"
                    >
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-4">Complete Bibliography</p>
                        <Link to="/books" className="text-slate-900 font-serif italic text-3xl md:text-4xl hover:text-blue-600 transition-colors border-b-2 border-slate-100 hover:border-blue-100 pb-2">
                            Discover the full collection (08 Volumes)
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Premium Narrative Layers Section */}
            <section className="pt-8 md:pt-12 pb-8 md:pb-12 bg-[#fafafa] relative overflow-hidden">
                <div className="max-w-screen-2xl mx-auto px-4 lg:pl-24 xl:pl-32 lg:pr-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                        {/* Left Side: Interactive Portrait & Signature */}
                        <div className="lg:col-span-5 relative group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative rounded-[40px] overflow-hidden aspect-[4/5] bg-slate-200 shadow-2xl shadow-slate-200/50"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                                    alt="The Chronicler"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />

                                {/* Self-drawing Signature Overlay */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <svg viewBox="0 0 200 60" className="w-48 h-auto text-white opacity-80">
                                        <motion.path
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            whileInView={{ pathLength: 1, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                                            d="M10,45 Q30,10 50,45 T90,45 T130,45 T170,45"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <text x="10" y="55" className="text-[10px] font-serif italic fill-current">Hitesh Lakhani</text>
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 border border-slate-200 rounded-[48px] -z-10 translate-x-4 translate-y-4" />
                        </div>

                        {/* Right Side: The Facet Cards */}
                        <div className="lg:col-span-7 space-y-12">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                                className="space-y-12"
                            >
                                <motion.div variants={fadeInUp} className="space-y-4">
                                    <span className="text-xs font-bold tracking-[0.4em] text-blue-600 uppercase">The Narrative Layers</span>
                                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none tracking-tighter">
                                        Defining the <br /> <span className="text-blue-600">Chronicler's Identity.</span>
                                    </h2>
                                </motion.div>

                                <div className="grid grid-cols-1 gap-6">
                                    {[
                                        {
                                            num: "01",
                                            title: "The Observer",
                                            desc: "Witnessing life in the chaos of Mumbai’s local trains and the silence of Rajasthani deserts.",
                                            badge: "Cultural"
                                        },
                                        {
                                            num: "02",
                                            title: "The Architect",
                                            desc: "Building literary worlds where the pulse of modern India meets the ancient rhythm of heritage.",
                                            badge: "Craft"
                                        },
                                        {
                                            num: "03",
                                            title: "The Bridge",
                                            desc: "Connecting the weight of printed paper with the high-velocity frequency of the digital future.",
                                            badge: "Purpose"
                                        }
                                    ].map((facet, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={fadeInUp}
                                            whileHover={{ x: 10 }}
                                            className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer relative overflow-hidden"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                                <div className="flex gap-6 items-start">
                                                    <span className="text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors uppercase font-mono">{facet.num}</span>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="text-xl font-bold text-slate-900">{facet.title}</h3>
                                                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-slate-50 text-slate-400 rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                                {facet.badge}
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-500 leading-relaxed text-sm max-w-md">
                                                            {facet.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                                                </div>
                                            </div>

                                            {/* Hover Glow Effect */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div variants={fadeInUp} className="pt-4">
                                    <Link to="/about" className="text-xs font-bold uppercase tracking-[0.3em] text-slate-900 border-b-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all pb-1">
                                        Discover the complete journey
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-px bg-slate-200 -z-10 hidden xl:block" />
            </section>

            {/* Premium Content Pillars - Bento Grid Replacement for Stats */}
            <section className="pt-8 md:pt-12 pb-16 md:pb-24 px-4 bg-white relative overflow-hidden">
                <div className="max-w-screen-2xl mx-auto lg:pl-24 xl:pl-32 lg:pr-24">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="space-y-16"
                    >
                        {/* Section Header */}
                        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="space-y-4 text-center md:text-left">
                                <span className="inline-block py-1 px-3 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-[0.3em]">
                                    The Focus Areas
                                </span>
                                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                                    Exploring the <br /> <span className="text-blue-600">Writing Universe.</span>
                                </h2>
                            </div>
                            <p className="text-slate-500 font-medium max-w-md text-center md:text-left border-l-2 border-slate-100 pl-6 hidden md:block">
                                A curated look into the themes that drive my creative process and literary exploration.
                            </p>
                        </motion.div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[240px]">
                            {/* Card 01: Large - Fiction & Narrative */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="md:col-span-8 md:row-span-2 group relative rounded-3xl overflow-hidden bg-slate-900 text-white p-10 flex flex-col justify-end"
                            >
                                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop"
                                        alt="Fiction"
                                        className="w-full h-full object-cover grayscale"
                                    />
                                </div>
                                <div className="relative z-20 space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Pillar 01</span>
                                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">Fiction & <br /> Narratives</h3>
                                    <p className="text-slate-400 text-lg max-w-md leading-relaxed">
                                        Crafting immersive literary worlds that blend traditional Indian storytelling with modern sensibilities.
                                    </p>
                                    <Link to="/books" className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest pt-4 group/link">
                                        Explore Volumes <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Card 02: Medium - Cultural Commentary */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden bg-blue-600 text-white p-8 flex flex-col justify-between"
                            >
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Pillar 02</span>
                                    <h3 className="text-2xl font-black tracking-tight uppercase">Cultural <br /> Commentary</h3>
                                </div>
                                <p className="text-blue-100 text-sm leading-relaxed line-clamp-2">
                                    Observations on art, design, and the evolving identity of contemporary India.
                                </p>
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            </motion.div>

                            {/* Card 03: Small - Writing Craft */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden bg-white border border-slate-100 p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pillar 03</span>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">The <br /> Craft</h3>
                                </div>
                                <div className="h-1 w-12 bg-blue-600 group-hover:w-full transition-all duration-500" />
                            </motion.div>

                            {/* Card 04: Medium - Curated Reading */}
                            <motion.div
                                variants={fadeInUp}
                                whileHover={{ y: -5 }}
                                className="md:col-span-12 md:row-span-1 group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 p-8 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pillar 04</span>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight uppercase leading-none">Curated <br className="hidden md:block" /> Reading</h3>
                                </div>
                                <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
                                    A monthly digest of essential reading across literature, philosophy, and history that fuels the creative engine.
                                </p>
                                <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors">
                                    Subscribe Now
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Writing Section*/}
            <section className="pt-4 md:pt-8 pb-12 md:pb-16 px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32 bg-white overflow-hidden">
                <div className="max-w-screen-2xl mx-auto">

                    {/* Header Section */}
                    <div className="flex flex-col mb-10 md:mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                            Latest <span className="text-blue-500">Writing</span>
                        </h2>
                        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                    </div>

                    {/* Modern Asymmetric Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : blogs.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* LEFT: Featured Post (First one) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="lg:col-span-7 group cursor-pointer"
                                onClick={() => blogs[0].link && window.open(blogs[0].link, '_blank')}
                            >
                                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 mb-6">
                                    <img
                                        src={blogs[0].thumbnail}
                                        alt={blogs[0].title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                                            Latest
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm font-bold text-blue-600 uppercase tracking-widest">
                                        <span>Ep. {blogs[0].episode}</span>
                                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                        <span className="text-slate-400">{blogs[0].date}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                                        {blogs[0].title}
                                    </h3>
                                    <p className="text-slate-500 text-lg leading-relaxed max-w-2xl line-clamp-2">
                                        {blogs[0].description || "Check out the latest update and deep dive into our most recent story."}
                                    </p>
                                </div>
                            </motion.div>

                            {/* RIGHT: Stacked Secondary Posts (Takes 5/12 columns) */}
                            <div className="lg:col-span-5 flex flex-col gap-8">
                                {blogs.slice(1, 4).map((post) => (
                                    <motion.div
                                        key={post._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="group flex gap-6 items-center p-4 rounded-3xl hover:bg-slate-50 transition-colors cursor-pointer"
                                        onClick={() => post.link && window.open(post.link, '_blank')}
                                    >
                                        <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-200">
                                            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {post.date}
                                            </p>
                                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
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
                    ) : (
                        <div className="text-center py-20 text-slate-500 font-medium">
                            No blog posts found. Check back later!
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
