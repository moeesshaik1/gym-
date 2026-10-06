import React, { useState, useEffect } from 'react';
import {
  Timer,
  Check,
  Plus,
  Flame,
  Trophy,
  Dumbbell,
  Clock,
  ArrowLeft,
  X,
  Play,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ActiveWorkoutTracker: React.FC = () => {
  const {
    activeSession,
    updateSet,
    completeSet,
    addSetToExercise,
    finishActiveWorkout,
    cancelActiveWorkout,
    startRestTimer,
    restTimer,
  } = useFitness();

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Stopwatch timer for workout duration
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeSession) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <Dumbbell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white">No Active Workout</h3>
        <p className="text-xs text-slate-400 mt-1">Select a workout routine to begin tracking.</p>
      </div>
    );
  }

  const formatStopwatch = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in duration-150">
      {/* Top Session Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-[#0F141C] border border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={cancelActiveWorkout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Cancel Workout"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Live Workout Session
              </span>
            </div>
            <h2 className="text-xl font-display font-black text-white">{activeSession.planTitle}</h2>
          </div>
        </div>

        {/* Real-time Ticker Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">{formatStopwatch(elapsedSeconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="font-bold text-white">{activeSession.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            <Dumbbell className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-white">{activeSession.totalVolumeKg} KG Vol</span>
          </div>

          <button
            onClick={finishActiveWorkout}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Finish Workout
          </button>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-6">
        {activeSession.exercises.map((exercise, exIdx) => (
          <div
            key={exercise.exerciseId}
            className="p-5 sm:p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4"
          >
            {/* Exercise Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  {exIdx + 1}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{exercise.exerciseName}</h3>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider">
                    {exercise.muscleGroup}
                  </span>
                </div>
              </div>

              {/* Quick Rest Preset Buttons */}
              <div className="flex items-center gap-1 text-xs">
                <span className="text-slate-500 hidden sm:inline text-[11px] mr-1">Rest:</span>
                {[60, 90, 120].map(sec => (
                  <button
                    key={sec}
                    onClick={() => startRestTimer(sec)}
                    className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-emerald-400 cursor-pointer transition-colors"
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Sets Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800/80">
                    <th className="py-2 px-2 font-bold uppercase tracking-wider">Set</th>
                    <th className="py-2 px-2 font-bold uppercase tracking-wider">Previous Best</th>
                    <th className="py-2 px-2 font-bold uppercase tracking-wider">Weight (KG)</th>
                    <th className="py-2 px-2 font-bold uppercase tracking-wider">Reps</th>
                    <th className="py-2 px-2 font-bold uppercase tracking-wider text-center">Complete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {exercise.sets.map((set, setIdx) => (
                    <tr
                      key={setIdx}
                      className={`transition-colors ${
                        set.completed ? 'bg-emerald-500/5' : 'hover:bg-slate-900/40'
                      }`}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-slate-300">
                        {set.setNumber}
                        {set.isPR && (
                          <span className="ml-1 text-[10px] text-amber-400 font-black">🔥 PR</span>
                        )}
                      </td>

                      <td className="py-3 px-2 text-slate-400 font-mono text-[11px]">
                        {exercise.exerciseName.includes('Bench') ? '80 KG × 10' : '30 KG × 12'}
                      </td>

                      {/* Weight Input with quick bump buttons */}
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            step="2.5"
                            value={set.weightKg}
                            onChange={e =>
                              updateSet(
                                exIdx,
                                setIdx,
                                parseFloat(e.target.value) || 0,
                                set.reps
                              )
                            }
                            className="w-20 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-center focus:outline-none focus:border-emerald-500 font-bold"
                          />
                          <button
                            onClick={() =>
                              updateSet(exIdx, setIdx, set.weightKg + 2.5, set.reps)
                            }
                            className="px-1.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 font-mono"
                            title="Add 2.5 KG"
                          >
                            +2.5
                          </button>
                        </div>
                      </td>

                      {/* Reps Input */}
                      <td className="py-3 px-2">
                        <input
                          type="number"
                          value={set.reps}
                          onChange={e =>
                            updateSet(
                              exIdx,
                              setIdx,
                              set.weightKg,
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="w-16 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-center focus:outline-none focus:border-emerald-500 font-bold"
                        />
                      </td>

                      {/* Complete Checkbox Button */}
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => completeSet(exIdx, setIdx)}
                          className={`w-9 h-9 mx-auto rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                            set.completed
                              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                              : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-emerald-500/50 hover:text-white'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[3]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Set Button */}
            <div className="pt-2">
              <button
                onClick={() => addSetToExercise(exIdx)}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Set</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Actions Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400">
          Ensure you maintain proper spinal bracing and full range of motion.
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={cancelActiveWorkout}
            className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={finishActiveWorkout}
            className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Complete Session
          </button>
        </div>
      </div>
    </div>
  );
};
