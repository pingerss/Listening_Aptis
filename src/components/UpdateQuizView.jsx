import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, RotateCcw, Target } from 'lucide-react';
import McqQuestion from './McqQuestion';

const UpdateQuizView = ({ module, onBack }) => {
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const total = module.questions.length;
    const score = module.questions.filter(q => answers[q.id] === q.answer).length;

    return (
        <div className="flex flex-col gap-12 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
                <div className="flex flex-col gap-4">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all font-black uppercase text-xs tracking-widest"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Quay lại
                    </button>
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
                            {module.title}
                        </h2>
                        {module.subtitle && (
                            <p className="text-amber-400 text-sm font-bold uppercase tracking-wide bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-xl inline-block">
                                ⚡ {module.subtitle}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-slate-900/60 border border-white/10 p-4 rounded-3xl self-start md:self-center">
                    <Target className="w-6 h-6 text-indigo-400" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tiến độ</span>
                        <span className="text-xl font-black text-white">{Object.keys(answers).length} / {total} Done</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                {/* Questions */}
                <div className="xl:col-span-8 space-y-8">
                    {module.questions.map((q, idx) => (
                        <McqQuestion
                            key={q.id}
                            index={idx}
                            question={q}
                            options={q.options}
                            selectedAnswer={answers[q.id]}
                            onSelect={(opt) => handleSelect(q.id, opt)}
                            showResult={showResult}
                            correctAnswer={q.answer}
                        />
                    ))}
                </div>

                {/* Sidebar */}
                <aside className="xl:col-span-4 space-y-8 sticky top-28">
                    <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-6 md:p-10 space-y-8">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-black text-white uppercase tracking-tight">Kết quả</h4>
                            <p className="text-slate-500 text-sm font-semibold uppercase">Trắc nghiệm bổ sung</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center justify-between">
                                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Đã làm</span>
                                <span className="text-2xl font-black text-indigo-400">{Object.keys(answers).length}</span>
                            </div>
                            {showResult && (
                                <div
                                    className="p-8 rounded-[2rem] bg-indigo-600 border border-indigo-500 shadow-2xl shadow-indigo-600/40 text-center space-y-4"
                                >
                                    <span className="text-sm font-black text-indigo-100 uppercase tracking-[0.2em]">Điểm số</span>
                                    <div className="text-7xl font-black text-white leading-none">
                                        {Math.round((score / total) * 100)}%
                                    </div>
                                    <div className="text-xl font-bold text-indigo-100">
                                        {score} / {total} Câu đúng
                                    </div>
                                </div>
                            )}
                        </div>

                        {!showResult ? (
                            <button
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setShowResult(true);
                                }}
                                className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl shadow-emerald-600/20 active:scale-95 group"
                            >
                                <CheckCircle className="w-7 h-7 group-hover:scale-125 transition-transform" />
                                CHECK RESULT
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    setShowResult(false);
                                    setAnswers({});
                                }}
                                className="w-full py-6 bg-slate-800 hover:bg-slate-700 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all border border-white/10 active:scale-95 group"
                            >
                                <RotateCcw className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" />
                                LÀM LẠI
                            </button>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default UpdateQuizView;
