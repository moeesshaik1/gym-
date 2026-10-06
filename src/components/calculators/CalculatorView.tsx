import React, { useState } from 'react';
import {
  Calculator,
  Flame,
  Apple,
  ShieldCheck,
  Check,
  Info,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const CalculatorView: React.FC = () => {
  const { user, applyCalculatedTargets } = useFitness();

  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState<'Male' | 'Female'>(
    user.gender === 'Female' ? 'Female' : 'Male'
  );
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [activity, setActivity] = useState<number>(1.55); // Moderately active default
  const [goalType, setGoalType] = useState<
    'Cut' | 'AggressiveCut' | 'Maintain' | 'LeanBulk' | 'Bulk'
  >('LeanBulk');

  // Custom macro ratios (must sum to 100%)
  const [proteinRatio, setProteinRatio] = useState(30); // 30% of cals
  const [carbsRatio, setCarbsRatio] = useState(45); // 45% of cals
  const [fatRatio, setFatRatio] = useState(25); // 25% of cals
  const [appliedNotice, setAppliedNotice] = useState(false);

  // Mifflin-St Jeor formula for BMR
  // Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
  // Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
  const bmr = Math.round(
    10 * weight +
      6.25 * height -
      5 * age +
      (gender === 'Male' ? 5 : -161)
  );

  // Total Daily Energy Expenditure (TDEE)
  const tdee = Math.round(bmr * activity);

  // Calorie target based on selected phase
  let goalAdjustment = 0;
  if (goalType === 'Cut') goalAdjustment = -500;
  else if (goalType === 'AggressiveCut') goalAdjustment = -750;
  else if (goalType === 'Maintain') goalAdjustment = 0;
  else if (goalType === 'LeanBulk') goalAdjustment = 250;
  else if (goalType === 'Bulk') goalAdjustment = 500;

  const targetCalories = Math.max(1400, tdee + goalAdjustment);

  // Suggested Grams
  const suggestedProteinGrams = Math.round((targetCalories * (proteinRatio / 100)) / 4);
  const suggestedCarbsGrams = Math.round((targetCalories * (carbsRatio / 100)) / 4);
  const suggestedFatGrams = Math.round((targetCalories * (fatRatio / 100)) / 9);

  const handleApply = () => {
    applyCalculatedTargets(
      targetCalories,
      suggestedProteinGrams,
      suggestedCarbsGrams,
      suggestedFatGrams
    );
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Sports Science Engine
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            BMR, TDEE & MACRO CALCULATOR
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Grounded in the validated Mifflin-St Jeor formula to determine precise thermodynamic caloric expenditure.
          </p>
        </div>

        {appliedNotice && (
          <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Updated Profile & Dashboard Targets!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Biometric Parameters</span>
            </h3>

            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Biological Sex</label>
              <div className="grid grid-cols-2 gap-3">
                {(['Male', 'Female'] as const).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      gender === g
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Age, Height, Weight */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(parseFloat(e.target.value) || 170)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={e => setWeight(parseFloat(e.target.value) || 70)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Activity Multiplier</label>
              <select
                value={activity}
                onChange={e => setActivity(parseFloat(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value={1.2}>Sedentary (Desk job, little to no exercise)</option>
                <option value={1.375}>Lightly Active (1-3 training sessions/wk)</option>
                <option value={1.55}>Moderately Active (3-5 intense workouts/wk)</option>
                <option value={1.725}>Very Active (6-7 intense workouts/wk)</option>
                <option value={1.9}>Extremely Active (Athletic double sessions/day)</option>
              </select>
            </div>

            {/* Phase / Goal Target */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Phase Objective</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'AggressiveCut', label: 'Aggressive Cut (-750 kcal)' },
                  { id: 'Cut', label: 'Standard Cut (-500 kcal)' },
                  { id: 'Maintain', label: 'Maintenance (0 kcal)' },
                  { id: 'LeanBulk', label: 'Lean Bulk (+250 kcal)' },
                  { id: 'Bulk', label: 'Mass Gain (+500 kcal)' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setGoalType(item.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-medium text-left border transition-colors cursor-pointer ${
                      goalType === item.id
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Macro Ratio Sliders */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Macronutrient Ratio Split</span>
                </span>
                <span className="text-slate-400 font-mono">
                  Total: {proteinRatio + carbsRatio + fatRatio}%
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Protein ({proteinRatio}%)</span>
                    <span className="font-mono text-emerald-400">{suggestedProteinGrams}g</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="50"
                    value={proteinRatio}
                    onChange={e => setProteinRatio(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Carbohydrates ({carbsRatio}%)</span>
                    <span className="font-mono text-blue-400">{suggestedCarbsGrams}g</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={carbsRatio}
                    onChange={e => setCarbsRatio(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Fats ({fatRatio}%)</span>
                    <span className="font-mono text-amber-400">{suggestedFatGrams}g</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="40"
                    value={fatRatio}
                    onChange={e => setFatRatio(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white">Calculated Energy Expenditure</h3>

            {/* BMR and TDEE Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Basal Metabolic (BMR)
                </span>
                <span className="text-2xl font-display font-black text-white mt-1 block">
                  {bmr.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">kcal burned at complete rest</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Energy (TDEE)
                </span>
                <span className="text-2xl font-display font-black text-emerald-400 mt-1 block">
                  {tdee.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">kcal expenditure with activity</span>
              </div>
            </div>

            {/* Master Caloric Goal Target */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 text-center space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                RECOMMENDED DAILY CALORIE INTAKE
              </span>
              <div className="text-4xl sm:text-5xl font-display font-black text-white">
                {targetCalories.toLocaleString()}
                <span className="text-base text-slate-400 font-normal ml-2">kcal</span>
              </div>
              <p className="text-xs text-slate-300">
                Calibrated to promote sustainable body recomposition without compromising recovery.
              </p>
            </div>

            {/* Daily Macro Grams Target */}
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Target Protein</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{suggestedProteinGrams} g</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Target Carbohydrates</span>
                <span className="font-mono font-bold text-blue-400 text-sm">{suggestedCarbsGrams} g</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Target Dietary Fats</span>
                <span className="font-mono font-bold text-amber-400 text-sm">{suggestedFatGrams} g</span>
              </div>
            </div>

            {/* Apply Targets Button */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>APPLY TARGETS TO MY PROFILE</span>
            </button>
          </div>

          {/* Educational Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              These thermodynamic estimates are provided for general educational fitness planning only and do not constitute clinical dietetics or medical counsel. Adjust according to weekly weigh-in trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
