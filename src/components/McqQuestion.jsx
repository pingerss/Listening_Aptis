import React from 'react';
import { Check, X } from 'lucide-react';

const McqQuestion = ({ question, options, selectedAnswer, onSelect, showResult, correctAnswer, index }) => {
    // question can be a string or an object with { question, translation, explanation }
    const questionText = typeof question === 'string' ? question : question.question;
    const translation = typeof question === 'object' ? question.translation : null;
    const explanation = typeof question === 'object' ? question.explanation : null;

    return (
        <div
            className="bg-slate-900/40 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col gap-4 hover:border-indigo-500/30 transition-colors duration-300 group"
        >
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-black text-sm border border-indigo-500/20">
                        {index + 1}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/20 to-transparent" />
                </div>
                <h4 className="text-lg md:text-xl font-black text-white leading-tight tracking-tight uppercase group-hover:text-indigo-400 transition-colors">
                    {questionText}
                </h4>
            </div>

            <div className="grid gap-2">
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
                                w-full p-3 md:p-4 rounded-xl text-left transition-all duration-300 flex items-center gap-3
                                ${isSelected
                                    ? 'bg-indigo-600 border-indigo-500 shadow-xl shadow-indigo-600/20 ring-2 ring-indigo-400/50 scale-[1.02]'
                                    : 'bg-slate-900 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/50'}
                                ${showSuccess ? 'bg-emerald-600 border-emerald-400 !scale-[1.02] shadow-emerald-600/20 ring-2 ring-emerald-400' : ''}
                                ${showDanger ? 'bg-rose-600 border-rose-400 !scale-[1.02] shadow-rose-600/20 ring-2 ring-rose-400' : ''}
                                ${showResult ? 'cursor-default' : 'hover:scale-[1.01] active:scale-[0.99]'}
                            `}
                        >
                            <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black transition-colors
                                ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}
                                ${showSuccess ? 'bg-emerald-400/20 text-white' : ''}
                                ${showDanger ? 'bg-rose-400/20 text-white' : ''}
                            `}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="text-base font-bold flex-1">{option}</span>
                            {showSuccess && <Check className="w-5 h-5 text-white" />}
                            {showDanger && <X className="w-5 h-5 text-white" />}
                        </button>
                    );
                })}
            </div>

            {/* Translation & Explanation Feedback */}
            {showResult && (translation || explanation) && (
                <div
                    className="mt-2 pt-4 border-t border-slate-700/50 space-y-3"
                >
                    {translation && (
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/30">
                            <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest mb-1">🇻🇳 Dịch nghĩa</p>
                            <p className="text-base font-bold text-slate-100 italic leading-relaxed">
                                {translation}
                            </p>
                        </div>
                    )}
                    {explanation && (
                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                            <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">💡 Giải thích</p>
                            <p className="text-base font-bold text-emerald-100 leading-relaxed">
                                {explanation}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default McqQuestion;

