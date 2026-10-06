import React, { useState } from 'react';
import {
  Search,
  Filter,
  Dumbbell,
  ArrowRight,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { MuscleGroup, ExperienceLevel, Exercise } from '../../types';

export const ExerciseLibraryView: React.FC = () => {
  const { exercises, setSelectedExerciseModal } = useFitness();

  const [search, setSearch] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const muscleGroups: (MuscleGroup | 'All')[] = [
    'All',
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Abs',
  ];

  const filtered = exercises.filter(ex => {
    const matchSearch =
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(search.toLowerCase());
    const matchMuscle = selectedMuscle === 'All' || ex.muscleGroup === selectedMuscle;
    const matchDiff = selectedDifficulty === 'All' || ex.difficulty === selectedDifficulty;
    return matchSearch && matchMuscle && matchDiff;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Movement Index</span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            EXERCISE LIBRARY
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete database of strength, hypertrophy, and calisthenic biomechanics with form guides.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Bench, Squat, Delts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Filter Controls */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {muscleGroups.map(muscle => (
            <button
              key={muscle}
              onClick={() => setSelectedMuscle(muscle)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedMuscle === muscle
                  ? 'bg-emerald-500 text-black font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {muscle}
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

      {/* Exercise Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(exercise => (
          <div
            key={exercise.id}
            onClick={() => setSelectedExerciseModal(exercise)}
            className="rounded-3xl border border-slate-800 bg-[#0E131C] overflow-hidden group hover:border-emerald-500/40 transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Photo Banner */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E131C] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-400 border border-emerald-500/30 uppercase">
                  {exercise.muscleGroup}
                </div>

                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-white border border-slate-700">
                  {exercise.difficulty}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2.5">
                <h3 className="text-lg font-display font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                  {exercise.name}
                </h3>

                <p className="text-xs text-slate-400">
                  Equipment: <span className="text-slate-300 font-medium">{exercise.equipment}</span>
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                  <span>Target: {exercise.recommendedSets}</span>
                  <span>·</span>
                  <span>{exercise.recommendedReps}</span>
                  <span>·</span>
                  <span>Rest: {exercise.restSec}s</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="p-2.5 rounded-xl bg-slate-900/80 group-hover:bg-emerald-500/10 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-emerald-400 transition-colors">
                <span>View Full Form Guide</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <Dumbbell className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>No exercises found matching your filter criteria.</p>
        </div>
      )}
    </div>
  );
};
