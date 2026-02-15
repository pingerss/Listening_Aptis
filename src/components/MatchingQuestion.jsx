import React from 'react';
import { User, CheckCircle, Info, BookOpen } from 'lucide-react';

const MatchingQuestion = ({ task, answers, onSelect, showResult }) => {
    return (
        <div className="flex flex-col gap-10">
            <div className="bg-slate-900/40 border border-white/10 p-6 md:p-10 rounded-[3rem] space-y-12">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-indigo-400 font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <Info className="w-4 h-4" />
                        Context Analysis
                    </div>
                    <h4 className="text-4xl font-black text-white uppercase tracking-tight leading-none leading-none">Part 2: Speaker Matching</h4>
                    <p className="text-lg font-semibold text-slate-400">Match each numbered speaker with their primary activity or opinion.</p>
                </div>

                <div className="flex flex-col gap-8">
                    {task.speakers.map((speaker, sIdx) => (
                        <div key={speaker.id} className="flex flex-col gap-6 p-8 rounded-[2rem] bg-slate-950/40 border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <User className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                </div>
                                <span className="text-2xl font-black text-white uppercase tracking-tight whitespace-nowrap">{speaker.name}</span>
                                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {task.options.map((option, oIdx) => {
                                    const isSelected = answers[speaker.id] === option;
                                    const isCorrect = showResult && option === speaker.answer;
                                    const isWrong = showResult && isSelected && option !== speaker.answer;

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => !showResult && onSelect(speaker.id, option)}
                                            disabled={showResult}
                                            className={`
                                    px-8 py-5 rounded-2xl text-lg font-black uppercase transition-all border-2
                                    ${isSelected
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20 scale-105'
                                                    : 'bg-slate-900 border-white/5 text-slate-500 hover:text-white hover:border-white/20'}
                                    ${isCorrect ? 'bg-emerald-600 border-emerald-500 !text-white !scale-105' : ''}
                                    ${isWrong ? 'bg-rose-600 border-rose-500 !text-white !scale-105' : ''}
                                `}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showResult && (
                <div
                    className="space-y-8"
                >
                    <div className="flex items-center gap-4 text-emerald-400 px-2">
                        <BookOpen className="w-6 h-6" />
                        <h5 className="text-2xl font-black uppercase tracking-tight">Transcription Analysis</h5>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {task.speakers.map(speaker => (
                            <div key={speaker.id} className="bg-slate-900/60 p-8 rounded-[2.5rem] border border-white/5 space-y-6 group hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black text-emerald-400 uppercase tracking-widest bg-emerald-400/5 px-4 py-1.5 rounded-full border border-emerald-400/20">
                                        {speaker.name} Resolved
                                    </span>
                                    <div className="text-xs font-black text-slate-600 uppercase tracking-widest">Part 2 Verified</div>
                                </div>
                                <p className="text-xl font-bold text-slate-300 leading-relaxed italic">
                                    "{speaker.script}"
                                </p>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Target Answer</p>
                                    <p className="text-2xl font-black text-emerald-400 uppercase tracking-tight">{speaker.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchingQuestion;
