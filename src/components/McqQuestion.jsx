import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const McqQuestion = ({ question, options, selectedAnswer, onSelect, showResult, correctAnswer, index }) => {
    // question can be a string or an object with { question, translation, explanation }
    const questionText = typeof question === 'string' ? question : question.question;
    const translation = typeof question === 'object' ? question.translation : null;
    const explanation = typeof question === 'object' ? question.explanation : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] flex flex-col gap-10 hover:border-indigo-500/30 transition-all duration-500 group"
        >
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-xl border border-indigo-500/20">
                        {index + 1}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/20 to-transparent" />
                </div>
                <h4 className="text-3xl font-black text-white leading-tight tracking-tight uppercase group-hover:text-indigo-400 transition-colors">
                    {questionText}
                </h4>
            </div>

            <div className="grid gap-4">
                {options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === correctAnswer;
                    const showSuccess = showResult && isCorrect;
                    const showDanger = showResult && isSelected && !isCorrect;

                    return (
                        <button
                            key={idx}
                            onClick={() => !showResult && onSelect(option)}
                            disabled={showResult}
                            className={`
                                w-full p-6 rounded-2xl text-left transition-all duration-300 flex items-center gap-4
                                ${isSelected
                                    ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/20 ring-2 ring-indigo-400/50 scale-[1.02]'
                                    : 'bg-slate-900 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/50'}
                                ${showSuccess ? 'bg-emerald-600 border-emerald-400 !scale-[1.02] shadow-emerald-600/20 ring-2 ring-emerald-400' : ''}
                                ${showDanger ? 'bg-rose-600 border-rose-400 !scale-[1.02] shadow-rose-600/20 ring-2 ring-rose-400' : ''}
                                ${showResult ? 'cursor-default' : 'hover:scale-[1.01] active:scale-[0.99]'}
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black transition-colors
                                ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}
                                ${showSuccess ? 'bg-emerald-400/20 text-white' : ''}
                                ${showDanger ? 'bg-rose-400/20 text-white' : ''}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="text-xl font-bold flex-1">{option}</span>
                            {showSuccess && <Check className="w-6 h-6 text-white" />}
                            {showDanger && <X className="w-6 h-6 text-white" />}
                        </button>
                    );
                })}
            </div>

            {/* Translation & Explanation Feedback */}
            <AnimatePresence>
                {showResult && (translation || explanation) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-8 border-t border-slate-700/50 space-y-4"
                    >
                        {translation && (
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/30">
                                <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-2">🇻🇳 Dịch nghĩa</p>
                                <p className="text-2xl font-bold text-slate-100 italic leading-relaxed">
                                    {translation}
                                </p>
                            </div>
                        )}
                        {explanation && (
                            <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                                <p className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-2">💡 Giải thích</p>
                                <p className="text-xl font-bold text-emerald-100 leading-relaxed">
                                    {explanation}
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default McqQuestion;
