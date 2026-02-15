import React from 'react';
import { motion } from 'framer-motion';
import {
    PlayCircle,
    Headphones,
    Clock,
    BookOpen,
    Shuffle,
    Zap,
    Trophy,
    ChevronRight,
    Target,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { updateModules } from '../data/listening_data';

const HomeView = ({ onSelectTest, onSelectUpdate, onRandomTest }) => {
    // Generate all 15 tests
    const tests = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `LISTENING ${i + 1}`,
        questions: 25,
        duration: "25m",
        difficulty: i < 5 ? "Beginner" : i < 10 ? "Intermediate" : "Advanced"
    }));

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1 }
    };

    return (
        <div className="flex flex-col gap-24">
            {/* Hero Section */}
            <section className="text-center space-y-12 max-w-5xl mx-auto py-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold mb-6"
                >
                    <Zap className="w-5 h-5 fill-indigo-400" />
                    <span className="text-sm tracking-wider uppercase font-black">Performance Boost Active</span>
                </motion.div>

                <div className="space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-8xl font-black tracking-tight leading-[1.05]"
                    >
                        BECOME AN <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 uppercase">
                            APTIS PRO
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-2xl font-semibold max-w-3xl mx-auto leading-relaxed"
                    >
                        Experience the most advanced listening simulator. Clearer audio,
                        bigger text, and perfectly balanced interactive modules.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <button
                        onClick={onRandomTest}
                        className="w-full sm:w-auto px-10 py-6 bg-white text-slate-950 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 group"
                    >
                        <Shuffle className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" />
                        Random module
                    </button>

                    <button className="w-full sm:w-auto px-10 py-6 bg-slate-900/50 text-white rounded-[2rem] font-black text-xl border border-white/10 flex items-center justify-center gap-4 hover:bg-slate-850 transition-all hover:border-indigo-500/30">
                        <Target className="w-7 h-7 text-indigo-400" />
                        My stats
                    </button>
                </motion.div>
            </section>

            {/* Main Grid Section */}
            <section className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-4xl font-black text-white">CHOOSE A MODULE</h3>
                        <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">15 Total Professional Sets</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map((filter, i) => (
                            <button key={filter} className={`px-6 py-3 rounded-2xl text-sm font-black transition-all border
                ${i === 0 ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900/50 border-white/5 text-slate-500 hover:text-white hover:border-white/20'}
              `}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {tests.map((test) => (
                        <motion.div
                            key={test.id}
                            variants={item}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-1 rounded-[2.5rem] transition-all group-hover:border-indigo-500/50 overflow-hidden flex flex-col">
                                <div className="bg-slate-950/40 rounded-[2.3rem] p-8 h-full flex flex-col gap-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-500">
                                            <Headphones className="w-8 h-8 text-indigo-400 group-hover:text-white" />
                                        </div>
                                        <span className={`text-[11px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest
                      ${test.difficulty === 'Beginner' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                                                test.difficulty === 'Intermediate' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
                                                    'text-rose-400 border-rose-400/20 bg-rose-400/5'}
                    `}>
                                            {test.difficulty}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-4xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-none">
                                            {test.title}
                                        </h3>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-5 h-5 text-slate-500" />
                                                <span className="text-base font-black text-slate-400 uppercase">{test.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-slate-500" />
                                                <span className="text-base font-black text-slate-400 uppercase">{test.questions} Qs</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onSelectTest(test.id)}
                                        className="w-full mt-auto py-6 bg-slate-900 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-4 transition-all border border-white/5 hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-600/40 active:scale-95"
                                    >
                                        <PlayCircle className="w-7 h-7" />
                                        START NOW
                                        <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Update Modules Section */}
            <section className="space-y-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-amber-500/20 pb-10">
                    <div className="space-y-2 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black text-xs tracking-widest uppercase mb-3">
                            <Sparkles className="w-4 h-4 fill-amber-400" />
                            Câu hỏi bổ sung
                        </div>
                        <h3 className="text-4xl font-black text-white">BỘ CÂU HỎI BỔ SUNG</h3>
                        <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">3 Bộ câu hỏi Update dạng riêng</p>
                    </div>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {updateModules.map((mod) => (
                        <motion.div
                            key={mod.id}
                            variants={item}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-slate-900/40 backdrop-blur-3xl border border-amber-500/20 p-1 rounded-[2.5rem] transition-all group-hover:border-amber-500/50 overflow-hidden flex flex-col">
                                <div className="bg-slate-950/40 rounded-[2.3rem] p-8 h-full flex flex-col gap-8">
                                    <div className="flex justify-between items-start">
                                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-500">
                                            <Sparkles className="w-8 h-8 text-amber-400 group-hover:text-white" />
                                        </div>
                                        <span className="text-[11px] font-black px-4 py-1.5 rounded-full border uppercase tracking-widest text-amber-400 border-amber-400/20 bg-amber-400/5">
                                            {mod.questions.length} CÂU
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight leading-tight">
                                            {mod.title}
                                        </h3>
                                        {mod.subtitle && (
                                            <p className="text-sm font-bold text-slate-400 leading-relaxed">
                                                {mod.subtitle}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => onSelectUpdate(mod.id)}
                                        className="w-full mt-auto py-6 bg-slate-900 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-4 transition-all border border-white/5 hover:bg-amber-600 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-600/40 active:scale-95"
                                    >
                                        <PlayCircle className="w-7 h-7" />
                                        LÀM BÀI
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default HomeView;
