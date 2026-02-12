import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Video, Youtube } from "lucide-react";
import writer from "../assets/writer.jpg"
import sahityaAkademi from "../assets/sahitya.png"
import penguinIndia from "../assets/penguin.png"
import gujaratLiteratureFest from "../assets/gujaratfest.png"
import lothal from "../assets/lothal.png"

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function About() {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-white selection:bg-blue-100"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 space-y-12 md:space-y-16">

                {/* --- HERO SECTION: Minimalist Founder Layout --- */}
                <header className="relative border-b border-slate-100 pb-8 md:pb-12">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-24">

                        {/* Left Side: Clean Title with Accent */}
                        <motion.div
                            variants={fadeInUp}
                            className="lg:w-1/3"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-10 h-[2px] bg-blue-600"></span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600">Portfolio</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-none uppercase">
                                About <br />
                                <span className="text-slate-300">Hitesh </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="lg:w-2/3 lg:pt-16"
                        >
                            <p className="text-3xl md:text-5xl font-medium tracking-tight text-slate-800 leading-[1.15]">
                                Namaste! My name’s Hitesh and I like to build
                                <span className="text-blue-600"> stories that bridge worlds.</span>
                            </p>

                            <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-6">
                                <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed">
                                    Right now, my creative energy is dedicated to exploring the unspoken
                                    narratives of modern India through my upcoming novel and weekly columns.
                                </p>

                                {/* Subtle Interactive Element */}
                                <div className="hidden md:block h-px w-12 bg-slate-200"></div>
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                    Currently Drafting: The Ahmedabad Chronicles
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </header>

                {/* --- MISSION SECTION --- */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-8 md:mt-12 mb-16 md:mb-24">
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                        <h2 className="text-[10px] font-bold tracking-[0.4em] text-blue-600 uppercase mb-4 md:mb-6 flex items-center gap-4">
                            <span className="w-12 h-px bg-blue-600"></span> The Mission
                        </h2>
                        <p className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                            Giving voice to <br className="hidden md:block" /> the silent narratives.
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-8 md:space-y-12 text-lg md:text-2xl leading-relaxed text-slate-500 font-light">
                        <motion.p variants={fadeInUp}>
                            Growing up in the heart of India, I witnessed how quickly traditions and personal histories
                            vanish in the rush toward the future. I realized that if we don't write our own stories,
                            the world will write them for us—often missing the nuance and the soul.
                        </motion.p>
                        <motion.p variants={fadeInUp}>
                            I’ve learned that storytelling is more than a craft; it is a responsibility. Just like
                            a classical raga, it requires discipline, observation, and the courage to
                            speak a truth that resonates across borders.
                        </motion.p>
                        <motion.p variants={fadeInUp}>
                            My journey began in the local libraries of Gujarat, moved through the chaotic
                            energy of Mumbai’s journalism scene, and eventually led to crafting novels that
                            explore the complex, beautiful identity of the modern Indian creator.
                        </motion.p>
                    </div>
                </section>

                {/* --- YOUTUBE: Modern Video Bento --- */}
                <section className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 text-white mb-6 md:mb-8">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
                        <div className="max-w-xl space-y-5 md:space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                <Video size={12} fill="currentColor" /> Visual Narratives
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tighter">
                                Capturing the rhythm <br className="hidden md:block" /> of the subcontinent.
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                                Beyond the written word, I use cinema to document the hidden corners of India—capturing the faces and places that inspire my novels.
                            </p>
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href="#"
                                className="inline-flex items-center gap-4 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                Watch the Creative Journey <ArrowUpRight size={16} />
                            </motion.a>
                        </div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="relative group w-full lg:w-[400px] xl:w-[480px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5"
                        >
                            <img
                                src={writer}
                                alt="Documenting India"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                                    Ep. 12: Finding silence in Old Delhi...
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* --- INVESTMENTS: Vertical Stacked Layout --- */}
                <section className="pt-12 pb-24 border-t border-slate-100 mb-0">
                    <div className="max-w-4xl">
                        <div className="space-y-6 mb-16">
                            <h2 className="text-[#2563eb] font-bold uppercase tracking-[0.3em] text-xs">
                                Community & Collaborations
                            </h2>
                            <p className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tighter">
                                I support the voices <br />
                                <span className="text-slate-400">that shape our future.</span>
                            </p>
                        </div>

                        {/* Replace your previous company logos with Literary/Cultural partners */}
                        <div className="flex flex-wrap items-center gap-x-16 gap-y-10">
                            {[sahityaAkademi, penguinIndia, gujaratLiteratureFest].map((logo, i) => (
                                <motion.img
                                    key={i}
                                    whileHover={{ y: -4, opacity: 1 }}
                                    src={logo}
                                    alt="Literary Partner Logo"
                                    className="h-10 w-auto object-contain opacity-40 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                                />
                            ))}
                        </div>

                        <p className="mt-8 text-slate-500 text-sm font-medium italic">
                            *Proudly supporting independent Indian publishers and regional storytelling initiatives.
                        </p>
                    </div>
                </section>

                {/* --- STORY: Cinematic Feature --- */}
                <section className="space-y-12">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-8">
                        <h2 className="text-5xl font-black tracking-tighter text-slate-900">Featured Essays</h2>
                        <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 group">
                            Read the Journal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="group relative cursor-pointer"
                    >
                        <div className="relative aspect-[16/9] md:aspect-[2.4/1] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
                            {/* Image: Use something atmospheric like a misty Indian landscape or an ancient library */}
                            <img
                                src={lothal}
                                alt="Ancient Roots"
                                className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 space-y-2 md:space-y-4">
                                <p className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                                    The Heritage Series
                                </p>

                                <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                                    Finding silence in the <br className="md:hidden" />
                                    <span className="text-blue-400">ruins of lothal</span>
                                </h3>

                                <div className="pt-2">
                                    <div className="w-8 h-1 bg-blue-500 rounded-full group-hover:w-16 transition-all duration-500" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
}