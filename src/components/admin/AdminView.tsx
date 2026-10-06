import React, { useState } from 'react';
import {
  Shield,
  Users,
  Dumbbell,
  Apple,
  Activity,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  Server,
  RefreshCw,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const AdminView: React.FC = () => {
  const { exercises, foodDatabase, workoutPlans, workoutHistory } = useFitness();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'users' | 'catalog'>('overview');

  const stats = [
    { title: 'Total Registered Athletes', value: '1,428', change: '+14% this month', icon: Users, color: 'text-emerald-400' },
    { title: 'Active Daily Lifters', value: '892', change: '62% retention', icon: Activity, color: 'text-blue-400' },
    { title: 'Workouts Completed', value: '14,890', change: '+340 today', icon: Dumbbell, color: 'text-amber-400' },
    { title: 'Meals & Macros Logged', value: '48,210', change: '82% Indian foods', icon: Apple, color: 'text-purple-400' },
  ];

  const sampleUsers = [
    { id: 'usr-1', name: 'Moeed Shaik', email: 'moeeshaik@gmail.com', goal: 'Muscle Gain', streak: 12, status: 'Active Pro' },
    { id: 'usr-2', name: 'Vikram Malhotra', email: 'vikram.m@gmail.com', goal: 'Strength', streak: 24, status: 'Active Elite' },
    { id: 'usr-3', name: 'Ananya Roy', email: 'ananya.fit@gmail.com', goal: 'Fat Loss', streak: 8, status: 'Active Pro' },
    { id: 'usr-4', name: 'Rohan Deshmukh', email: 'rohan.d@yahoo.com', goal: 'General Fitness', streak: 5, status: 'Starter' },
    { id: 'usr-5', name: 'Kavita Sundaram', email: 'kavita.s@gmail.com', goal: 'Endurance', streak: 19, status: 'Active Pro' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Platform Governance & Telemetry</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            FITFORGE ADMIN CONSOLE
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time platform metrics, user management, and verified exercise & food catalog monitoring.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          {(['overview', 'users', 'catalog'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveAdminTab(tab)}
              className={`px-4 py-2 rounded-xl font-bold uppercase transition-colors cursor-pointer ${
                activeAdminTab === tab
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {s.title}
                    </span>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>
                  <div className="text-3xl font-display font-black text-white">{s.value}</div>
                  <p className="text-[11px] text-emerald-400 font-semibold">{s.change}</p>
                </div>
              );
            })}
          </div>

          {/* Infrastructure Health Status */}
          <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <span>System & API Services Health</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Gemini Coach Microservice</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-slate-400">Endpoint: /api/ai/coach</p>
                <span className="text-[10px] text-emerald-400 font-mono font-bold block pt-1">
                  Latency: 280ms · Operational
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Indian Food Catalog DB</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-slate-400">{foodDatabase.length} Verified Entries</p>
                <span className="text-[10px] text-emerald-400 font-mono font-bold block pt-1">
                  100% Cache Hit Rate
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Interactive Session Engine</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <p className="text-slate-400">Web Audio API Synthesis</p>
                <span className="text-[10px] text-emerald-400 font-mono font-bold block pt-1">
                  Rest Timers & PR Fanfare Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAdminTab === 'users' && (
        <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Registered Athletes</h3>
            <span className="text-xs text-slate-400 font-mono">5 Active Demonstrators</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 pb-2">
                  <th className="py-2.5 px-3 uppercase font-bold">Athlete</th>
                  <th className="py-2.5 px-3 uppercase font-bold">Primary Goal</th>
                  <th className="py-2.5 px-3 uppercase font-bold">Streak</th>
                  <th className="py-2.5 px-3 uppercase font-bold">Plan Tier</th>
                  <th className="py-2.5 px-3 uppercase font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sampleUsers.map(usr => (
                  <tr key={usr.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-3">
                      <p className="font-bold text-white">{usr.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{usr.email}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{usr.goal}</td>
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">
                      🔥 {usr.streak} Days
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                        {usr.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-xs text-slate-400 hover:text-white font-semibold">
                        View Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeAdminTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exercises Catalog */}
          <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
                <span>Exercise Catalog ({exercises.length})</span>
              </h3>
              <span className="text-xs text-emerald-400 font-bold">Verified Form</span>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {exercises.map(e => (
                <div key={e.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between">
                  <span className="font-bold text-white">{e.name}</span>
                  <span className="text-slate-400">{e.muscleGroup} · {e.difficulty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Foods Catalog */}
          <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Apple className="w-4 h-4 text-amber-400" />
                <span>Food & Nutrition DB ({foodDatabase.length})</span>
              </h3>
              <span className="text-xs text-amber-400 font-bold">Indian Staples Included</span>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {foodDatabase.map(f => (
                <div key={f.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between">
                  <div>
                    <span className="font-bold text-white">{f.name}</span>
                    {f.hindiName && <span className="text-slate-400 ml-1">({f.hindiName})</span>}
                  </div>
                  <span className="font-mono text-emerald-400">{f.calories} kcal · {f.protein}g P</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
