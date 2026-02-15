import React from 'react';
import { Info, Users, BookOpen, MessageSquare } from 'lucide-react';

const OpinionQuestion = ({ task, answers, onSelect, showResult }) => {
    const roles = ["Woman", "Man", "Both"];

    return (
        <div className="flex flex-col gap-10">
            <div className="bg-slate-900/40 border border-white/10 p-6 md:p-10 rounded-[3rem] space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-purple-400 font-black uppercase text-xs tracking-[0.2em]">
                        <MessageSquare className="w-4 h-4" />
                        Discourse Interaction
                    </div>
                    <h4 className="text-4xl font-black text-white uppercase tracking-tight leading-none">Part 3: Opinions & Discussion</h4>
                    <p className="text-lg font-semibold text-slate-400">Decide whose opinion matches each statement from the recorded discussion.</p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-white/5 bg-slate-950/20">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-950/40">
                                <th className="py-8 px-10 text-xl font-black text-slate-400 uppercase tracking-widest border-b border-white/5">Discussion Statements</th>
                                {roles.map(role => (
                                    <th key={role} className="py-8 px-6 text-center text-xl font-black text-slate-400 uppercase tracking-widest border-b border-white/5">{role}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {task.statements.map((statement, idx) => (
                                <tr key={idx} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                    <td className="py-8 px-10">
                                        <p className="text-2xl font-bold text-slate-300 leading-tight group-hover:text-white transition-colors">{statement.text}</p>
                                    </td>
                                    {roles.map(role => {
                                        const isSelected = answers[idx] === role;
                                        const isCorrect = showResult && role === statement.answer;
                                        const isWrong = showResult && isSelected && role !== statement.answer;

                                        return (
                                            <td key={role} className="py-8 px-6 text-center">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => !showResult && onSelect(idx, role)}
                                                        disabled={showResult}
                                                        className={`
                                    w-14 h-14 rounded-2xl border-4 transition-all flex items-center justify-center
                                    ${isSelected
                                                                ? 'bg-purple-600 border-purple-500 shadow-2xl shadow-purple-600/40 scale-110'
                                                                : 'bg-transparent border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5'}
                                    ${isCorrect ? 'bg-emerald-600 border-emerald-500 !scale-110 shadow-emerald-600/40' : ''}
                                    ${isWrong ? 'bg-rose-600 border-rose-500 !scale-110 shadow-rose-600/40' : ''}
                                    ${showResult ? 'cursor-default' : 'hover:scale-105 active:scale-90'}
                                `}
                                                    >
                                                        {(isSelected || isCorrect || isWrong) && (
                                                            <div className="w-4 h-4 rounded-full bg-white shadow-lg" />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showResult && (
                <div
                    className="bg-slate-900/60 p-8 md:p-12 rounded-[3rem] border border-white/5 space-y-8"
                >
                    <div className="flex items-center gap-4 text-purple-400">
                        <BookOpen className="w-7 h-7" />
                        <h5 className="text-3xl font-black uppercase tracking-tight">Full Discussion Transcript</h5>
                    </div>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full opacity-20" />
                        <p className="pl-8 text-xl font-bold text-slate-400 leading-relaxed italic whitespace-pre-line">
                            {task.script}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpinionQuestion;
