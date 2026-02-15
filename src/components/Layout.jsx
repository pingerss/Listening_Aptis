import React from 'react';
import { motion } from 'framer-motion';
import { Headphones } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30 overflow-x-hidden font-sans">
            {/* Animated Gradient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -45, 0],
                        x: [0, -50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[100px]"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
            </div>

            <header className="sticky top-0 z-50 backdrop-blur-2xl bg-slate-950/60 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 cursor-pointer group"
                        onClick={() => window.location.reload()}
                    >
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40 group-hover:scale-110 transition-transform duration-500 ease-out">
                            <Headphones className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                                APTIS PRO
                            </h1>
                            <span className="text-xs uppercase tracking-[0.3em] font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">Mastery Center</span>
                        </div>
                    </motion.div>

                    <nav className="hidden lg:flex items-center gap-10">
                        {['Dashboard', 'Practice', 'Tests', 'Progress', 'Support'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-base font-bold text-slate-400 hover:text-white transition-all relative group h-24 flex items-center"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-6">
                        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-white/10 hover:border-white/30 transition-all font-black text-xs text-slate-400 hover:text-white tracking-tighter">
                            EN
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-16 relative z-10 min-h-[calc(100vh-200px)]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {children}
                </motion.div>
            </main>

            <footer className="py-16 border-t border-white/10 bg-slate-950/40 backdrop-blur-md relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <Headphones className="w-6 h-6 text-indigo-500" />
                        <span className="text-xl font-black text-white">APTIS PRO</span>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold">&copy; 2024 Aptis Pro Learning Environment. Professional Grade Excellence.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
