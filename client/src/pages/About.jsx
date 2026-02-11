import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import cerrogordo from "../assets/cerrogordo.png"
import rightMessage from "../assets/rightMessage.png"
import manyChat from "../assets/manyChat-1.png"
import ropig from "../assets/ropig-1.png"
import hotel from "../assets/hotel-cover.jpg"
import blogVideo from "../assets/blogVideo.jpg"

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function About() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="container max-w-screen-2xl py-12 md:py-24 space-y-32 mx-auto px-4 lg:px-24 xl:px-32"
        >
            {/* --- HERO SECTION --- */}
            <header className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <motion.h1
                    variants={fadeInUp}
                    className="text-5xl font-bold tracking-tighter sm:text-6xl text-black uppercase"
                >
                    About Me
                </motion.h1>
                <motion.p
                    variants={fadeInUp}
                    className="text-xl md:text-3xl mt-10 leading-tight text-slate-600 font-medium tracking-tight"
                >
                    Hey there! My name’s Nathan and I like to build audiences and companies. Right now 110% of my time is focused on building Kit: the operating system for creators who mean business.
                </motion.p>
            </header>

            {/* --- MISSION SECTION --- */}
            <motion.div
                variants={fadeInUp}
                className="max-w-3xl space-y-12"
            >

                <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-slate-500 font-light">
                    <p>
                        My mission is to help creators earn a living.
                    </p>
                    <p>
                        Growing up without money I’ve seen the impact that not enough money has on relationships and stress. From an early age I was determined to unlock whatever secrets were necessary to earn a great living.
                    </p>
                    <p>
                        Jason Fried from Basecamp taught me that making money is a skill, just like playing an instrument or learning to create.
                    </p>
                    <p>
                        My journey started with freelance web design, moved into selling iPhone apps, then growing my own audience and selling books on design.
                    </p>
                </div>
            </motion.div>

            {/* Kit Founder Section - Aligned to Grid */}
            {/* <motion.section
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
            </motion.section> */}

            {/* --- YOUTUBE SECTION --- */}
            <section className="space-y-12 pt-20 border-t border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-red-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
                            My Video Blog
                        </h2>
                        <p className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tighter">
                            While YouTube will never be my main focus, I enjoy creating vlog
                            episodes to document my experiences.
                        </p>
                    </div>
                    <div className="pb-2">
                        <a
                            href="#"
                            className="inline-flex items-center gap-3 bg-[#FF0000] text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="bg-white text-[#FF0000] rounded-full p-1 flex items-center justify-center">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-3 h-3 translate-x-[0.5px]">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </span>
                            Subscribe on YouTube
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <motion.div whileHover={{ y: -5 }} className="group cursor-pointer">
                        <div className="aspect-video bg-slate-100 mb-6 overflow-hidden rounded-xl">
                            <img src={blogVideo} alt="Vlog" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-widest leading-snug group-hover:text-red-600 transition-colors">
                            Stranded without a passport...
                        </h3>
                    </motion.div>
                </div>
            </section>

            {/* --- INVESTMENTS SECTION --- */}
            <section className="pt-20 border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="space-y-6">
                        <h2 className="text-[#0077A8] font-bold uppercase tracking-[0.2em] text-[10px]">
                            My Investments
                        </h2>
                        <p className="text-3xl font-bold text-gray-900 leading-tight tracking-tighter">
                            While Kit is my main focus, I have made a few angel investments in companies I believe in.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-16 items-center">
                        <img src={ropig} alt="Logo" className="h-6 grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer" />
                        <img src={manyChat} alt="Logo" className="h-6 grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer" />
                        <img src={rightMessage} alt="Logo" className="h-6 grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer" />
                        <img src={cerrogordo} alt="Logo" className="h-6 grayscale opacity-40 hover:opacity-100 transition-all cursor-pointer" />

                    </div>
                </div>
            </section>

            {/* --- STORY SECTION --- */}
            <section className="space-y-12 pt-20 border-t-2 border-black">
                <div className="flex items-center justify-between pb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight tracking-tighter">
                        Investment Stories
                    </h2>
                    <a href="#" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                        More Articles <span>→</span>
                    </a>
                </div>

                <motion.div
                    whileHover={{ y: -10 }}
                    className="max-w-xl group cursor-pointer"
                >
                    <div className="relative p-6 bg-slate-50 mb-8 rounded-2xl">
                        <div className="aspect-[16/9] overflow-hidden rounded-lg shadow-2xl">
                            <img src={hotel} alt="Ghost town" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                        </div>
                    </div>
                    <div className="space-y-3 px-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">November 26, 2018</p>
                        <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 group-hover:underline decoration-4">
                            We bought a ghost town
                        </h3>
                    </div>
                </motion.div>
            </section>
        </motion.div>
    );
}