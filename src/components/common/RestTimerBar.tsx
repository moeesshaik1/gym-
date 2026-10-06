import React from 'react';
import { Timer, Play, Pause, RotateCcw, Plus, X } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const RestTimerBar: React.FC = () => {
  const { restTimer, pauseRestTimer, resetRestTimer, startRestTimer } = useFitness();

  if (!restTimer.active && restTimer.remainingSec === 0) return null;

  const mins = Math.floor(restTimer.remainingSec / 60);
  const secs = restTimer.remainingSec % 60;
  const progressPercent = restTimer.totalSec > 0
    ? ((restTimer.totalSec - restTimer.remainingSec) / restTimer.totalSec) * 100
    : 0;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-6 z-40 bg-[#0F141C] border border-emerald-500/40 rounded-2xl shadow-2xl p-3.5 flex items-center gap-3 backdrop-blur-xl animate-in slide-in-from-bottom duration-200">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray={125.6}
            strokeDashoffset={125.6 - (125.6 * progressPercent) / 100}
            className="text-emerald-400 transition-all duration-300"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute font-mono text-xs font-black text-white">
          {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>

      <div>
        <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Rest Timer</p>
        <p className="text-xs text-slate-300 font-medium">Breathe & recover</p>
      </div>

      <div className="flex items-center gap-1.5 ml-2">
        <button
          onClick={pauseRestTimer}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          title={restTimer.active ? 'Pause' : 'Resume'}
        >
          {restTimer.active ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>

        <button
          onClick={() => startRestTimer(restTimer.remainingSec + 30)}
          className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-emerald-400 transition-colors"
          title="Add 30 seconds"
        >
          +30s
        </button>

        <button
          onClick={resetRestTimer}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Reset timer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
