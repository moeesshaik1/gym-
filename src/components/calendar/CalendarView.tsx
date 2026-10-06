import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
  Dumbbell,
  Apple,
  Trophy,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const CalendarView: React.FC = () => {
  const { workoutHistory, loggedFoods } = useFitness();

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 9, 1)); // October 2026
  const [selectedDay, setSelectedDay] = useState<number>(6);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfWeek = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Helper mapping for day tags
  const getDayStatus = (day: number) => {
    // Workout days: 2, 4, 6
    if (day === 4) return { type: 'pr', label: 'Workout + PR 🔥', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    if ([1, 2, 5, 6].includes(day)) return { type: 'workout', label: 'Workout Logged', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
    if ([3].includes(day)) return { type: 'rest', label: 'Active Rest & Recovery', color: 'bg-blue-500/20 text-blue-400 border-blue-500/40' };
    return { type: 'none', label: 'Rest Day', color: '' };
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Adherence & Schedule
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            FITNESS & NUTRITION CALENDAR
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monthly overview of completed workouts, rest days, Personal Records, and diet consistency.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-300">Workout Day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-slate-300">Personal Record (PR)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-slate-300">Scheduled Rest</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6">
          {/* Month Header Controller */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-black text-white">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                  )
                }
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                  )
                }
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800/80">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <span key={d}>{d}</span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Blank padding days */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="h-20 rounded-2xl bg-slate-950/20" />
            ))}

            {/* Month days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const status = getDayStatus(day);
              const isSelected = selectedDay === day;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`h-20 p-2 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-slate-800/90 shadow-lg shadow-emerald-500/10'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected ? 'text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    {day}
                  </span>

                  {status.type === 'pr' && (
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/20 px-1 py-0.5 rounded truncate">
                      🔥 PR
                    </span>
                  )}
                  {status.type === 'workout' && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/15 px-1 py-0.5 rounded truncate">
                      LIFT
                    </span>
                  )}
                  {status.type === 'rest' && (
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/15 px-1 py-0.5 rounded truncate">
                      REST
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Details Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Log Inspection
              </span>
              <h3 className="text-xl font-display font-black text-white">
                October {selectedDay}, 2026
              </h3>
            </div>
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
          </div>

          {/* Session Detail */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>Training Session</span>
              </span>
              <h4 className="text-sm font-bold text-white">
                {selectedDay === 4
                  ? 'Chest & Triceps Hypertrophy (PR Achieved)'
                  : selectedDay === 2
                  ? 'Back & Biceps Power Builder'
                  : selectedDay === 6
                  ? 'Legs & Core Power Routine'
                  : 'Active Recovery & Mobility'}
              </h4>
              <p className="text-xs text-slate-400">
                {selectedDay === 4
                  ? 'Total Volume: 3,140 KG · Duration: 52 mins · 380 kcal burned'
                  : selectedDay === 2
                  ? 'Total Volume: 4,210 KG · Duration: 58 mins · 440 kcal burned'
                  : '10 Mins Dynamic Stretching · Hydration: 3.2L'}
              </p>
            </div>

            {/* Nutrition Adherence on this Day */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Apple className="w-3.5 h-3.5" />
                <span>Nutrition Adherence</span>
              </span>
              <p className="text-sm font-bold text-white">
                2,120 / 2,450 kcal · 145g Protein
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <p>• Breakfast: Oats + 3 Boiled Eggs + Banana</p>
                <p>• Lunch: 1.5 Bowls Basmati Rice + Chicken Curry + Dal</p>
                <p>• Dinner: 2 Rotis + 100g Paneer Bhurji + Curd</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
