import React, { useState, useEffect } from 'react';
import { Search, X, Dumbbell, Apple, Layers, ArrowRight } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    globalSearchOpen,
    setGlobalSearchOpen,
    exercises,
    foodDatabase,
    workoutPlans,
    setSelectedExerciseModal,
    setCurrentView,
  } = useFitness();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(!globalSearchOpen);
      }
      if (e.key === 'Escape') {
        setGlobalSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [globalSearchOpen, setGlobalSearchOpen]);

  if (!globalSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedExercises = q
    ? exercises.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.muscleGroup.toLowerCase().includes(q) ||
          e.equipment.toLowerCase().includes(q)
      ).slice(0, 5)
    : exercises.slice(0, 3);

  const matchedFoods = q
    ? foodDatabase.filter(
        f =>
          f.name.toLowerCase().includes(q) ||
          (f.hindiName && f.hindiName.includes(q)) ||
          f.category.toLowerCase().includes(q)
      ).slice(0, 5)
    : foodDatabase.slice(0, 3);

  const matchedPlans = q
    ? workoutPlans.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : workoutPlans.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="bg-[#0D1219] border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            type="text"
            placeholder="Search exercises, Indian foods, plans, muscles..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none text-white text-base placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Exercises Section */}
          {matchedExercises.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exercises</span>
              </div>
              <div className="space-y-1">
                {matchedExercises.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      setSelectedExerciseModal(ex);
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors text-left cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {ex.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {ex.muscleGroup} · {ex.equipment} · {ex.difficulty}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Foods Section */}
          {matchedFoods.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                <Apple className="w-3.5 h-3.5 text-amber-400" />
                <span>Foods & Nutrition</span>
              </div>
              <div className="space-y-1">
                {matchedFoods.map(food => (
                  <button
                    key={food.id}
                    onClick={() => {
                      setCurrentView('nutrition');
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors text-left cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {food.name}
                        </span>
                        {food.hindiName && (
                          <span className="text-xs text-slate-400 font-normal">
                            ({food.hindiName})
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">
                        {food.servingLabel} · {food.calories} kcal · {food.protein}g protein
                      </p>
                    </div>
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                      Log Food
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Plans Section */}
          {matchedPlans.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Workout Plans</span>
              </div>
              <div className="space-y-1">
                {matchedPlans.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => {
                      setCurrentView('workouts');
                      setGlobalSearchOpen(false);
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-800/80 flex items-center justify-between group transition-colors text-left cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {plan.title}
                      </p>
                      <p className="text-xs text-slate-400">
                        {plan.category} · {plan.durationMinutes} mins · ~{plan.estimatedCalories} kcal
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedExercises.length === 0 &&
            matchedFoods.length === 0 &&
            matchedPlans.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <p>No results found for "{query}".</p>
                <p className="text-xs mt-1">Try searching "Bench", "Paneer", "Squat", or "Chicken".</p>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with ↵ or click</span>
          <span>FitForge Global Search</span>
        </div>
      </div>
    </div>
  );
};
