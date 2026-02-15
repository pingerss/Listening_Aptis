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
            {/* Sticky Header + Tabs */}
            <div className="sticky top-24 z-40 bg-[#0a0e1a]/95 backdrop-blur-md pb-6 -mx-6 px-6 pt-4">
                {/* Quiz Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6">
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onBack}
                            className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all font-black uppercase text-xs tracking-widest"
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center group-hover:border-indigo-500/40 transition-colors">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </div>
                            Exit Module
                        </button>
                        <div className="space-y-1">
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-none">
                                {test.title}
                            </h2>
                            <div className="flex items-center gap-4 text-slate-500">
                                <span className="text-sm font-black uppercase tracking-wider">Practice Session</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                <span className="text-sm font-black uppercase tracking-wider">High Fidelity</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-900/60 border border-white/10 p-3 rounded-2xl self-start md:self-center">
                        <Target className="w-5 h-5 text-indigo-400" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Current Progress</span>
                            <span className="text-lg font-black text-white">{Object.keys(answers).length + Object.keys(matchingAnswers).length + Object.keys(opinionAnswers).length} / {total} Done</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-3 bg-slate-900/60 p-2 rounded-[2.2rem] border border-white/5 overflow-hidden mt-4">
                    {[
                        { id: 'mcq', label: 'Part 1: C1 - C13', icon: LayoutGrid },
                        { id: 'task14', label: 'Part 2: Task 14', icon: Headphones },
                        { id: 'task15', label: 'Part 3: Task 15', icon: Target },
                        { id: 'extra', label: 'Part 4: C16 - C17', icon: LayoutGrid }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[1.8rem] text-sm font-black uppercase tracking-widest transition-all
                            ${activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40'
                                    : 'text-slate-500 hover:text-white hover:bg-white/5 whitespace-nowrap'}
                        `}
                        >
                            <tab.icon className="w-5 h-5" />
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
                            <div className="flex flex-col gap-8">
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
