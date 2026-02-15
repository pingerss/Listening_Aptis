import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, RotateCcw, ChevronRight, LayoutGrid, Headphones, Target } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import McqQuestion from './McqQuestion';
import MatchingQuestion from './MatchingQuestion';
import OpinionQuestion from './OpinionQuestion';

const QuizView = ({ test, onBack }) => {
    const [answers, setAnswers] = useState({});
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [opinionAnswers, setOpinionAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [activeTab, setActiveTab] = useState('mcq'); // mcq, task14, task15, extra

    const handleMcqSelect = (qId, option) => {
        setAnswers(prev => ({ ...prev, [qId]: option }));
    };

    const handleMatchingSelect = (speakerId, option) => {
        setMatchingAnswers(prev => ({ ...prev, [speakerId]: option }));
    };

    const handleOpinionSelect = (idx, role) => {
        setOpinionAnswers(prev => ({ ...prev, [idx]: role }));
    };

    const calculateScore = () => {
        let score = 0;
        let total = test.questions.length + test.matchingTask.speakers.length + test.opinionTask.statements.length + test.extraQuestions.length;

        test.questions.forEach(q => {
            if (answers[q.id] === q.answer) score++;
        });

        test.matchingTask.speakers.forEach(s => {
            if (matchingAnswers[s.id] === s.answer) score++;
        });

        test.opinionTask.statements.forEach((s, idx) => {
            if (opinionAnswers[idx] === s.answer) score++;
        });

        test.extraQuestions.forEach(q => {
            if (answers[q.id] === q.answer) score++;
        });

        return { score, total };
    };

    const { score, total } = calculateScore();

    return (
        <div className="flex flex-col gap-12 pb-32">
            {/* Sticky Header + Tabs - Compact */}
            <div className="sticky top-24 z-40 bg-[#0a0e1a]/95 backdrop-blur-md pb-2 -mx-6 px-6 pt-2">
                {/* Quiz Header - single compact row */}
                <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2 min-w-0">
                        <button
                            onClick={onBack}
                            className="flex-shrink-0 w-7 h-7 rounded-md bg-slate-900 border border-white/10 flex items-center justify-center hover:border-indigo-500/40 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                        <h2 className="text-base md:text-lg font-black text-white tracking-tight uppercase leading-none truncate">
                            {test.title}
                        </h2>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-900/60 border border-white/10 px-2.5 py-1 rounded-lg flex-shrink-0">
                        <Target className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-xs font-black text-white">{Object.keys(answers).length + Object.keys(matchingAnswers).length + Object.keys(opinionAnswers).length}/{total}</span>
                    </div>
                </div>

                {/* Navigation Tabs - compact */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 bg-slate-900/60 p-1 rounded-lg border border-white/5 mt-1.5">
                    {[
                        { id: 'mcq', label: 'Part 1', icon: LayoutGrid },
                        { id: 'task14', label: 'Part 2', icon: Headphones },
                        { id: 'task15', label: 'Part 3', icon: Target },
                        { id: 'extra', label: 'Part 4', icon: LayoutGrid }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-[11px] font-black uppercase tracking-wider transition-all
                            ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5'}
                        `}
                        >
                            <tab.icon className="w-3 h-3" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                <div className="xl:col-span-8 space-y-12">
                    <AudioPlayer trackTitle={test.title} />

                    <div
                        key={activeTab}
                        className="min-h-[500px]"
                    >
                        {activeTab === 'mcq' && (
                            <div className="flex flex-col gap-4">
                                {test.questions.map((q, idx) => (
                                    <McqQuestion
                                        key={q.id}
                                        index={idx}
                                        question={q}
                                        options={q.options}
                                        selectedAnswer={answers[q.id]}
                                        onSelect={(opt) => handleMcqSelect(q.id, opt)}
                                        showResult={showResult}
                                        correctAnswer={q.answer}
                                    />
                                ))}
                            </div>
                        )}

                        {activeTab === 'task14' && (
                            <MatchingQuestion
                                task={test.matchingTask}
                                answers={matchingAnswers}
                                onSelect={handleMatchingSelect}
                                showResult={showResult}
                            />
                        )}

                        {activeTab === 'task15' && (
                            <OpinionQuestion
                                task={test.opinionTask}
                                answers={opinionAnswers}
                                onSelect={handleOpinionSelect}
                                showResult={showResult}
                            />
                        )}

                        {activeTab === 'extra' && (
                            <div className="flex flex-col gap-8">
                                {test.extraQuestions.map((q, idx) => (
                                    <McqQuestion
                                        key={q.id}
                                        index={idx}
                                        question={q}
                                        options={q.options}
                                        selectedAnswer={answers[q.id]}
                                        onSelect={(opt) => handleMcqSelect(q.id, opt)}
                                        showResult={showResult}
                                        correctAnswer={q.answer}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Sidebar Info / Results */}
                <aside className="xl:col-span-4 space-y-8 sticky top-28">
                    <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-6 md:p-10 space-y-8">
                        <div className="space-y-2">
                            <h4 className="text-2xl font-black text-white uppercase tracking-tight">System Status</h4>
                            <p className="text-slate-500 text-sm font-semibold uppercase">Real-time performance tracker</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center justify-between">
                                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Completed</span>
                                <span className="text-2xl font-black text-indigo-400">{Object.keys(answers).length + Object.keys(matchingAnswers).length + Object.keys(opinionAnswers).length}</span>
                            </div>
                            {showResult && (
                                <div
                                    className="p-8 rounded-[2rem] bg-indigo-600 border border-indigo-500 shadow-2xl shadow-indigo-600/40 text-center space-y-4"
                                >
                                    <span className="text-sm font-black text-indigo-100 uppercase tracking-[0.2em]">Final Percentage</span>
                                    <div className="text-7xl font-black text-white leading-none">
                                        {Math.round((score / total) * 100)}%
                                    </div>
                                    <div className="text-xl font-bold text-indigo-100">
                                        {score} of {total} Points
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
                                    setMatchingAnswers({});
                                    setOpinionAnswers({});
                                }}
                                className="w-full py-6 bg-slate-800 hover:bg-slate-700 text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all border border-white/10 active:scale-95 group"
                            >
                                <RotateCcw className="w-7 h-7 group-hover:rotate-180 transition-transform duration-700" />
                                RESTART TEST
                            </button>
                        )}
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest leading-relaxed">
                            Professional environment active. All inputs are logged and evaluated for maximum precision in scoring.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default QuizView;
