import React, { useState } from 'react';
import { X, Dumbbell, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { FitnessGoal } from '../../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, closeAuthModal, authModalMode, openAuthModal, login, register, loginAsDemo } = useFitness();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(26);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(72.4);
  const [goal, setGoal] = useState<FitnessGoal>('Muscle Gain');
  const [activityLevel, setActivityLevel] = useState<any>('Very Active');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  // Sync mode with context
  React.useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode]);

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please enter your email and password');
        return;
      }
      login(email, password);
    } else if (mode === 'register') {
      if (!name || !email || !password) {
        setError('Please complete all required fields');
        return;
      }
      register({
        name,
        email,
        age,
        gender,
        height,
        weight,
        goal,
        activityLevel,
      });
    } else if (mode === 'forgot') {
      if (!email) {
        setError('Please enter your email address');
        return;
      }
      setResetSent(true);
    }
  };

  const fitnessGoals: FitnessGoal[] = [
    'Muscle Gain',
    'Fat Loss',
    'Weight Loss',
    'Strength',
    'Endurance',
    'General Fitness',
    'Maintenance',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-[#0D1219] border border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 mx-auto flex items-center justify-center text-black font-black mb-3 shadow-lg shadow-emerald-500/20">
            <Dumbbell className="w-6 h-6 text-black stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-display font-black text-white">
            {mode === 'login' && 'Welcome Back to FitForge'}
            {mode === 'register' && 'Build Your Stronger Self'}
            {mode === 'forgot' && 'Reset FitForge Password'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' && 'Log in to track workouts, nutrition, and personal records.'}
            {mode === 'register' && 'Create your athlete account and start smart training.'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* 1-Click Demo Login Bar */}
        {mode === 'login' && (
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Athlete Demo</span>
              </p>
              <p className="text-[11px] text-slate-400">Pre-seeded with 12-day streak & Indian food logs</p>
            </div>
            <button
              type="button"
              onClick={loginAsDemo}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              One-Click Demo
            </button>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        {resetSent ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white">Reset Link Dispatched</h4>
            <p className="text-xs text-slate-400">
              We have dispatched password reset instructions to <span className="text-emerald-400">{email}</span>.
            </p>
            <button
              onClick={() => {
                setResetSent(false);
                setMode('login');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Moeed Shaik"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="athlete@fitforge.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {mode === 'register' && (
              <>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={e => setAge(parseInt(e.target.value) || 20)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={e => setHeight(parseFloat(e.target.value) || 175)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={e => setWeight(parseFloat(e.target.value) || 70)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Activity Level</label>
                    <select
                      value={activityLevel}
                      onChange={e => setActivityLevel(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Sedentary">Sedentary</option>
                      <option value="Lightly Active">Lightly Active</option>
                      <option value="Moderately Active">Moderately Active</option>
                      <option value="Very Active">Very Active (4-5x / wk)</option>
                      <option value="Extremely Active">Extremely Active</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Primary Fitness Goal</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {fitnessGoals.map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGoal(g)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                          goal === g
                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                            : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {mode === 'login' && 'Sign In to Account'}
                {mode === 'register' && 'Create Account & Continue'}
                {mode === 'forgot' && 'Send Recovery Email'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Toggle between Login and Register */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Register Now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
