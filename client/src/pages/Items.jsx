import api from "../api/axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, ShoppingCart, CheckCircle2 } from "lucide-react";
import poetryBookImg from "../assets/robin.jpg";
import essaySeriesImg from "../assets/discover.jpg";
import memoirImg from "../assets/monk.jpg";
import { useAuth } from "../AuthContext";
import { useCart } from "../CartContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

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
    const [purchaseSuccess, setPurchaseSuccess] = useState(null);
    const { user } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

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

    const handleBuyNow = async (item) => {
        if (!user) {
            // Redirect to auth page and save the current location to return after login
            navigate("/auth", { state: { from: location } });
            return;
        }

        // Add to cart instead of dummy purchase
        await addToCart(item._id, 1);
        setPurchaseSuccess(item._id);
        setTimeout(() => setPurchaseSuccess(null), 3000);
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
        <div className="bg-white min-h-screen selection:bg-slate-900 selection:text-white py-6 md:py-10">

            {/* Studio Masthead */}
            <header className="pt-8 pb-20 px-4 lg:px-24 xl:px-32">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                            <span className="text-[10px] font-bold tracking-[0.4em] text-slate-400 uppercase">Product Index</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-none font-sans">
                            PUBLISHED <span className="text-slate-300">WORKS</span> & PROJECTS
                        </h1>
                        <p className="text-slate-400 text-sm max-w-md font-medium leading-relaxed tracking-tight">
                            A curated selection of books, investigative essays, and digital projects exploring Indian heritage and modern tech.
                        </p>
                    </motion.div>
                </div>
            </header>

            <main className="px-4 lg:px-24 xl:px-32">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item._id}
                                variants={itemVariants}
                                className="group flex flex-col cursor-pointer"
                            >
                                {/* Image Container with Embedded Meta */}
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Top-Right Price Tag */}
                                    {item.price && (
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/90 backdrop-blur text-[9px] font-black text-slate-950 px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                                ₹{item.price}
                                            </div>
                                        </div>
                                    )}

                                    {/* Bottom-Left Embedded Badge */}
                                    <div className="absolute bottom-4 left-4">
                                        <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 border border-white/10">
                                            <span className="text-[9px] font-black text-white uppercase tracking-widest">{item.subCategory}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Below */}
                                <div className="pt-8 space-y-4 flex flex-col flex-1">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">{item.category}</span>
                                            {index === 0 && (
                                                <div className="flex items-center gap-1.5">
                                                    <div className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
                                                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Featured</span>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight uppercase group-hover:text-blue-600 transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 flex items-center justify-between gap-4">
                                        <button
                                            onClick={() => handleBuyNow(item)}
                                            className={`flex-1 py-3 px-6 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${purchaseSuccess === item._id
                                                ? "bg-green-500 text-white"
                                                : "bg-slate-900 text-white hover:bg-blue-600"
                                                }`}
                                        >
                                            {purchaseSuccess === item._id ? "Added to Cart" : (item.category === "book" ? "Buy Now" : "Pre-order")}
                                        </button>
                                        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors py-2">
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </main>


            {/* --- THE LITERARY ARCHIVE --- */}
            <div className="px-4 lg:px-24 xl:px-32 pb-32">
                <div className="max-w-screen-2xl mx-auto">
                    <hr className="my-16 md:my-20 border-slate-100" />

                    <div className="flex flex-col items-start gap-4 mb-10">
                        <div className="flex items-center gap-3">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                            <span className="text-[10px] font-bold tracking-[0.4em] text-slate-300 uppercase">Vault Index</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase leading-none font-sans">
                            THE <span className="text-slate-300">LITERARY</span> ARCHIVE
                        </h2>
                        <p className="text-slate-400 text-sm max-w-md font-medium leading-relaxed tracking-tight">
                            An architectural collection of early drafts, out-of-print editions, and experimental essays that defined my voice.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                    >
                        {expiredItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                className="group flex flex-col cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover md:grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                                            Archive V.0{item.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-8 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight uppercase group-hover:text-slate-500 transition-colors">
                                            {item.title}
                                        </h3>
                                        <span className="text-[10px] font-bold text-slate-300 uppercase">/0{item.id}</span>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 font-medium">
                                        {item.description}
                                    </p>
                                    <div className="pt-4 flex items-center gap-2 text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] group/btn">
                                        <span className="relative">
                                            View Repository
                                            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-slate-950 group-hover/btn:w-full transition-all duration-500" />
                                        </span>
                                        <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}