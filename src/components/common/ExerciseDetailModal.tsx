import React from 'react';
import { X, Dumbbell, ShieldAlert, CheckCircle2, Play, AlertTriangle } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ExerciseDetailModal: React.FC = () => {
  const { selectedExerciseModal, setSelectedExerciseModal, startWorkout } = useFitness();

  if (!selectedExerciseModal) return null;
  const ex = selectedExerciseModal;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#0D1219] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header Image with Gradient */}
        <div className="relative h-60 w-full overflow-hidden rounded-t-2xl">
          <img
            src={ex.imageUrl}
            alt={ex.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1219] via-[#0D1219]/50 to-transparent" />

          {/* Close Button */}
          <button
            onClick={() => setSelectedExerciseModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <span>{ex.muscleGroup}</span>
              <span>·</span>
              <span>{ex.difficulty}</span>
              <span>·</span>
              <span>{ex.equipment}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              {ex.name}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-center text-xs">
            <div>
              <p className="text-slate-400">Target Reps</p>
              <p className="text-white font-bold text-sm mt-0.5">{ex.recommendedReps}</p>
            </div>
            <div>
              <p className="text-slate-400">Recommended Sets</p>
              <p className="text-white font-bold text-sm mt-0.5">{ex.recommendedSets}</p>
            </div>
            <div>
              <p className="text-slate-400">Rest Interval</p>
              <p className="text-emerald-400 font-bold text-sm mt-0.5">{ex.restSec}s</p>
            </div>
          </div>

          {/* Secondary Muscles */}
          {ex.secondaryMuscles && ex.secondaryMuscles.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                Secondary Muscles Activated
              </h4>
              <p className="text-xs text-slate-300">
                {ex.secondaryMuscles.join(' · ')}
              </p>
            </div>
          )}

          {/* Step by step instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Execution Form & Technique</span>
            </h4>
            <ol className="space-y-2.5 text-xs text-slate-300">
              {ex.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Common Mistakes */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Common Mistakes to Avoid</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {ex.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Safety Tips */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Safety & Injury Prevention</span>
              <p className="leading-relaxed text-amber-200/90">{ex.safetyTips}</p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedExerciseModal(null);
                startWorkout(null);
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Start Workout With This Exercise</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
