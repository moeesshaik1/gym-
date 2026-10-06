import React, { useState } from 'react';
import {
  LineChart,
  Scale,
  Plus,
  Trophy,
  Calendar,
  X,
  TrendingDown,
  TrendingUp,
  Activity,
  Layers,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { BodyMeasurementRecord } from '../../types';

export const ProgressView: React.FC = () => {
  const { measurements, addMeasurement, user, workoutHistory } = useFitness();

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('90d');
  const [metricTab, setMetricTab] = useState<'Weight' | 'Strength' | 'Circumference'>('Weight');
  const [logModalOpen, setLogModalOpen] = useState(false);

  // New log form state
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newWeight, setNewWeight] = useState(user.weight);
  const [newChest, setNewChest] = useState(102);
  const [newWaist, setNewWaist] = useState(82);
  const [newArms, setNewArms] = useState(38);
  const [newThighs, setNewThighs] = useState(57);

  const handleAddMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    addMeasurement({
      date: newDate,
      weightKg: newWeight,
      chestCm: newChest,
      waistCm: newWaist,
      armsCm: newArms,
      thighsCm: newThighs,
    });
    setLogModalOpen(false);
  };

  // SVG Chart Calculation for weight
  const weights = measurements.map(m => m.weightKg);
  const minWeight = Math.min(...weights, 68) - 1;
  const maxWeight = Math.max(...weights, 76) + 1;
  const rangeY = maxWeight - minWeight;

  const chartPoints = measurements
    .map((m, idx) => {
      const x = 40 + (idx / Math.max(1, measurements.length - 1)) * 520;
      const y = 180 - ((m.weightKg - minWeight) / rangeY) * 140;
      return `${x},${y}`;
    })
    .join(' ');

  const timelineMilestones = [
    { title: 'Baseline Start', date: 'Jul 2026', weight: '69.2 kg', arms: '35.5 cm', note: 'Initial Hypertrophy Phase' },
    { title: 'Week 4 Milestone', date: 'Aug 2026', weight: '70.5 kg', arms: '36.2 cm', note: '+1.3kg lean tissue' },
    { title: 'Week 8 Milestone', date: 'Sep 2026', weight: '71.8 kg', arms: '37.0 cm', note: 'Bench Press PR 80kg' },
    { title: 'Week 12 Milestone', date: 'Oct 2026', weight: '72.4 kg', arms: '37.8 cm', note: 'Current Physique Benchmark' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Physique & Performance Metrics
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            PROGRESS & MEASUREMENTS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track weight velocity, body circumference centimeters, and compound strength volume over time.
          </p>
        </div>

        <button
          onClick={() => setLogModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Record Measurements</span>
        </button>
      </div>

      {/* Top Range Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Metric Selector */}
        <div className="flex items-center gap-2">
          {(['Weight', 'Strength', 'Circumference'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMetricTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                metricTab === tab
                  ? 'bg-emerald-500 text-black shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Time Span Filter */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
          {(['7d', '30d', '90d', '1y'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg font-mono font-bold transition-colors cursor-pointer ${
                timeRange === range ? 'bg-slate-800 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Primary SVG Chart */}
      <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">
              {metricTab === 'Weight' && 'Body Weight Trajectory (KG)'}
              {metricTab === 'Strength' && 'Compound Strength Progression (1RM Equivalent)'}
              {metricTab === 'Circumference' && 'Upper Arm Circumference Growth (CM)'}
            </h3>
            <p className="text-xs text-slate-400">
              Showing historical progression data across verified weigh-ins
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+3.2 KG Net Lean Gain</span>
            </span>
          </div>
        </div>

        {/* Responsive Interactive SVG Canvas */}
        <div className="w-full h-64 overflow-hidden pt-4">
          <svg viewBox="0 0 600 220" className="w-full h-full overflow-visible">
            {/* Grid Lines */}
            <line x1="40" y1="40" x2="560" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="90" x2="560" y2="90" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="140" x2="560" y2="140" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="180" x2="560" y2="180" stroke="#334155" />

            {/* Path line */}
            <polyline
              fill="none"
              stroke="#10B981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={chartPoints}
            />

            {/* Gradient Fill under line */}
            <polygon
              fill="url(#emerald-gradient)"
              opacity="0.15"
              points={`40,180 ${chartPoints} 560,180`}
            />

            <defs>
              <linearGradient id="emerald-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Data Circles */}
            {measurements.map((m, idx) => {
              const x = 40 + (idx / Math.max(1, measurements.length - 1)) * 520;
              const y = 180 - ((m.weightKg - minWeight) / rangeY) * 140;
              return (
                <g key={m.id}>
                  <circle cx={x} cy={y} r="5" fill="#10B981" stroke="#0D1219" strokeWidth="2.5" />
                  <text
                    x={x}
                    y={y - 12}
                    fill="#F1F5F9"
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    {m.weightKg} kg
                  </text>
                  <text
                    x={x}
                    y={198}
                    fill="#64748B"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {m.date.split('-').slice(1).join('/')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Body Progress Timeline Section */}
      <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white">Body Transformation Timeline</h3>
          <p className="text-xs text-slate-400">Quarterly milestone review</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timelineMilestones.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 relative space-y-2 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase tracking-wider">
                <span>{m.title}</span>
                <span className="text-[10px] text-slate-500 font-normal">{m.date}</span>
              </div>
              <div className="text-xl font-display font-black text-white">{m.weight}</div>
              <p className="text-xs text-slate-300">Arms: <span className="text-white font-mono">{m.arms}</span></p>
              <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">{m.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Measurements Log Table */}
      <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Detailed Measurement Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="py-2.5 px-3 uppercase tracking-wider font-bold">Date</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-bold">Weight (KG)</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-bold">Chest (CM)</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-bold">Waist (CM)</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-bold">Arms (CM)</th>
                <th className="py-2.5 px-3 uppercase tracking-wider font-bold">Thighs (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {measurements.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-900/40">
                  <td className="py-3 px-3 text-slate-300 font-sans">{rec.date}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{rec.weightKg} kg</td>
                  <td className="py-3 px-3 text-slate-300">{rec.chestCm || '—'} cm</td>
                  <td className="py-3 px-3 text-slate-300">{rec.waistCm || '—'} cm</td>
                  <td className="py-3 px-3 text-slate-300">{rec.armsCm || '—'} cm</td>
                  <td className="py-3 px-3 text-slate-300">{rec.thighsCm || '—'} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Measurement Modal */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-[#0D1219] border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Record Body Measurements</h3>
              <button
                onClick={() => setLogModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMeasurement} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={e => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Weight (KG)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={e => setNewWeight(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Chest (CM)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newChest}
                    onChange={e => setNewChest(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Waist (CM)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newWaist}
                    onChange={e => setNewWaist(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Arms / Biceps (CM)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newArms}
                    onChange={e => setNewArms(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Thighs (CM)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newThighs}
                    onChange={e => setNewThighs(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Save Measurements
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
