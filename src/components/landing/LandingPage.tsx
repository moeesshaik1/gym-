import React from 'react';
import {
  Dumbbell,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Apple,
  Trophy,
  Activity,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const LandingPage: React.FC = () => {
  const { openAuthModal, setCurrentView, loginAsDemo } = useFitness();

  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const stats = [
    { value: '10K+', label: 'WORKOUTS COMPLETED' },
    { value: '500+', label: 'EXERCISES IN LIBRARY' },
    { value: '100+', label: 'CURATED MEAL PLANS' },
    { value: '24/7', label: 'AI FITNESS TRACKING' },
  ];

  const features = [
    {
      icon: Dumbbell,
      title: 'Precision Workout Tracker',
      desc: 'Log sets, reps, and poundage with live rest countdown timers and automated Personal Record fanfare.',
    },
    {
      icon: Apple,
      title: 'Indian Nutrition Database',
      desc: 'Effortlessly track rotis, dal tadka, paneer bhurji, chicken curry, and dosas with exact macro metrics.',
    },
    {
      icon: TrendingUp,
      title: 'Progressive Overload Analytics',
      desc: 'Interactive charts mapping weight velocity, volume tonnage, and body circumference milestones.',
    },
    {
      icon: Sparkles,
      title: 'AI Training Assistant',
      desc: 'Instant evidence-based coaching on plateaus, optimal rest intervals, and customized weekly splits.',
    },
  ];

  const faqs = [
    {
      q: 'How does FitForge personalize my workout program?',
      a: 'During onboarding, FitForge captures your primary fitness goal (Muscle Gain, Fat Loss, Strength), available equipment, weekly training schedule, and experience level to construct optimal push/pull/legs or full-body splits with periodized volume.',
    },
    {
      q: 'Does FitForge support traditional Indian food tracking?',
      a: 'Yes! FitForge includes an extensive pre-verified database of Indian home-cooked meals including whole wheat roti, ghee, basmati rice, lentils (dal tadka, rajma, chole), raw and bhurji paneer, biryani, and regional breakfasts like idli, dosa, and poha.',
    },
    {
      q: 'Can I track Personal Records (PRs) during workouts?',
      a: 'Absolutely. As you log sets in the interactive tracker, FitForge automatically detects when you exceed previous high marks, plays audio fanfare, and updates your achievements gallery.',
    },
    {
      q: 'Is the AI Fitness Coach safe to use?',
      a: 'Our AI coach adheres to strict sports science principles for exercise mechanics and nutrition. In accordance with health guidelines, it strictly refers any acute injuries or medical inquiries to licensed doctors.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#090C10] text-slate-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow ambient background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          {/* Top Pill Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-top-2 duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation AI Fitness & Nutrition Platform</span>
          </div>

          {/* Primary Master Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight text-white uppercase leading-[1.05]">
            BUILD YOUR <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white">
              STRONGER SELF.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Train smarter. Eat better. Track your progress. The all-in-one athletic platform engineered for real gains.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>START YOUR FITNESS JOURNEY</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={() => setCurrentView('workouts')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-bold text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>EXPLORE WORKOUTS</span>
            </button>
          </div>

          {/* Quick Demo Access banner */}
          <div className="pt-2">
            <button
              onClick={loginAsDemo}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Or explore full features instantly via One-Click Athlete Demo</span>
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup Frame */}
        <div className="mt-14 relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-[#0E131B] shadow-2xl shadow-emerald-950/40">
          <div className="relative h-[340px] sm:h-[480px] w-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=80"
              alt="Athlete training with barbell"
              className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E131B] via-[#0E131B]/40 to-transparent" />

            {/* Floating Glassmorphic Metric Badges */}
            <div className="absolute top-8 left-6 sm:left-10 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl shadow-xl hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5 fill-emerald-400" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Current Streak</p>
                  <p className="text-xl font-display font-black text-white">12 DAYS IN A ROW 🔥</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 right-6 sm:right-10 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl shadow-xl hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Personal Best</p>
                  <p className="text-xl font-display font-black text-white">BENCH 85 KG × 6 REPS</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-6 sm:left-10 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 p-4 rounded-2xl shadow-xl hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Apple className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Today's Nutrition</p>
                  <p className="text-xl font-display font-black text-white">132 / 160g PROTEIN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-center hover:border-emerald-500/30 transition-colors"
            >
              <h3 className="text-3xl sm:text-4xl font-display font-black text-emerald-400">
                {s.value}
              </h3>
              <p className="text-xs font-bold text-slate-400 tracking-wider mt-1 uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why FitForge Section */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0B0F15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Engineered for Results</span>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
              WHY FITFORGE LEADS THE REVOLUTION
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Generic spreadsheets and fragmented apps don't cut it. FitForge unites exercise science, Indian culinary data, and AI analytics in one cohesive cockpit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workout Programs & Exercise Library Teaser */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Science-Based Splits</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight mt-1">
              TARGET EVERY MUSCLE GROUP
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-2">
              Browse structured routines across Chest, Back, Shoulders, Biceps, Triceps, Legs, Abs, and Full Body with verified form cues.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('exercises')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Explore All 500+ Exercises
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Chest & Triceps Hypertrophy',
              category: 'Chest',
              duration: '55 mins',
              level: 'Intermediate',
              img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Back & Biceps Power Builder',
              category: 'Back',
              duration: '60 mins',
              level: 'Intermediate',
              img: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80',
            },
            {
              title: 'Legs & Core Power Routine',
              category: 'Legs',
              duration: '65 mins',
              level: 'Advanced',
              img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
            },
          ].map((w, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 group hover:border-emerald-500/40 transition-all cursor-pointer"
              onClick={() => setCurrentView('workouts')}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={w.img}
                  alt={w.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-emerald-400">
                  {w.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{w.duration}</span>
                  <span>·</span>
                  <span>{w.level}</span>
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {w.title}
                </h4>
                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span>Start Plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Indian Nutrition Feature Showcase */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0A0E14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Tailored for Indian Diets</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
                REAL INDIAN NUTRITION, TRACKED WITH PRECISION
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Most western fitness apps force you to guess the macros in your mom's dal tadka, homemade rotis, paneer bhurji, or chicken curry. FitForge includes an exhaustive, dietitian-vetted Indian database with precise protein, carb, fat, and fiber metrics.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  'Verified portion sizes for 1 medium roti (with & without ghee)',
                  'Accurate lentils breakdown: Moong, Toor, Rajma, Chole & Sambar',
                  'High-protein vegetarian staples: Raw paneer, bhurji, soya chunks, Greek curd',
                  'Macro calculator with automatic Indian diet adjustments',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => setCurrentView('nutrition')}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Indian Food DB
                </button>
                <button
                  onClick={() => setCurrentView('calculators')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Calculate TDEE & Macros
                </button>
              </div>
            </div>

            {/* Nutrition Mock Card */}
            <div className="p-6 rounded-3xl bg-[#0F141C] border border-slate-800 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Apple className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">Daily Macro Breakdown</h4>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">1,820 / 2,450 kcal</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Protein (132 / 160g)</span>
                    <span className="text-emerald-400 font-bold">82%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '82%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Carbohydrates (190 / 270g)</span>
                    <span className="text-blue-400 font-bold">70%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Fats (48 / 65g)</span>
                    <span className="text-amber-400 font-bold">73%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '73%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recently Logged Today</p>
                <div className="space-y-1.5 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/80 flex items-center justify-between">
                    <span>2× Roti Whole Wheat + 1 Bowl Dal Tadka</span>
                    <span className="font-mono text-slate-400">373 kcal · 15.6g P</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 flex items-center justify-between">
                    <span>100g Fresh Raw Paneer</span>
                    <span className="font-mono text-slate-400">265 kcal · 18.3g P</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 flex items-center justify-between">
                    <span>1 Scoop Whey Protein Isolate</span>
                    <span className="font-mono text-slate-400">120 kcal · 25.0g P</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Fitness Assistant Section */}
      <section className="py-20 border-t border-slate-800/80 bg-[#090C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black mx-auto shadow-xl shadow-emerald-500/20">
            <Sparkles className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            MEET YOUR 24/7 AI COACH
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Stuck on a plateau? Need a quick vegetarian meal idea? Wondering what exercises to swap for shoulder comfort? FitForge's AI Coach reasons over your personal weight, goals, and training history in seconds.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              '“What should I train today?”',
              '“Give me a chest workout.”',
              '“How much protein should I eat?”',
              '“Vegetarian high-protein options?”',
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => setCurrentView('ai-coach')}
                className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={() => setCurrentView('ai-coach')}
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              Consult AI Coach Now
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0C1017]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Athlete Stories</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              PROVEN RESULTS ON THE GYM FLOOR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Rahul Verma',
                role: 'Powerlifter (Bangalore)',
                quote: 'Finally an app that accurately calculates rotis and paneer alongside a hardcore workout tracker. Hit my 100kg bench press target in 8 weeks.',
                stat: '+20 KG Bench Press',
              },
              {
                name: 'Priya Sharma',
                role: 'Fitness Enthusiast (Mumbai)',
                quote: 'The automated rest timer and daily habit streak keep me accountable every morning. The water tracking animation makes drinking 3 liters effortless.',
                stat: '14-Day Consistent Streak',
              },
              {
                name: 'Arjun Nair',
                role: 'Natural Bodybuilder (Delhi)',
                quote: 'FitForge feels like a high-end commercial SaaS, not a messy spreadsheet. The AI coach plateau suggestions helped me unlock my back pull-up numbers.',
                stat: '-6 KG Fat Lost',
              },
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="text-emerald-400 font-mono text-xs font-black bg-emerald-500/10 inline-block px-2.5 py-1 rounded">
                  {t.stat}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{t.quote}"</p>
                <div className="pt-2 border-t border-slate-800/80">
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 border-t border-slate-800/80 bg-[#090C10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Membership Options</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
              INVEST IN YOUR TRANSFORMATION
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Transparent, athlete-first pricing. Full access to Indian nutrition, tracking, and workout logs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free Starter */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Starter Athlete</h4>
                <p className="text-xs text-slate-400">Essential logging for beginners</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black text-white">$0</span>
                  <span className="text-xs text-slate-400">/ forever free</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Basic Workout Tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Exercise Library (500+)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Daily Water Tracker</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Athlete (Featured) */}
            <div className="p-6 rounded-3xl bg-[#0F151E] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">FitForge Pro</h4>
                <p className="text-xs text-emerald-400">Comprehensive power lifter suite</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black text-white">$12</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>All Starter Features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Unlimited Indian Food Database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>24/7 AI Fitness Coach Access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Progressive Overload Analytics & PR Fanfare</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>TDEE & Macro Calculator Engine</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Elite Coach */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">Elite Coach</h4>
                <p className="text-xs text-slate-400">For trainers & multi-athlete rosters</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-display font-black text-white">$29</span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Custom Macro Templates Sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Admin Management Console</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>VIP Priority AI Processing</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => openAuthModal('register')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Choose Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-slate-800/80 bg-[#0B0F16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Got Questions?</span>
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180 text-emerald-400' : 'text-slate-400'
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 border-t border-slate-800/80 bg-gradient-to-b from-[#090C10] to-[#040608] text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-tight">
            READY TO FORGE YOUR ULTIMATE PHYSIQUE?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Join thousands of lifters who left guesswork behind. Sign up now and claim your customized workout and nutrition plan today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openAuthModal('register')}
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-xl shadow-emerald-500/25 cursor-pointer"
            >
              START YOUR FITNESS JOURNEY NOW
            </button>
            <button
              onClick={loginAsDemo}
              className="px-6 py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold uppercase cursor-pointer"
            >
              Instant Demo Access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
