import React, { useState } from 'react';
import { Dumbbell, ArrowRight, Check, Sparkles, MapPin, Target, Activity } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { ExperienceLevel, TrainingLocation, DietPreference } from '../../types';

export const OnboardingModal: React.FC = () => {
  const { onboardingOpen, setOnboardingOpen, completeOnboarding, user } = useFitness();

  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState<ExperienceLevel>('Intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState(5);
  const [workoutDuration, setWorkoutDuration] = useState(60);
  const [trainingLocation, setTrainingLocation] = useState<TrainingLocation>('Gym');
  const [equipmentList, setEquipmentList] = useState<string[]>([
    'Barbell',
    'Dumbbells',
    'Cables',
    'Machines',
  ]);
  const [diet, setDiet] = useState<DietPreference>('Non-Vegetarian');

  if (!onboardingOpen) return null;

  const toggleEquipment = (eq: string) => {
    if (equipmentList.includes(eq)) {
      setEquipmentList(equipmentList.filter(item => item !== eq));
    } else {
      setEquipmentList([...equipmentList, eq]);
    }
  };

  const handleFinish = () => {
    // Calculate recommended baseline calories & macros
    let calorieTarget = 2400;
    if (user.goal === 'Fat Loss' || user.goal === 'Weight Loss') calorieTarget = 1950;
    else if (user.goal === 'Muscle Gain') calorieTarget = 2650;
    else if (user.goal === 'Strength') calorieTarget = 2500;

    const proteinTarget = Math.round(user.weight * 2.2); // ~160g
    const fatTarget = Math.round((calorieTarget * 0.25) / 9); // ~65g
    const carbsTarget = Math.round((calorieTarget - (proteinTarget * 4 + fatTarget * 9)) / 4);

    completeOnboarding({
      experience,
      trainingDaysPerWeek: daysPerWeek,
      workoutDuration,
      trainingLocation,
      equipment: equipmentList,
      diet,
      calorieTarget,
      proteinTarget,
      fatTarget,
      carbsTarget,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0D1219] border border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl relative">
        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === i
                  ? 'w-8 bg-emerald-500'
                  : step > i
                  ? 'w-4 bg-emerald-500/50'
                  : 'w-4 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Experience & Frequency */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 1 of 3</span>
              <h3 className="text-2xl font-display font-black text-white mt-1">
                LET'S BUILD YOUR FITNESS PLAN
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tell us about your background so we can calibrate your volume and training splits.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Experience Level</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as ExperienceLevel[]).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperience(lvl)}
                    className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                      experience === lvl
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300">Training Days per Week</label>
                <span className="text-xs font-mono font-bold text-emerald-400">{daysPerWeek} days / week</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 4, 5, 6].map(days => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDaysPerWeek(days)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      daysPerWeek === days
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300">Preferred Workout Duration</label>
                <span className="text-xs font-mono font-bold text-emerald-400">{workoutDuration} mins</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[45, 60, 75, 90].map(dur => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setWorkoutDuration(dur)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      workoutDuration === dur
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {dur} min
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Next: Equipment & Location</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Location & Equipment */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 2 of 3</span>
              <h3 className="text-2xl font-display font-black text-white mt-1">
                TRAINING ENVIRONMENT
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Where will you be executing your sessions and what gear is at hand?
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Training Location</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Gym', 'Home', 'Outdoor'] as TrainingLocation[]).map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setTrainingLocation(loc)}
                    className={`p-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                      trainingLocation === loc
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Available Equipment</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Barbell & Rack',
                  'Dumbbells',
                  'Cable Machine',
                  'Kettlebells',
                  'Pull-up Bar',
                  'Resistance Bands',
                  'Bodyweight Only',
                  'Cardio Machines',
                ].map(eq => {
                  const isSelected = equipmentList.includes(eq);
                  return (
                    <button
                      key={eq}
                      type="button"
                      onClick={() => toggleEquipment(eq)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left border flex items-center justify-between transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{eq}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Next: Nutrition Preferences</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Diet & Personalization */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 3 of 3</span>
              <h3 className="text-2xl font-display font-black text-white mt-1">
                NUTRITION PREFERENCE
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Personalize your meal recommendations and Indian food macro targets.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Dietary Lifestyle</label>
              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    'Vegetarian',
                    'Non-Vegetarian',
                    'Vegan',
                    'Eggetarian',
                    'Custom',
                  ] as DietPreference[]
                ).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiet(d)}
                    className={`p-3 rounded-xl text-xs font-bold text-left border flex items-center justify-between transition-colors cursor-pointer ${
                      diet === d
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{d}</span>
                    {diet === d && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Personalized Plan Ready</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We'll configure your dashboard for <strong className="text-white">{user.goal}</strong> with{' '}
                <strong className="text-white">{daysPerWeek} training days</strong> per week and tailored {diet} Indian nutritional macro targets.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="w-2/3 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Launch My Dashboard</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
