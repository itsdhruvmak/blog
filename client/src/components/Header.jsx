import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Twitter, Youtube, Search } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Books & Products", href: "/items" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const location = useLocation();
    const pathname = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32 mx-auto">

                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center space-x-2 shrink-0">
                        <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
                            Hitesh Lakhani
                        </span>
                    </Link>

                    {/* DESKTOP NAV: Hidden on Mobile & Tablet (lg:flex) */}
                    <nav className="hidden lg:flex items-center space-x-8 text-[12px] font-bold uppercase tracking-[0.2em]">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "relative transition-colors hover:text-black",
                                    pathname === item.href ? "text-black" : "text-slate-500"
                                )}
                            >
                                {item.name}
                                {pathname === item.href && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-[30px] left-0 right-0 h-[2px] bg-black"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* DESKTOP EXTRAS: Hidden on Mobile & Tablet (lg:flex) */}
                <div className="hidden lg:flex items-center gap-6 text-slate-400">
                    <div className="flex items-center gap-4 border-r border-slate-200 pr-6">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                            <Twitter size={18} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                            <Youtube size={18} />
                        </a>
                    </div>

                    <div className="flex items-center">
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.input
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 160, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    type="text"
                                    placeholder="Search..."
                                    className="text-sm bg-transparent border-b border-slate-200 focus:outline-none focus:border-black text-black mr-2 pb-1"
                                    autoFocus
                                />
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="hover:text-black transition-colors"
                        >
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* MOBILE & TABLET TOGGLE: Visible until Large (lg:hidden) */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        onClick={() => {
                            setIsSearchOpen(!isSearchOpen);
                            if (isOpen) setIsOpen(false); // Close menu if search opens
                        }}
                        className="p-2 text-slate-600 hover:text-black transition-colors"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                            if (isSearchOpen) setIsSearchOpen(false); // Close search if menu opens
                        }}
                        className="p-2 text-slate-600 hover:text-black transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* MOBILE & TABLET SEARCH BAR: Full width dropdown */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 70, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="lg:hidden border-t border-slate-100 bg-white px-6 flex items-center overflow-hidden"
                    >
                        <div className="relative w-full flex items-center max-w-3xl mx-auto">
                            <Search size={18} className="absolute left-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                autoFocus
                                className="w-full bg-slate-100 py-3 pl-12 pr-4 rounded-xl text-sm outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="ml-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-black"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* MOBILE & TABLET MENU: Overlapping dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full lg:hidden bg-white border-b border-slate-100 px-8 py-10 shadow-2xl z-50 overflow-hidden"
                    >
                        <nav className="flex flex-col space-y-8">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        to={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-3xl font-black tracking-tighter uppercase transition-colors",
                                            pathname === item.href ? "text-black" : "text-slate-200 hover:text-slate-400"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="flex gap-8 mt-12 pt-8 border-t border-slate-100 text-slate-400">
                            <a href="#" className="hover:text-black transition-colors"><Twitter size={24} /></a>
                            <a href="#" className="hover:text-black transition-colors"><Youtube size={24} /></a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}