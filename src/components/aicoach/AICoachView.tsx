import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Dumbbell,
  Apple,
  ShieldAlert,
  Loader2,
  Layers,
  CheckCircle2,
  ArrowRight,
  User,
  Bot,
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AICoachView: React.FC = () => {
  const { user } = useFitness();

  const [activeTab, setActiveTab] = useState<'chat' | 'generator'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: `Greetings, ${user.name}! I am your dedicated FitForge AI Coach. I have your profile calibrated for **${user.goal}** at **${user.weight} kg** with a **${user.diet}** protocol.\n\nAsk me about workout adjustments, breaking through plateaus, Indian recipe protein ideas, or tap any of the prompts below!`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  // Generator State
  const [genGoal, setGenGoal] = useState(user.goal);
  const [genExperience, setGenExperience] = useState(user.experience);
  const [genDays, setGenDays] = useState(user.trainingDaysPerWeek || 4);
  const [genDuration, setGenDuration] = useState(60);
  const [genDiet, setGenDiet] = useState(user.diet);
  const [genLoading, setGenLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const suggestedQuestions = [
    'What should I train today?',
    'Give me a chest workout.',
    'What should I eat after workout?',
    'How much protein should I eat?',
    'Give me a vegetarian high-protein meal.',
    'Why am I not progressing on bench press?',
  ];

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || inputMessage).trim();
    if (!text || loadingChat) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoadingChat(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          profile: user,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: data.text || 'Unable to generate coach response. Please try again.',
        timestamp: 'Now',
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: `### FitForge Performance Insights\n\nFor **${user.goal}**, focus on progressive overload across compound lifts (Bench, Squat, Deadlift, Overhead Press). Ensure you hit **${user.proteinTarget}g of protein** and drink **${user.waterTarget}L of water** daily.`,
        timestamp: 'Now',
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleGeneratePlan = async () => {
    setGenLoading(true);
    try {
      const res = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: genGoal,
          experience: genExperience,
          daysPerWeek: genDays,
          duration: genDuration,
          equipment: user.equipment.join(', '),
          dietPreference: genDiet,
          calories: user.calorieTarget,
        }),
      });

      const data = await res.json();
      setGeneratedPlan(data.plan);
    } catch (err) {
      console.error(err);
    } finally {
      setGenLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Intelligent Coaching Suite</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white mt-1">
            FITFORGE AI COACH & GENERATOR
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personalized exercise mechanics, nutrition planning, and custom periodized routine architect.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coaching Assistant
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-xl font-bold transition-colors cursor-pointer ${
              activeTab === 'generator'
                ? 'bg-emerald-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Custom Plan Architect
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Safety Advisory:</strong> FitForge AI Coach provides sports science education and training guidance. It does not provide medical diagnoses, physical therapy for acute tears or fractures, or clinical treatment for eating disorders. For injuries or severe symptoms, please consult a physician.
        </p>
      </div>

      {activeTab === 'chat' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Chat Stream */}
          <div className="lg:col-span-8 flex flex-col h-[650px] rounded-3xl bg-[#0D1219] border border-slate-800 overflow-hidden shadow-2xl">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500 text-black font-bold text-xs'
                        : 'bg-slate-800 text-emerald-400'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="prose prose-invert max-w-none text-xs whitespace-pre-line">
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-2 block text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loadingChat && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                    <span>Coach is analyzing training metrics...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Chips Bar */}
            <div className="px-6 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 hover:text-emerald-400 border border-slate-800 whitespace-nowrap transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask about workout adjustments, protein sources, plateau breaking..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSend()}
                disabled={loadingChat || !inputMessage.trim()}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Athlete Profile Context Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Coach Context Profile
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Athlete Name</span>
                  <span className="text-white font-bold">{user.name}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Primary Goal</span>
                  <span className="text-emerald-400 font-bold">{user.goal}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Weight & Height</span>
                  <span className="text-white font-mono">{user.weight} kg · {user.height} cm</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Dietary Style</span>
                  <span className="text-white">{user.diet}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Training Frequency</span>
                  <span className="text-white font-mono">{user.trainingDaysPerWeek || 5} days/week</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Consistency Streak</span>
                  <span className="text-amber-400 font-bold font-mono">🔥 {user.streak} Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Personalized Generator View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Configure Plan Architecture</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Goal</label>
              <select
                value={genGoal}
                onChange={e => setGenGoal(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="Muscle Gain">Muscle Gain (Hypertrophy)</option>
                <option value="Fat Loss">Fat Loss & Conditioning</option>
                <option value="Strength">Max Strength & Powerlifting</option>
                <option value="General Fitness">General Fitness & Longevity</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Days / Week</label>
                <select
                  value={genDays}
                  onChange={e => setGenDays(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value={3}>3 Days Split</option>
                  <option value={4}>4 Days Split</option>
                  <option value={5}>5 Days Split</option>
                  <option value={6}>6 Days Push/Pull/Legs</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Session Duration</label>
                <select
                  value={genDuration}
                  onChange={e => setGenDuration(parseInt(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value={45}>45 Minutes</option>
                  <option value={60}>60 Minutes</option>
                  <option value={75}>75 Minutes</option>
                  <option value={90}>90 Minutes</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Diet Preference</label>
              <select
                value={genDiet}
                onChange={e => setGenDiet(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="Vegetarian">Vegetarian (Indian Staples)</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegan">Vegan (Plant Based)</option>
                <option value="Eggetarian">Eggetarian</option>
              </select>
            </div>

            <button
              onClick={handleGeneratePlan}
              disabled={genLoading}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {genLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Protocol...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Customized Protocol</span>
                </>
              )}
            </button>
          </div>

          {/* Plan Output */}
          <div className="lg:col-span-7 space-y-6">
            {generatedPlan ? (
              <div className="p-6 rounded-3xl bg-[#0D1219] border border-slate-800 space-y-6 animate-in fade-in">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Generated Routine
                  </span>
                  <h3 className="text-2xl font-display font-black text-white mt-1">
                    {generatedPlan.planTitle}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {generatedPlan.summary}
                  </p>
                </div>

                {/* Days */}
                <div className="space-y-4">
                  {generatedPlan.days?.map((d: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{d.dayName}</span>
                        <span className="text-emerald-400 uppercase">{d.focus}</span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-300">
                        {d.exercises?.map((ex: any, exI: number) => (
                          <div
                            key={exI}
                            className="p-2 rounded-lg bg-slate-950/60 flex items-center justify-between text-[11px]"
                          >
                            <span className="font-medium text-white">{ex.name}</span>
                            <span className="font-mono text-slate-400">
                              {ex.sets} sets × {ex.reps} (Rest: {ex.rest})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Nutrition Highlights */}
                {generatedPlan.nutritionHighlights && (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Dietary Directives
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {generatedPlan.nutritionHighlights.map((tip: string, tI: number) => (
                        <li key={tI} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-[#0D1219] border border-slate-800 text-center text-slate-400 space-y-3">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">No Protocol Generated Yet</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Adjust your parameters on the left and tap 'Generate Customized Protocol' to architect a periodized weekly schedule.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
