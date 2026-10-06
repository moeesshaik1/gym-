import React, { useState } from 'react';
import {
  Dumbbell,
  Search,
  Bell,
  Flame,
  User,
  Timer,
  ChevronDown,
  Shield,
  LogOut,
  Sliders,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const Header: React.FC = () => {
  const {
    user,
    isAuthenticated,
    currentView,
    setCurrentView,
    openAuthModal,
    logout,
    setGlobalSearchOpen,
    restTimer,
  } = useFitness();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: '🔥 Your Chest + Triceps session is scheduled for today.', time: '10m ago', unread: true },
    { id: 2, text: '💧 You are 900ml away from your daily hydration target.', time: '1h ago', unread: true },
    { id: 3, text: '💪 New Personal Record: 85 KG on Barbell Bench Press!', time: '2d ago', unread: false },
    { id: 4, text: '🔥 12-day training consistency streak unlocked!', time: '3d ago', unread: false },
  ];

  const navItems: Array<{
    id: any;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'workouts', label: 'Workouts' },
    { id: 'exercises', label: 'Exercises' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'progress', label: 'Analytics' },
    { id: 'goals', label: 'Habits & Goals' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'ai-coach', label: 'AI Coach', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090C10]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView(isAuthenticated ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-black font-black shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  FITFORGE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                  AI PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Train Smarter · Eat Better</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = currentView === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400" />}
                    {item.label}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Action Island */}
        <div className="flex items-center gap-2.5">
          {/* Active Rest Timer Pill */}
          {restTimer.active && restTimer.remainingSec > 0 && (
            <button
              onClick={() => setCurrentView('workout-active')}
              className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg text-xs font-mono font-bold animate-pulse cursor-pointer hover:bg-emerald-500/25 transition-colors"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>
                REST: {Math.floor(restTimer.remainingSec / 60)}:
                {(restTimer.remainingSec % 60).toString().padStart(2, '0')}
              </span>
            </button>
          )}

          {/* Global Search Shortcut */}
          <button
            onClick={() => setGlobalSearchOpen(true)}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer"
            title="Search exercises & foods (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {isAuthenticated ? (
            <>
              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileDropdownOpen(false);
                  }}
                  className="relative p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#090C10]"></span>
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notifications</h4>
                      <span className="text-[10px] text-emerald-400 font-semibold">2 New</span>
                    </div>
                    <div className="space-y-1.5 max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg text-xs transition-colors ${
                            n.unread ? 'bg-slate-800/80 text-slate-200' : 'text-slate-400 hover:bg-slate-800/40'
                          }`}
                        >
                          <p className="leading-snug">{n.text}</p>
                          <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Streak Counter */}
              <div className="hidden sm:flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{user.streak} DAYS</span>
              </div>

              {/* User Avatar Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 cursor-pointer transition-colors"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
                  />
                  <span className="text-xs font-medium text-slate-200 hidden md:inline max-w-[100px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-2 border-b border-slate-800 mb-1">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-1">Goal: {user.goal}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentView('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Profile & Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Admin Console</span>
                    </button>

                    <div className="border-t border-slate-800 my-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal('register')}
                className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile hamburger menu toggle */}
          {isAuthenticated && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                currentView === item.id
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span>{item.label}</span>
              {currentView === item.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
