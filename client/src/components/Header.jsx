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
                        <span className="text-xl font-black tracking-tighter uppercase">
                            NATHAN BARRY
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8 text-[12px] font-bold uppercase tracking-[0.2em]">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "relative transition-colors hover:text-black",
                                    pathname === item.href ? "text-black" : "text-slate-400"
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

                <div className="hidden md:flex items-center gap-6 text-slate-400">
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

                {/* Mobile Toggle & Search */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 text-slate-600 hover:text-black transition-colors"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-slate-600 hover:text-black transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 60, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-slate-100 bg-white px-4 flex items-center"
                    >
                        <div className="relative w-full flex items-center">
                            <Search size={16} className="absolute left-3 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                autoFocus
                                className="w-full bg-slate-50 py-2 pl-10 pr-4 rounded-full text-sm outline-none focus:ring-1 focus:ring-black"
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="ml-2 text-xs font-bold uppercase tracking-wider"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 px-6 py-8"
                    >
                        <nav className="flex flex-col space-y-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-2xl font-bold tracking-tighter uppercase",
                                        pathname === item.href ? "text-black" : "text-slate-300"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex gap-6 mt-12 pt-8 border-t border-slate-100 text-slate-400">
                            <Twitter size={20} />
                            <Youtube size={20} />
                            <Search size={20} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}