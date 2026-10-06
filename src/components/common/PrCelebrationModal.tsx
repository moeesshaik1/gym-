import React, { useEffect } from 'react';
import { Trophy, Flame, Sparkles, X } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const PrCelebrationModal: React.FC = () => {
  const { prCelebration, dismissPrCelebration } = useFitness();

  useEffect(() => {
    if (prCelebration) {
      const timer = setTimeout(() => {
        dismissPrCelebration();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [prCelebration, dismissPrCelebration]);

  if (!prCelebration || !prCelebration.show) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      <div className="pointer-events-auto bg-gradient-to-b from-[#151D28] to-[#0A0E14] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-amber-500/20 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glow ambient background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={dismissPrCelebration}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Trophy with Flame */}
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-black shadow-xl shadow-amber-500/30 mx-auto animate-bounce">
            <Trophy className="w-10 h-10 text-black stroke-[2.5]" />
          </div>
          <Flame className="w-7 h-7 text-amber-400 fill-amber-400 absolute -bottom-2 -right-2 animate-pulse" />
        </div>

        {/* Header Text */}
        <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestone Unlocked</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
          NEW PERSONAL RECORD! 🔥
        </h3>

        <p className="text-slate-300 text-sm mt-2">
          You conquered <span className="text-white font-bold">{prCelebration.exerciseName}</span> with
        </p>

        {/* Big Weight Stat */}
        <div className="my-4 py-3 px-6 bg-slate-900/80 border border-amber-500/30 rounded-2xl inline-block">
          <span className="font-display font-black text-4xl text-amber-400 tracking-tight">
            {prCelebration.weight}
          </span>
          <span className="text-sm font-bold text-slate-400 ml-1.5">KG</span>
        </div>

        <p className="text-xs text-slate-400">
          Progressive overload achieved. Your dedication to the iron is paying off!
        </p>

        <button
          onClick={dismissPrCelebration}
          className="mt-6 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          KEEP CRUSHING IT
        </button>
      </div>
    </div>
  );
};
