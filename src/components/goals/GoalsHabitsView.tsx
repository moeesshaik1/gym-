import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Plus,
  Target,
  Zap,
  Award,
  Dumbbell,
  Droplet,
  Moon,
  Footprints,
  Activity,
  X,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { FitnessGoalItem } from '../../types';

export const GoalsHabitsView: React.FC = () => {
  const {
    goals,
    addGoal,
    updateGoalValue,
    habits,
    toggleHabit,
    achievements,
    user,
  } = useFitness();

  const [newGoalModalOpen, setNewGoalModalOpen] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] = useState<'Weight' | 'Strength' | 'Endurance' | 'Habit'>('Strength');
  const [goalCurrent, setGoalCurrent] = useState(80);
  const [goalTarget, setGoalTarget] = useState(100);
  const [goalUnit, setGoalUnit] = useState('KG');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle) return;
    addGoal({
      title: goalTitle,
      category: goalCategory,
      currentValue: goalCurrent,
      targetValue: goalTarget,
      unit: goalUnit,
    });
    setNewGoalModalOpen(false);
    setGoalTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Accountability & Milestones
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            FITNESS GOALS & HABITS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Build discipline with daily habit checkoffs, progressive target tracking, and achievement badges.
          </p>
        </div>

        <button
          onClick={() => setNewGoalModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Goal</span>
        </button>
      </div>

      {/* Streak Showcase Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-[#0D1219] border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shrink-0">
            <Flame className="w-9 h-9 fill-amber-400 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Discipline Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              🔥 {user.streak} DAY CONSISTENCY STREAK
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              You are in the top 5% of dedicated athletes on FitForge. Keep the flame alive tomorrow!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-center">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Next Badge</span>
            <span className="text-sm font-bold text-amber-400 font-mono">14 Days (Pro)</span>
          </div>
        </div>
      </div>

      {/* Active Fitness Goals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span>Active Fitness Goals</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {goals.filter(g => g.isCompleted).length} / {goals.length} Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map(goal => {
            const percent = Math.min(
              100,
              Math.round((goal.currentValue / goal.targetValue) * 100)
            );
            return (
              <div
                key={goal.id}
                className="p-5 rounded-2xl bg-[#0D1219] border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                    {goal.category}
                  </span>
                  {goal.isCompleted ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed!</span>
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-emerald-400">{percent}%</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white">{goal.title}</h3>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      goal.isCompleted ? 'bg-emerald-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-mono">
                    Current: <strong className="text-white">{goal.currentValue}</strong> {goal.unit}
                  </span>
                  <span className="text-slate-400 font-mono">
                    Target: <strong className="text-emerald-400">{goal.targetValue}</strong> {goal.unit}
                  </span>
                </div>

                {/* Progress Quick Increment */}
                {!goal.isCompleted && (
                  <div className="pt-2 flex items-center gap-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-500">Quick Log:</span>
                    <button
                      onClick={() =>
                        updateGoalValue(goal.id, Math.min(goal.targetValue, goal.currentValue + 2.5))
                      }
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-emerald-400 font-mono cursor-pointer"
                    >
                      +2.5 {goal.unit}
                    </button>
                    <button
                      onClick={() =>
                        updateGoalValue(goal.id, Math.min(goal.targetValue, goal.currentValue + 5))
                      }
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-emerald-400 font-mono cursor-pointer"
                    >
                      +5.0 {goal.unit}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Habits Checklist */}
      <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Daily Athletic Habits</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Atomic daily behaviors that compound into world-class physical transformation.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">
            {habits.filter(h => h.completed).length} / {habits.length} Complete Today
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {habits.map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                habit.completed
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    habit.completed
                      ? 'bg-emerald-500 border-emerald-500 text-black'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {habit.completed && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span className={`text-xs font-semibold block ${habit.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                    {habit.title}
                  </span>
                  <span className="text-[10px] text-slate-500">{habit.targetLabel}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Badges & Achievements Gallery */}
      <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-5">
        <div>
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Badges & Achievements</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Milestones unlocked along your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between space-y-2 transition-all ${
                ach.unlocked
                  ? 'bg-slate-900/80 border-amber-500/40 text-white shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  ach.unlocked
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-slate-800 text-slate-600'
                }`}
              >
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">{ach.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-tight line-clamp-2">
                  {ach.description}
                </p>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider font-mono">
                {ach.unlocked ? 'Unlocked 🔥' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Custom Goal Modal */}
      {newGoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0D1219] border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Create Fitness Goal</h3>
              <button
                onClick={() => setNewGoalModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deadlift 150 KG"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={goalCategory}
                  onChange={e => setGoalCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Strength">Strength</option>
                  <option value="Weight">Weight</option>
                  <option value="Endurance">Endurance</option>
                  <option value="Habit">Habit</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current</label>
                  <input
                    type="number"
                    required
                    value={goalCurrent}
                    onChange={e => setGoalCurrent(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target</label>
                  <input
                    type="number"
                    required
                    value={goalTarget}
                    onChange={e => setGoalTarget(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Unit</label>
                  <input
                    type="text"
                    required
                    value={goalUnit}
                    onChange={e => setGoalUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Save Fitness Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
