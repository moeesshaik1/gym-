import React from 'react';
import {
  Flame,
  Dumbbell,
  Apple,
  Droplet,
  Scale,
  Sparkles,
  Play,
  Plus,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Activity,
  Calendar,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const DashboardView: React.FC = () => {
  const {
    user,
    startWorkout,
    setCurrentView,
    loggedFoods,
    waterIntakeMl,
    addWater,
    habits,
    toggleHabit,
    goals,
    workoutHistory,
    workoutPlans,
  } = useFitness();

  // Time-based greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'GOOD MORNING';
    if (hours < 18) return 'GOOD AFTERNOON';
    return 'GOOD EVENING';
  };

  // Calculate today's totals from loggedFoods
  const todayStr = new Date().toISOString().split('T')[0];
  const todayFoods = loggedFoods.filter(f => f.date === todayStr);
  const totalCalories = Math.round(
    todayFoods.reduce((acc, f) => acc + f.calories * f.servings, 0)
  );
  const totalProtein = Math.round(
    todayFoods.reduce((acc, f) => acc + f.protein * f.servings, 0)
  );
  const totalCarbs = Math.round(
    todayFoods.reduce((acc, f) => acc + f.carbs * f.servings, 0)
  );
  const totalFat = Math.round(
    todayFoods.reduce((acc, f) => acc + f.fat * f.servings, 0)
  );

  const waterLiters = (waterIntakeMl / 1000).toFixed(1);
  const targetWaterLiters = user.waterTarget.toFixed(1);
  const caloriePercent = Math.min(100, Math.round((totalCalories / user.calorieTarget) * 100));
  const proteinPercent = Math.min(100, Math.round((totalProtein / user.proteinTarget) * 100));
  const waterPercent = Math.min(100, Math.round((waterIntakeMl / (user.waterTarget * 1000)) * 100));

  const todaysPlan = workoutPlans[0]; // Chest & Triceps

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Athlete Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Athletic Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
            {getGreeting()}, {user.name.toUpperCase()} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Primary Objective: <strong className="text-slate-200">{user.goal}</strong> · Phase:{' '}
            <strong className="text-slate-200">Hypertrophy & Overload</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Streak indicator */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-amber-400">
            <Flame className="w-5 h-5 fill-amber-500" />
            <div>
              <span className="block text-[10px] font-bold text-amber-300 uppercase tracking-wider">Consistency</span>
              <span className="font-display font-black text-sm text-white">{user.streak} DAY STREAK 🔥</span>
            </div>
          </div>

          <button
            onClick={() => startWorkout(todaysPlan)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] cursor-pointer flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>START WORKOUT</span>
          </button>
        </div>
      </div>

      {/* Hero Today's Workout Banner Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0E141D] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Today's Scheduled Focus</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
              CHEST + TRICEPS HYPERTROPHY
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Targeting flat barbell bench press progressive overload, 30° incline dumbbell presses, and cable tricep lockout burnouts.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span>⏱️ 55 Minutes</span>
              <span>·</span>
              <span>🔥 ~380 kcal Burn</span>
              <span>·</span>
              <span>🏋️ 3 Compound Movements</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => startWorkout(todaysPlan)}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>BEGIN SESSION NOW</span>
            </button>

            <button
              onClick={() => setCurrentView('workouts')}
              className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
            >
              Switch Routine
            </button>
          </div>
        </div>
      </div>

      {/* Master 4-Grid Dashboard Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Calories Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calories</span>
            </div>
            <span className="text-xs font-bold text-orange-400">{caloriePercent}%</span>
          </div>

          <div className="mb-2">
            <span className="text-2xl font-display font-black text-white">{totalCalories.toLocaleString()}</span>
            <span className="text-xs text-slate-400 ml-1">/ {user.calorieTarget.toLocaleString()} kcal</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-orange-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${caloriePercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Remaining</span>
            <span className="font-mono text-white font-semibold">
              {Math.max(0, user.calorieTarget - totalCalories)} kcal
            </span>
          </div>
        </div>

        {/* Protein Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Apple className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Protein</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">{proteinPercent}%</span>
          </div>

          <div className="mb-2">
            <span className="text-2xl font-display font-black text-white">{totalProtein}</span>
            <span className="text-xs text-slate-400 ml-1">/ {user.proteinTarget} g</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${proteinPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Carbs: {totalCarbs}g</span>
            <span>Fat: {totalFat}g</span>
          </div>
        </div>

        {/* Water Intake Card with Quick Increments */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <Droplet className="w-4 h-4 fill-blue-400/40" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Water</span>
            </div>
            <span className="text-xs font-bold text-blue-400">{waterPercent}%</span>
          </div>

          <div className="mb-2">
            <span className="text-2xl font-display font-black text-white">{waterLiters}</span>
            <span className="text-xs text-slate-400 ml-1">/ {targetWaterLiters} L</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${waterPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 pt-0.5">
            <button
              onClick={() => addWater(250)}
              className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-blue-300 transition-colors cursor-pointer"
            >
              +250ml
            </button>
            <button
              onClick={() => addWater(500)}
              className="flex-1 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-bold text-blue-300 transition-colors cursor-pointer"
            >
              +500ml
            </button>
          </div>
        </div>

        {/* Current Weight & Composition */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Weight</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">+3.2 kg (Lean)</span>
          </div>

          <div className="mb-2">
            <span className="text-2xl font-display font-black text-white">{user.weight.toFixed(1)}</span>
            <span className="text-xs text-slate-400 ml-1">kg</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: '68%' }} />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Goal: 75.0 kg</span>
            <button
              onClick={() => setCurrentView('progress')}
              className="text-emerald-400 hover:underline font-semibold cursor-pointer"
            >
              Log Body Stats →
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Daily Habits & Goals vs Recent Activity & Quick Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Daily Habits Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Daily Consistency Checklist</h3>
                <p className="text-xs text-slate-400">Tap items to mark completed today</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
                {habits.filter(h => h.completed).length} / {habits.length} Done
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {habits.map(habit => (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    habit.completed
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
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

          {/* Active Fitness Goals Progress Bars */}
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Active Goals Progress</h3>
                <p className="text-xs text-slate-400">Milestones towards your peak self</p>
              </div>
              <button
                onClick={() => setCurrentView('goals')}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                View All →
              </button>
            </div>

            <div className="space-y-4">
              {goals.slice(0, 3).map(goal => {
                const percent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
                return (
                  <div key={goal.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-white">{goal.title}</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {goal.currentValue} / {goal.targetValue} {goal.unit} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Assistant Snippet & Recent Activity */}
        <div className="space-y-6">
          {/* AI Coach Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-[#101923] border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">AI Training Assistant</h4>
                <p className="text-[11px] text-slate-400">Evidence-based advice & meal generation</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              "Your chest volume is peaking this week. Remember to emphasize tricep rope extensions to support bench press lockout power."
            </p>

            <button
              onClick={() => setCurrentView('ai-coach')}
              className="w-full py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ask Coach a Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recent Workout History */}
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Recent Completed Sessions</span>
              </h4>
              <button
                onClick={() => setCurrentView('progress')}
                className="text-[11px] font-bold text-slate-400 hover:text-white"
              >
                Log History
              </button>
            </div>

            <div className="space-y-2.5">
              {workoutHistory.slice(0, 3).map(session => (
                <div
                  key={session.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-white">{session.planTitle}</p>
                    <p className="text-[11px] text-slate-400">
                      {session.date} · {session.durationMinutes} mins · {session.totalVolumeKg} kg Volume
                    </p>
                  </div>
                  {session.prAchieved && (
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                      PR 🔥
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
