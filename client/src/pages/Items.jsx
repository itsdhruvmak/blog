import api from "../api/axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import appDesign from "../assets/appDesign.png";
import commit from "../assets/commitApp.png";
import psImg from "../assets/psImg.png";
import { ArrowRight, Loader2 } from "lucide-react";

const expiredItems = [
    {
        id: 1,
        title: "The App Design Handbook",
        description: "The complete guide to building full-stack applications with Next.js.",
        image: appDesign
    },
    {
        id: 2,
        title: "Photoshop for Web Design",
        description: "A comprehensive toolkit for digital creators to scale their business.",
        image: commit
    },
    {
        id: 3,
        title: "Commit App",
        description: "Learn how to build scalable and consistent design systems.",
        image: psImg
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

            {/* --- ACTIVE PRODUCTS SECTION --- */}
            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center gap-4 mb-16 mx-auto"
            >
                <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-black uppercase">
                    My Current Books & Products
                </h1>
                <p className="text-xl text-slate-500 max-w-3xl leading-relaxed mx-auto">
                    Over the years I’ve self-published three books, two courses, and a few apps and software products. While Kit is my main focus, books like Authority have served as a roadmap for an entire generation of creators.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                {items.map((item) => (
                    <motion.div
                        key={item._id}
                        variants={itemVariants}
                        whileHover={{ y: -8 }}
                        className="group flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                        </div>

                        <div className="p-8 flex flex-col flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                                {item.subCategory}
                            </span>

                            <h3 className="text-2xl font-bold mb-3 tracking-tight">{item.title}</h3>

                            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                                {item.description}
                            </p>

                            <div className="flex flex-col gap-3">
                                <button className="w-full bg-black text-white py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
                                    {item.category === "Book" ? "Learn More" : `Visit ${item.title}`}
                                </button>
                                <button className="w-full border border-slate-200 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
                                    {item.category === "Book" ? "Case Study" : "Read Articles"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* --- RETIRED PRODUCTS SECTION --- */}
            <hr className="my-24 border-slate-100" />

            <div className="flex flex-col items-start gap-4 mb-12">
                <h2 className="text-3xl font-black tracking-tighter uppercase sm:text-5xl">
                    Retired products
                </h2>
                <p className="text-lg text-slate-500 max-w-3xl">
                    A few of the products I’ve built over the years are out of date or no longer available. I decided to leave them up for reference.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                {expiredItems.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="group border-b border-transparent hover:border-slate-200 pb-8 transition-all"
                    >
                        <div className="aspect-video w-full overflow-hidden rounded-lg mb-6 grayscale hover:grayscale-0 transition-all duration-700">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                            {item.description}
                        </p>

                        <button className="flex items-center gap-2 text-black font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                            Case Study
                            <ArrowRight size={16} />
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}