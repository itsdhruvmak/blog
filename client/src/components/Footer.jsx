import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-white py-12 md:py-24 px-4 lg:pl-24 xl:pl-32 lg:pr-24 xl:pr-32">
            <div className="container mx-auto max-w-screen-2xl">
                <div className="grid gap-8 md:gap-12 lg:grid-cols-12">

                    {/* Newsletter Section */}
                    <div className="lg:col-span-4 space-y-6 md:space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase leading-tight">
                                Join the Literary <br className="hidden sm:block" /> Circle.
                            </h3>
                            <p className="text-gray-400 text-sm font-medium max-w-sm">
                                Receive my weekly Sunday dispatch on storytelling, Indian heritage, and the writer's life.
                            </p>
                        </div>

                        <form className="space-y-3 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                placeholder="YOUR NAME"
                                className="w-full bg-white/5 border border-white/10 px-4 text-[10px] md:text-xs font-bold tracking-widest text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 h-11 md:h-12 transition-all"
                            />
                            <input
                                type="email"
                                placeholder="YOUR EMAIL ADDRESS"
                                className="w-full bg-white/5 border border-white/10 px-4 text-[10px] md:text-xs font-bold tracking-widest text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 h-11 md:h-12 transition-all"
                            />
                            <button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200 font-extrabold text-[10px] md:text-xs tracking-[0.2em] h-11 md:h-12 transition-colors duration-200 uppercase"
                            >
                                Join the Journal
                            </button>
                        </form>

                        <div className="pt-2 md:pt-4">
                            <h4 className="font-bold text-base md:text-lg mb-1 tracking-tighter uppercase">Hitesh Lakhani</h4>
                            <p className="text-[10px] font-medium tracking-widest text-gray-500 uppercase">
                                © {new Date().getFullYear()} Ahmedabadi Stories. All rights reserved.
                            </p>

                            <div className="flex gap-5 mt-4 md:mt-6 text-gray-500">
                                <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <Instagram className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <Linkedin className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                                <Mail className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="lg:col-span-8 grid gap-x-4 gap-y-10 grid-cols-2 md:grid-cols-3">

                        {/* Categories */}
                        <div className="space-y-4 md:space-y-6">
                            <h4 className="font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase text-gray-600 border-b border-white/5 pb-2">Themes</h4>
                            <ul className="space-y-2 md:space-y-3 text-[12px] md:text-[13px] font-medium text-gray-400">
                                <li><Link to="#" className="hover:text-white transition-colors">Cultural Heritage</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Fiction & Prose</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">The Ahmedabad Chronicles</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Social Commentary</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Philosophy</Link></li>
                                <li><Link to="#" className="hover:text-white transition-colors">Modern India</Link></li>
                            </ul>
                        </div>

                        {/* Projects */}
                        <div className="space-y-8 md:space-y-12">
                            <div className="space-y-4 md:space-y-6">
                                <h4 className="font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase text-gray-600 border-b border-white/5 pb-2">Publications</h4>
                                <ul className="space-y-2 md:space-y-3 text-[12px] md:text-[13px] font-medium text-gray-400">
                                    <li><Link to="#" className="hover:text-white transition-colors">The Sunday Dispatch</Link></li>
                                    <li><Link to="#" className="hover:text-white transition-colors">Published Books</Link></li>
                                    <li><Link to="#" className="hover:text-white transition-colors">Short Story Archives</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <h4 className="font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase text-gray-600 border-b border-white/5 pb-2">Community</h4>
                                <ul className="space-y-2 md:space-y-3 text-[12px] md:text-[13px] font-medium text-gray-400">
                                    <li><Link to="#" className="hover:text-white transition-colors">Writing Workshops</Link></li>
                                    <li><Link to="#" className="hover:text-white transition-colors">Speaking Requests</Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Must Read */}
                        <div className="space-y-4 md:space-y-6 col-span-2 md:col-span-1">
                            <h4 className="font-bold tracking-[0.2em] text-[9px] md:text-[10px] uppercase text-gray-600 border-b border-white/5 pb-2">Top Essays</h4>
                            <ul className="space-y-4 text-[12px] md:text-[13px] font-medium text-gray-400">
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        Lost Dialects: Why our mother tongues are our greatest inheritance
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        From Mumbai to Ahmedabad: Finding a home in chaos
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        The 4:00 AM Routine: How I wrote my first 50,000 words
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:text-white transition-colors block leading-snug">
                                        Why local libraries are the sanctuaries of modern democracy
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