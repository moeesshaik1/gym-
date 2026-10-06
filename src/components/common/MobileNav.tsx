import React from 'react';
import { Home, Dumbbell, Apple, LineChart, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, isAuthenticated } = useFitness();

  if (!isAuthenticated) return null;

  const items = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'progress', label: 'Progress', icon: LineChart },
    { id: 'ai-coach', label: 'AI Coach', icon: Sparkles },
  ] as const;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090C10]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg transition-all cursor-pointer ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
