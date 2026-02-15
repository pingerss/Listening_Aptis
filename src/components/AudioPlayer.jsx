import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Activity } from 'lucide-react';

const AudioPlayer = ({ src, trackTitle }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const p = (audio.currentTime / audio.duration) * 100;
            setProgress(p || 0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', () => setIsPlaying(false));
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const restart = () => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handleProgressChange = (e) => {
        const time = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = time;
        setProgress(e.target.value);
    };

    return (
        <div
            className="bg-slate-900/60 border border-white/10 p-6 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24 text-indigo-500" />
            </div>

            <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-[1.8rem] bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:bg-indigo-500 transition-all duration-500">
                        <Play className={`w-10 h-10 text-indigo-400 group-hover:text-white ${isPlaying ? 'animate-pulse' : ''}`} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-white hover:text-indigo-400 transition-colors uppercase tracking-tight">
                            {trackTitle || "PRO AUDIO ENGINE"}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Mastering Active</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`w-1 h-3 rounded-full bg-indigo-500/30 ${isPlaying ? 'animate-bounce' : ''}`} style={{ animationDelay: `${i * 0.1}s` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <audio ref={audioRef} src={src} />

                <div className="space-y-8">
                    <div className="relative pt-4">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="w-full h-3 bg-slate-950 rounded-full appearance-none cursor-pointer accent-indigo-500 border border-white/5"
                        />
                        <div
                            className="absolute top-[21px] left-0 h-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full pointer-events-none transition-all duration-100 shadow-lg shadow-indigo-500/30"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 rounded-full bg-white text-slate-950 flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-2xl shadow-white/10 group/btn"
                            >
                                {isPlaying ? <Pause className="w-8 h-8 fill-slate-950" /> : <Play className="w-8 h-8 fill-slate-950 ml-1" />}
                            </button>
                            <button
                                onClick={restart}
                                className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 hover:border-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-all active:scale-90"
                            >
                                <RotateCcw className="w-6 h-6 hover:rotate-180 transition-transform duration-700" />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 bg-slate-950/40 p-3 rounded-3xl border border-white/5">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className={`p-3 rounded-xl transition-all ${isMuted ? 'bg-rose-500/20 text-rose-400' : 'text-slate-400 hover:text-white'}`}
                            >
                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>
                            <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden mr-4">
                                <div className="h-full bg-indigo-500 w-3/4 shadow-lg shadow-indigo-500/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
