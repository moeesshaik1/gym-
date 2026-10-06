import React from 'react';
import { Dumbbell, ShieldCheck, Heart, Sparkles, Twitter, Instagram, Youtube, Github } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const Footer: React.FC = () => {
  const { setCurrentView, openAuthModal, isAuthenticated } = useFitness();

  return (
    <footer className="border-t border-slate-800/80 bg-[#070A0E] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-black">
                <Dumbbell className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                FITFORGE
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              The modern intelligent fitness platform. Precision workout tracking, curated Indian nutrition databases, progressive overload analytics, and AI training coaching.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Training & Features */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wider text-xs uppercase">Platform</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('workouts')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Workout Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('exercises')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Exercise Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('nutrition')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Indian Nutrition DB
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('calculators')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Macro & TDEE Calculators
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('ai-coach')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>AI Fitness Coach</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-bold">PRO</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tracking */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wider text-xs uppercase">Tracking & Tools</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('progress')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Progress Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('goals')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Habits & Streaks
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('calendar')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Monthly Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Health Statement */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wider text-xs uppercase">Health Advisory</h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              FitForge provides fitness tracking and educational recommendations. Always consult a physician or licensed healthcare provider before initiating any vigorous training or diet change.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Evidence-based principles</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} FitForge Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
