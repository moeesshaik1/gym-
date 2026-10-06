import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getCoachingFallback(message: string, profile: any, hasMedicalConcern: boolean): string {
  if (hasMedicalConcern) {
    return `⚠️ **Health & Safety Notice**\n\nIt sounds like you may be experiencing severe symptoms or pain. As an athletic coach, I cannot diagnose medical conditions, injuries, or prescribe medical treatments. Please have this assessed by a doctor, orthopedist, or qualified physical therapist.\n\nIn the meantime, discontinue any movements that elicit sharp discomfort, focus on gentle rest and adequate hydration, and prioritize your long-term health!`;
  }

  const query = message.toLowerCase();
  const name = profile?.name || 'Athlete';
  const goal = profile?.goal || 'Muscle Gain';
  const diet = profile?.diet || 'Non-Vegetarian';

  if (query.includes('chest') || query.includes('push')) {
    return `### 🔥 Targeted Chest & Triceps Blast for ${name}\n\nTo drive hypertrophy and progressive overload for your **${goal}** objective:\n\n1. **Flat Barbell Bench Press** — 4 sets × 6–8 reps (Focus on 2-second controlled eccentric)\n2. **Incline Dumbbell Press (30°)** — 3 sets × 8–10 reps (Upper clavicular emphasis)\n3. **Dips or Weighted Push-Ups** — 3 sets × 10–12 reps\n4. **Standing Cable Flyes / Pec Deck** — 3 sets × 12–15 reps (Peak contraction hold)\n5. **Overhead Rope Tricep Extension** — 4 sets × 10–12 reps\n\n💡 *Coach Tip:* Keep your shoulder blades retracted and pinned down into the bench throughout the movement to protect your rotator cuffs.`;
  }

  if (query.includes('protein') || query.includes('eat') || query.includes('diet') || query.includes('food')) {
    const isVeg = diet.toLowerCase().includes('veg');
    return `### 🥗 Nutrition Strategy for ${goal}\n\nFor optimal recovery and muscle protein synthesis, aim for **1.8g to 2.2g of protein per kg of bodyweight** daily.\n\n${
      isVeg
        ? `**Top High-Protein Sources (${diet}):**\n- **Paneer (Low-Fat):** 18-20g protein per 100g\n- **Soya Chunks:** 52g protein per 100g (dry weight)\n- **Greek Yogurt / Hung Curd:** 15-20g per cup\n- **Sprouts & Dal (Moong/Rajma/Chole):** Pair with brown rice for complete amino acid profiles\n- **Whey / Plant Protein isolate:** 24-27g per scoop`
        : `**Top High-Protein Sources:**\n- **Chicken Breast:** 31g protein per 100g\n- **Whole Eggs & Egg Whites:** 6g per whole egg, 3.6g per white\n- **Paneer / Curd:** 18g per 100g\n- **Fish (Tilapia, Salmon, Rohu):** 22-26g per 100g\n- **Lentils & Dal:** Great complementary source with fiber`
    }\n\n💡 *Post-Workout Window:* Consume 25-35g of fast-digesting protein with 30-50g of complex carbohydrates within 60-90 minutes post-training to replenish glycogen!`;
  }

  if (query.includes('progress') || query.includes('plateau') || query.includes('stuck')) {
    return `### 📈 Breaking Through Your Training Plateau\n\nIf your numbers or weight have stalled, check these 4 critical variables:\n\n1. **Sleep & Recovery:** Are you logging 7.5–8.5 hours of quality deep sleep? Growth hormone peaks during deep REM.\n2. **Micro-Increments:** Rather than jumping 5kg, try 1.25kg fractional plates on compound lifts.\n3. **Caloric Surplus/Deficit Adherence:** Ensure your daily tracking accounts for cooking oils and condiments.\n4. **Deload Week:** If you've trained at RPE 8-10 for 6+ consecutive weeks, reduce volume by 40% for 5-7 days to let joint systemic fatigue dissipate.`;
  }

  if (query.includes('today') || query.includes('train')) {
    return `### ⚡ Recommendation for Today\n\nBased on your **${goal}** path, focus on your primary scheduled compound lifts:\n- Warm up with 5 mins dynamic mobility + band pull-aparts\n- Complete 3 warm-up sets building up to your working weight\n- Log every set in your FitForge Tracker\n- Drink at least 500ml of water during your session\n\nReady to get after it, ${name}? Open the Workout Tracker and let's set a new Personal Record! 🔥`;
  }

  return `### FitForge Performance Insights for ${name}\n\nGreat question regarding your **${goal}** protocol!\n\n- **Training Rule:** Focus on progressive overload—gradually adding reps, weight, or slowing tempo on compound movements.\n- **Recovery & Hydration:** Keep your water intake around 3.0–3.5 liters per day to sustain muscle fullness and intracellular hydration.\n- **Consistency:** Consistency beats intensity every single time. 4 structured workouts done every week consistently outperforms erratic sessions.\n\nAsk me anytime for specific exercise mechanics, recipe suggestions, or plateau-busting routines!`;
}

