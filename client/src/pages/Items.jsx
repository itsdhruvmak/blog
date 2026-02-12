import api from "../api/axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import appDesign from "../assets/appDesign.png";
import commit from "../assets/commitApp.png";
import psImg from "../assets/psImg.png";
import { ArrowRight, Loader2 } from "lucide-react";
import poetryBookImg from "../assets/robin.jpg";
import essaySeriesImg from "../assets/discover.jpg";
import memoirImg from "../assets/monk.jpg";

const expiredItems = [
    {
        id: 1,
        title: "Kalam Aur Kaagaz",
        description: "My debut collection of Hindi poetry exploring the nostalgia of small-town India and the passage of time.",
        image: poetryBookImg
    },
    {
        id: 2,
        title: "Naya Daur",
        description: "A series of investigative essays on how the digital revolution changed the social fabric of rural India.",
        image: essaySeriesImg
    },
    {
        id: 3,
        title: "Shabdon Ka Safar",
        description: "A limited-edition memoir chronicling my early years as a struggling writer in a rapidly changing Mumbai.",
        image: memoirImg
    }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98]
        }
    }
};

export default function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBooks = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/items/all");
            setItems(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
            </div>
        );
    }

    return (
        <div className="container py-12 md:py-24 mx-auto px-4 lg:px-24 xl:px-32">

            {/* --- ACTIVE LITERARY WORKS SECTION --- */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center gap-4 mb-10 md:mb-16 mx-auto"
            >
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase">
                    Published Works & Projects
                </h1>
                <p className="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed mx-auto">
                    Throughout my career, I’ve authored eight volumes exploring the intersection of
                    modern technology and Indian heritage. From my debut novel to deep-dives
                    into creator economics, my writing serves as a bridge for those navigating
                    the vibrant, evolving landscape of the subcontinent.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 md:gap-10 sm:grid-cols-2 lg:grid-cols-3"
            >
                {items.map((item) => (
                    <motion.div
                        key={item._id}
                        variants={itemVariants}
                        className="group relative flex flex-col bg-white rounded-[2rem] p-4 border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-blue-100"
                    >
                        {/* Image Container with Floating Badge */}
                        <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-slate-50">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                                <span className="backdrop-blur-md bg-white/70 border border-white/40 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] text-slate-800">
                                    {item.subCategory}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="px-2 md:px-4 pt-6 md:pt-8 pb-4 flex flex-col flex-1">
                            <h3 className="text-2xl font-black mb-3 tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 md:mb-8 line-clamp-3">
                                {item.description}
                            </p>
                            <div className="mt-auto flex items-center justify-between gap-4">
                                <button className="flex-1 bg-slate-900 cursor-pointer text-white py-3 px-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-600 transition-all duration-300 active:scale-95">
                                    {item.category === "book" ? "Learn More" : `Visit ${item.subCategory}`}
                                </button>
                                <button className="group/link flex items-center cursor-pointer gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                                    {item.category === "book" ? "Case Study" : "Articles"}
                                    <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* --- RETIRED PRODUCTS SECTION --- */}
            <hr className="my-12 md:my-16 border-slate-100" />

            <div className="flex flex-col items-start gap-4 mb-8 md:mb-12">
                <h2 className="text-3xl font-black tracking-tighter uppercase md:text-5xl text-slate-900">
                    The Literary Archive
                </h2>
                <p className="text-base md:text-lg text-slate-500 max-w-3xl leading-relaxed">
                    Every writer has a path littered with early drafts and out-of-print editions.
                    These are the columns, early anthologies, and experimental essays that
                    defined my voice before I found my current stride. I keep them here as a
                    testament to the process.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-x-8 gap-y-8 md:gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            >
                {expiredItems.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        className="group relative flex flex-col cursor-pointer border-t border-slate-100 pt-6 md:pt-8"
                    >
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-4 md:mb-6">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover md:grayscale md:opacity-60 scale-100 md:group-hover:grayscale-0 md:group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                            />
                            <div className="absolute bottom-4 left-4 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <span className="bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter text-white">
                                    Archive Vol. 01
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col h-[130px] md:h-[140px]">
                            <div className="flex items-center justify-between mb-2 md:mb-3">
                                <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter group-hover:text-gray-900 transition-colors">
                                    {item.title}
                                </h3>
                                <span className="text-[10px] font-mono text-slate-400">/0{item.id}</span>
                            </div>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-2 md:opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                                {item.description}
                            </p>
                            <div className="mt-auto flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]">
                                <span className="relative">
                                    View Case Study
                                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gray-900 group-hover:w-full transition-all duration-300" />
                                </span>
                                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}