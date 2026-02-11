import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-white py-16 md:py-24">
            <div className="container mx-auto px-4 lg:pl-24 xl:pl-32 max-w-screen-2xl">
                <div className="grid gap-12 lg:grid-cols-12">

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-3xl font-bold tracking-tighter text-white uppercase leading-none">
                                Subscribe to the <br /> weekly newsletter.
                            </h3>
                            <p className="text-gray-400 text-sm font-medium">
                                Join 50,000+ others receiving my best content on business and design.
                            </p>
                        </div>

                        <form className="space-y-3 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="YOUR FIRST NAME"
                                className="w-full bg-white/5 border border-white/10 px-4 text-xs font-bold tracking-widest text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 h-12 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="YOUR EMAIL ADDRESS"
                                className="w-full bg-white/5 border border-white/10 px-4 text-xs font-bold tracking-widest text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 h-12 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200 font-extrabold text-xs tracking-[0.2em] h-12 transition-colors duration-200 uppercase"
                            >
                                Subscribe
                            </button>
                        </form>

                        <div className="pt-4">
                            <h4 className="font-bold text-lg mb-1 tracking-tighter uppercase">NATHAN BARRY</h4>
                            <p className="text-[11px] font-medium tracking-widest text-gray-500 uppercase">
                                © {new Date().getFullYear()} All rights reserved.
                            </p>

                            <div className="flex gap-5 mt-6 text-gray-500">
                                <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <Github className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <Linkedin className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <Mail className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="lg:col-span-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3">

                        {/* Categories */}
                        <div className="space-y-6">
                            <h4 className="font-bold tracking-[0.2em] text-[10px] uppercase text-gray-600">Categories</h4>
                            <ul className="space-y-3 text-[13px] font-medium text-gray-400">
                                <li><Link to="#" className="hover:text-white transition-colors">Audience Building</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Business</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Design</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Investments</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Learning</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Life</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Marketing</Link></li>
                            </ul>
                        </div>

                        {/* Formats & Products */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h4 className="font-bold tracking-[0.2em] text-[10px] uppercase text-gray-600">Formats</h4>
                                <ul className="space-y-3 text-[13px] font-medium text-gray-400">
                                    <li><Link to="#" className="hover:text-white transition-colors">Podcast</Link></li>
                                    <li><Link to="#" className="hover:text-white transition-colors">Newsletter</Link></li>
                                    <li><Link to="#" className="hover:text-white transition-colors">Books</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-bold tracking-[0.2em] text-[10px] uppercase text-gray-600">Products</h4>
                                <ul className="space-y-3 text-[13px] font-medium text-gray-400">
                                    <li><Link to="#" className="hover:text-white transition-colors">The Creator Kit</Link></li>
                                    <li><Link to="#" className="hover:text-white transition-colors">Course: Master Design</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Must Read */}
                        <div className="space-y-6">
                            <h4 className="font-bold tracking-[0.2em] text-[10px] uppercase text-gray-600">Must Read</h4>
                            <ul className="space-y-5 text-[13px] font-medium text-gray-400">
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        How I Made $19,000 on the App Store While Learning to Code
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        One Year After Quitting My Job
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        Starting The Web App Challenge: From Zero to $5,000/month
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        Designing Buttons in iOS
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}