function getSampleGeneratedPlan(goal: string, experience: string, daysPerWeek: number, diet: string) {
  const daysCount = daysPerWeek || 4;
  const isVeg = (diet || '').toLowerCase().includes('veg');

  const days = [
    {
      dayName: 'Day 1 (Monday)',
      focus: 'Chest & Triceps Hypertrophy',
      exercises: [
        { name: 'Barbell Flat Bench Press', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', rest: '75s' },
        { name: 'Cable Chest Flyes', sets: '3', reps: '12-15', rest: '60s' },
        { name: 'Tricep Rope Pushdowns', sets: '4', reps: '12-15', rest: '60s' },
        { name: 'Overhead Dumbbell Tricep Extension', sets: '3', reps: '10-12', rest: '60s' }
      ]
    },
    {
      dayName: 'Day 2 (Tuesday)',
      focus: 'Back & Biceps Power',
      exercises: [
        { name: 'Barbell Deadlift / Romanian Deadlift', sets: '4', reps: '6-8', rest: '120s' },
        { name: 'Wide-Grip Lat Pulldown', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Seated Cable Row', sets: '3', reps: '10-12', rest: '75s' },
        { name: 'Barbell Bicep Curl', sets: '4', reps: '8-10', rest: '60s' },
        { name: 'Incline Dumbbell Hammer Curl', sets: '3', reps: '12-15', rest: '60s' }
      ]
    },
    {
      dayName: 'Day 3 (Thursday)',
      focus: 'Legs & Core Foundation',
      exercises: [
        { name: 'Barbell Back Squat', sets: '4', reps: '6-8', rest: '120s' },
        { name: 'Leg Press (45°)', sets: '3', reps: '10-12', rest: '90s' },
        { name: 'Lying Hamstring Leg Curl', sets: '4', reps: '10-12', rest: '60s' },
        { name: 'Standing Calf Raise', sets: '4', reps: '15-20', rest: '45s' },
        { name: 'Hanging Leg Raises & Planks', sets: '3', reps: '15 reps / 60s', rest: '45s' }
      ]
    },
    {
      dayName: 'Day 4 (Friday)',
      focus: 'Shoulders & Arms Finish',
      exercises: [
        { name: 'Standing Overhead Barbell Press', sets: '4', reps: '8-10', rest: '90s' },
        { name: 'Dumbbell Lateral Raises (Strict)', sets: '4', reps: '12-15', rest: '60s' },
        { name: 'Rear Delt Face Pulls', sets: '4', reps: '15-20', rest: '60s' },
        { name: 'EZ-Bar Skull Crushers', sets: '3', reps: '10-12', rest: '60s' },
        { name: 'Preacher Bicep Curl', sets: '3', reps: '10-12', rest: '60s' }
      ]
    }
  ].slice(0, Math.min(daysCount, 4));

  return {
    planTitle: `FitForge ${goal || 'Athletic'} Elite ${daysCount}-Day Protocol`,
    summary: `Engineered specifically for ${experience || 'Intermediate'} level lifters aiming for maximum muscle stimulation with strategic rest intervals.`,
    days,
    nutritionHighlights: [
      `Consume 1.8g - 2.2g of protein per kg bodyweight.`,
      isVeg ? `Incorporate paneer, soya chunks, Greek yogurt and lentil/rice complete proteins.` : `Incorporate lean chicken breast, whole eggs, fish, and cottage cheese.`,
      `Stay hydrated with 3.0L - 3.5L of water daily, adding electrolytes on heavy training days.`,
      `Keep post-workout carbs within 60 minutes to rapidly restore muscle glycogen.`
    ]
  };
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Init Gemini
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGemini: !!ai });
  });

  app.post('/api/ai/coach', async (req, res) => {
    try {
      const { message, profile } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const lower = message.toLowerCase();
      const medicalKeywords = ['fracture', 'tear', 'dislocated', 'sharp chest pain', 'hernia', 'severe dizziness', 'anorexia', 'bulimia'];
      const hasMedicalConcern = medicalKeywords.some(k => lower.includes(k));

      if (ai) {
        const systemInstruction = `You are FitForge's elite AI Fitness & Nutrition Coach.
You provide precise, evidence-based training advice, workout adjustments, nutrition recommendations, and motivation.
User Profile:
- Name: ${profile?.name || 'Athlete'}
- Goal: ${profile?.goal || 'General Fitness'}
- Experience: ${profile?.experience || 'Intermediate'}
- Weight: ${profile?.weight || 72} kg, Height: ${profile?.height || 175} cm
- Diet: ${profile?.diet || 'Non-Vegetarian'}
- Training Location: ${profile?.trainingLocation || 'Gym'}

CRITICAL SAFETY DIRECTIVE:
You are NOT a doctor or medical professional. If the user asks about acute injuries, medical diagnoses, eating disorders, severe pain, or prescription medications, explicitly advise them to consult a licensed physician or physical therapist immediately, while keeping advice strictly to safe, non-medical general fitness principles.
Keep responses concise, formatted cleanly with markdown bullet points and bold highlights.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction,
          },
        });

        return res.json({ text: response.text });
      } else {
        const text = getCoachingFallback(message, profile, hasMedicalConcern);
        return res.json({ text });
      }
    } catch (err: any) {
      console.error('AI Coach Error:', err);
      const fallback = getCoachingFallback(req.body.message || '', req.body.profile, false);
      return res.json({ text: fallback });
    }
  });

  app.post('/api/ai/generate-plan', async (req, res) => {
    try {
      const { goal, experience, daysPerWeek, duration, equipment, dietPreference, calories } = req.body;
      if (ai) {
        const prompt = `Generate a structured weekly workout split and high-protein nutrition recommendations for:
Goal: ${goal}
Experience: ${experience}
Days per week: ${daysPerWeek}
Duration: ${duration} mins
Equipment: ${equipment}
Diet: ${dietPreference}
Target Calories: ${calories || 2200} kcal

Return strictly valid JSON with this schema:
{
  "planTitle": "string",
  "summary": "string",
  "days": [
    {
      "dayName": "string",
      "focus": "string",
      "exercises": [
        {"name": "string", "sets": "string", "reps": "string", "rest": "string"}
      ]
    }
  ],
  "nutritionHighlights": ["string"]
}`;
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        const parsed = JSON.parse(response.text || '{}');
        return res.json({ plan: parsed });
      } else {
        return res.json({ plan: getSampleGeneratedPlan(goal, experience, daysPerWeek, dietPreference) });
      }
    } catch (err: any) {
      console.error('Plan generation error:', err);
      return res.json({ plan: getSampleGeneratedPlan(req.body.goal, req.body.experience, req.body.daysPerWeek, req.body.dietPreference) });
    }
  });

  // Setup Vite dev server or static files
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FitForge Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
