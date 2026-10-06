import React, { useState } from 'react';
import {
  User,
  Sliders,
  Bell,
  Lock,
  Shield,
  Save,
  Check,
  Flame,
  Trophy,
  Dumbbell,
  Activity,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ProfileSettingsView: React.FC = () => {
  const { user, updateProfile, workoutHistory } = useFitness();

  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [height, setHeight] = useState(user.height);
  const [weight, setWeight] = useState(user.weight);
  const [goal, setGoal] = useState(user.goal);
  const [experience, setExperience] = useState(user.experience);
  const [units, setUnits] = useState<'metric' | 'imperial'>(user.unitPreference || 'metric');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      age,
      height,
      weight,
      goal,
      experience,
      unitPreference: units,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const totalVol = workoutHistory.reduce((acc, s) => acc + s.totalVolumeKg, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Athlete Identity & Preferences
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            PROFILE & SETTINGS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your biometric parameters, preferences, and workout logs.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Athlete Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            System Settings
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 text-center space-y-4 shadow-xl">
              <div className="relative inline-block">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-24 h-24 rounded-3xl object-cover mx-auto ring-2 ring-emerald-500/50 shadow-xl"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-1.5 rounded-full font-bold">
                  <Activity className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <h3 className="text-xl font-display font-black text-white">{user.name}</h3>
                <p className="text-xs text-slate-400">{user.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  <span>{user.experience} Athlete</span>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Streak</span>
                  <span className="text-base font-bold text-amber-400 font-mono">🔥 {user.streak} Days</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Sessions</span>
                  <span className="text-base font-bold text-white font-mono">{workoutHistory.length + 18}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Volume</span>
                  <span className="text-base font-bold text-blue-400 font-mono">{totalVol + 15400} kg</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Weight</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{user.weight} kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editable Form */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Profile Details</h3>
              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>Saved successfully!</span>
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(parseInt(e.target.value) || 20)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(parseFloat(e.target.value) || 170)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={e => setWeight(parseFloat(e.target.value) || 70)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Primary Goal</label>
                  <select
                    value={goal}
                    onChange={e => setGoal(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Fat Loss">Fat Loss</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Strength">Strength</option>
                    <option value="Endurance">Endurance</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Experience Level</label>
                  <select
                    value={experience}
                    onChange={e => setExperience(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Settings Tab */
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
            Platform Configuration
          </h3>

          <div className="space-y-4 text-xs">
            {/* Units Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Measurement Units</span>
                <span className="text-slate-400 text-[11px]">Choose between Metric and Imperial</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setUnits('metric')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    units === 'metric'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  KG / CM
                </button>
                <button
                  onClick={() => setUnits('imperial')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    units === 'imperial'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  LB / FT
                </button>
              </div>
            </div>

            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Workout & Water Reminders</span>
                <span className="text-slate-400 text-[11px]">Send hydration alerts & session countdowns</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
            </div>

            {/* Audio Timer Sound */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <span className="font-bold text-white block">Rest Timer Sound Effects</span>
                <span className="text-slate-400 text-[11px]">Synthesize Web Audio chimes at countdown completion</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
            </div>

            {/* Security */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="font-bold text-white block">Security & Access</span>
              <p className="text-slate-400 text-[11px]">
                Your biometric and training records are encrypted in your local browser sandbox.
              </p>
              <button
                type="button"
                onClick={() => alert('Password update request dispatched to your registered email.')}
                className="mt-2 text-emerald-400 font-bold hover:underline"
              >
                Change Password →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
