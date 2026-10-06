import React, { useState } from 'react';
import {
  Dumbbell,
  Play,
  Clock,
  Flame,
  Filter,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { MuscleGroup, ExperienceLevel, WorkoutPlan } from '../../types';

export const WorkoutListView: React.FC = () => {
  const { workoutPlans, startWorkout, setSelectedExerciseModal, exercises } = useFitness();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories: (MuscleGroup | 'All')[] = [
    'All',
    'Chest',
    'Back',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Legs',
    'Abs',
    'Cardio',
    'Full Body',
  ];

  const filteredPlans = workoutPlans.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Training Programs</span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            WORKOUT PLANS & ROUTINES
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Periodized splits engineered for muscle hypertrophy, mechanical tension, and athletic endurance.
          </p>
        </div>

        <button
          onClick={() => startWorkout(null)}
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>Quick Freestyle Session</span>
        </button>
      </div>

      {/* Category Pills & Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-semibold">Difficulty:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                selectedDifficulty === diff
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => (
          <div
            key={plan.id}
            className="rounded-3xl border border-slate-800 bg-[#0E131C] overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all hover:-translate-y-1 group"
          >
            <div>
              {/* Image banner */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={plan.imageUrl}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131C] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 uppercase">
                  {plan.category}
                </div>

                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white border border-slate-700">
                  {plan.difficulty}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400 py-2 border-y border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{plan.durationMinutes} Mins</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>~{plan.estimatedCalories} kcal</span>
                  </span>
                  <span>·</span>
                  <span>{plan.exercises.length} Exercises</span>
                </div>

                {/* Exercises Preview */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Routine Exercises
                  </p>
                  <div className="space-y-1.5">
                    {plan.exercises.map((ex, i) => (
                      <div
                        key={i}
                        className="text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-slate-300"
                      >
                        <span className="font-medium truncate mr-2">{ex.exerciseName}</span>
                        <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                          {ex.targetSets} sets × {ex.targetReps}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0">
              <button
                onClick={() => startWorkout(plan)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>START WORKOUT</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
