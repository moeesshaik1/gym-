import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Exercise,
  FoodItem,
  LoggedFoodItem,
  WorkoutPlan,
  WorkoutSession,
  WorkoutSetLog,
  FitnessGoalItem,
  DailyHabitItem,
  AchievementBadge,
  BodyMeasurementRecord,
  WaterEntry,
} from '../types';
import {
  INITIAL_USER_PROFILE,
  EXERCISE_DATABASE,
  INDIAN_FOOD_DATABASE,
  WORKOUT_PLANS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_GOALS,
  INITIAL_HABITS,
  INITIAL_MEASUREMENTS,
  INITIAL_WORKOUT_HISTORY,
} from '../data/mockData';
import { playTimerBeep, playSuccessChime, playPrFanfare } from '../utils/audio';

type ActiveView =
  | 'landing'
  | 'dashboard'
  | 'workouts'
  | 'workout-active'
  | 'exercises'
  | 'nutrition'
  | 'calculators'
  | 'progress'
  | 'goals'
  | 'calendar'
  | 'ai-coach'
  | 'profile'
  | 'admin';

interface RestTimerState {
  active: boolean;
  remainingSec: number;
  totalSec: number;
}

interface FitnessContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  onboardingOpen: boolean;
  currentView: ActiveView;
  globalSearchOpen: boolean;
  selectedExerciseModal: Exercise | null;
  prCelebration: { show: boolean; exerciseName: string; weight: number } | null;

  exercises: Exercise[];
  foodDatabase: FoodItem[];
  workoutPlans: WorkoutPlan[];
  workoutHistory: WorkoutSession[];
  activeSession: WorkoutSession | null;
  loggedFoods: LoggedFoodItem[];
  waterIntakeMl: number;
  waterEntries: WaterEntry[];
  goals: FitnessGoalItem[];
  habits: DailyHabitItem[];
  achievements: AchievementBadge[];
  measurements: BodyMeasurementRecord[];
  restTimer: RestTimerState;

  setCurrentView: (view: ActiveView) => void;
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  setOnboardingOpen: (open: boolean) => void;
  setGlobalSearchOpen: (open: boolean) => void;
  setSelectedExerciseModal: (ex: Exercise | null) => void;
  dismissPrCelebration: () => void;

  login: (email: string, pass: string) => boolean;
  loginAsDemo: () => void;
  register: (data: Partial<UserProfile>) => void;
  logout: () => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  updateProfile: (data: Partial<UserProfile>) => void;

  startWorkout: (plan: WorkoutPlan | null) => void;
  updateSet: (exIdx: number, setIdx: number, weight: number, reps: number) => void;
  completeSet: (exIdx: number, setIdx: number) => void;
  addSetToExercise: (exIdx: number) => void;
  finishActiveWorkout: () => void;
  cancelActiveWorkout: () => void;

  logFood: (food: FoodItem, servings: number, mealType: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner') => void;
  removeLoggedFood: (loggedId: string) => void;
  updateFoodPortion: (loggedId: string, servings: number) => void;
  addCustomFood: (food: Omit<FoodItem, 'id'>) => void;

  addWater: (ml: number) => void;
  resetWater: () => void;

  toggleHabit: (id: string) => void;
  addGoal: (goal: Omit<FitnessGoalItem, 'id' | 'isCompleted'>) => void;
  updateGoalValue: (id: string, newVal: number) => void;
  addMeasurement: (record: Omit<BodyMeasurementRecord, 'id'>) => void;

  startRestTimer: (seconds: number) => void;
  pauseRestTimer: () => void;
  resetRestTimer: () => void;
  applyCalculatedTargets: (calories: number, protein: number, carbs: number, fat: number) => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load local state or initialize
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitforge_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fitforge_authed') === 'true';
  });

  const [currentView, setCurrentView] = useState<ActiveView>(() => {
    return localStorage.getItem('fitforge_authed') === 'true' ? 'dashboard' : 'landing';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);
  const [selectedExerciseModal, setSelectedExerciseModal] = useState<Exercise | null>(null);
  const [prCelebration, setPrCelebration] = useState<{ show: boolean; exerciseName: string; weight: number } | null>(null);

  const [exercises] = useState<Exercise[]>(EXERCISE_DATABASE);
  const [workoutPlans] = useState<WorkoutPlan[]>(WORKOUT_PLANS);

  const [foodDatabase, setFoodDatabase] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem('fitforge_custom_foods');
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        return [...INDIAN_FOOD_DATABASE, ...custom];
      } catch (e) {
        return INDIAN_FOOD_DATABASE;
      }
    }
    return INDIAN_FOOD_DATABASE;
  });

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem('fitforge_workout_history');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUT_HISTORY;
  });

  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(() => {
    const saved = localStorage.getItem('fitforge_active_workout');
    return saved ? JSON.parse(saved) : null;
  });

  const [loggedFoods, setLoggedFoods] = useState<LoggedFoodItem[]>(() => {
    const saved = localStorage.getItem('fitforge_logged_foods');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Pre-seed today with sample logged breakfast & lunch
    const today = new Date().toISOString().split('T')[0];
    return [
      {
        ...INDIAN_FOOD_DATABASE.find(f => f.id === 'food-eggs-whole')!,
        loggedId: 'log-1',
        servings: 3,
        mealType: 'Breakfast',
        date: today,
      },
      {
        ...INDIAN_FOOD_DATABASE.find(f => f.id === 'food-oats-milk')!,
        loggedId: 'log-2',
        servings: 1,
        mealType: 'Breakfast',
        date: today,
      },
      {
        ...INDIAN_FOOD_DATABASE.find(f => f.id === 'food-banana')!,
        loggedId: 'log-3',
        servings: 1,
        mealType: 'Breakfast',
        date: today,
      },
      {
        ...INDIAN_FOOD_DATABASE.find(f => f.id === 'food-chicken-breast')!,
        loggedId: 'log-4',
        servings: 1.5,
        mealType: 'Lunch',
        date: today,
      },
      {
        ...INDIAN_FOOD_DATABASE.find(f => f.id === 'food-rice')!,
        loggedId: 'log-5',
        servings: 1.5,
        mealType: 'Lunch',
        date: today,
      },
      {
        ...INDIAN_FOOD_DATABASE.find(f => f.id === 'food-dal-tadka')!,
        loggedId: 'log-6',
        servings: 1,
        mealType: 'Lunch',
        date: today,
      },
    ];
  });

  const [waterIntakeMl, setWaterIntakeMl] = useState<number>(() => {
    const saved = localStorage.getItem('fitforge_water_ml');
    return saved ? parseInt(saved, 10) : 2300;
  });

  const [waterEntries, setWaterEntries] = useState<WaterEntry[]>([]);

  const [goals, setGoals] = useState<FitnessGoalItem[]>(() => {
    const saved = localStorage.getItem('fitforge_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [habits, setHabits] = useState<DailyHabitItem[]>(() => {
    const saved = localStorage.getItem('fitforge_habits');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem('fitforge_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [measurements, setMeasurements] = useState<BodyMeasurementRecord[]>(() => {
    const saved = localStorage.getItem('fitforge_measurements');
    return saved ? JSON.parse(saved) : INITIAL_MEASUREMENTS;
  });

  const [restTimer, setRestTimer] = useState<RestTimerState>({
    active: false,
    remainingSec: 0,
    totalSec: 0,
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('fitforge_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fitforge_authed', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('fitforge_workout_history', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    if (activeSession) {
      localStorage.setItem('fitforge_active_workout', JSON.stringify(activeSession));
    } else {
      localStorage.removeItem('fitforge_active_workout');
    }
  }, [activeSession]);

  useEffect(() => {
    localStorage.setItem('fitforge_logged_foods', JSON.stringify(loggedFoods));
  }, [loggedFoods]);

  useEffect(() => {
    localStorage.setItem('fitforge_water_ml', waterIntakeMl.toString());
  }, [waterIntakeMl]);

  useEffect(() => {
    localStorage.setItem('fitforge_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('fitforge_habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('fitforge_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('fitforge_measurements', JSON.stringify(measurements));
  }, [measurements]);

  // Rest timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (restTimer.active && restTimer.remainingSec > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (!prev.active) return prev;
          const nextSec = prev.remainingSec - 1;
          if (nextSec <= 3 && nextSec > 0) {
            playTimerBeep(false);
          } else if (nextSec === 0) {
            playTimerBeep(true);
          }
          return {
            ...prev,
            remainingSec: Math.max(0, nextSec),
            active: nextSec > 0,
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [restTimer.active, restTimer.remainingSec]);

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => setAuthModalOpen(false);

  const login = (_email: string, _pass: string) => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    setCurrentView('dashboard');
    return true;
  };

  const loginAsDemo = () => {
    setUser(INITIAL_USER_PROFILE);
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    setCurrentView('dashboard');
    playSuccessChime();
  };

  const register = (data: Partial<UserProfile>) => {
    const updated = {
      ...INITIAL_USER_PROFILE,
      ...data,
      id: `user-${Date.now()}`,
    };
    setUser(updated);
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    setOnboardingOpen(true);
    playSuccessChime();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...data,
    }));
    setOnboardingOpen(false);
    setCurrentView('dashboard');
    playSuccessChime();
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const startWorkout = (plan: WorkoutPlan | null) => {
    let exercisesToLoad = [];
    if (plan) {
      exercisesToLoad = plan.exercises.map(ex => ({
        exerciseId: ex.exerciseId,
        exerciseName: ex.exerciseName,
        muscleGroup: ex.muscleGroup,
        sets: Array.from({ length: ex.targetSets }).map((_, i) => ({
          setNumber: i + 1,
          weightKg: ex.targetWeightKg || 60,
          reps: parseInt(ex.targetReps.split('–')[0]) || 10,
          completed: false,
        })),
      }));
    } else {
      // Default chest & triceps session
      exercisesToLoad = [
        {
          exerciseId: 'ex-1',
          exerciseName: 'Barbell Bench Press',
          muscleGroup: 'Chest' as const,
          sets: [
            { setNumber: 1, weightKg: 80, reps: 10, completed: false },
            { setNumber: 2, weightKg: 80, reps: 10, completed: false },
            { setNumber: 3, weightKg: 85, reps: 8, completed: false },
            { setNumber: 4, weightKg: 85, reps: 6, completed: false },
          ],
        },
        {
          exerciseId: 'ex-2',
          exerciseName: 'Incline Dumbbell Press',
          muscleGroup: 'Chest' as const,
          sets: [
            { setNumber: 1, weightKg: 28, reps: 12, completed: false },
            { setNumber: 2, weightKg: 28, reps: 10, completed: false },
            { setNumber: 3, weightKg: 30, reps: 8, completed: false },
          ],
        },
        {
          exerciseId: 'ex-9',
          exerciseName: 'Cable Tricep Pushdown',
          muscleGroup: 'Triceps' as const,
          sets: [
            { setNumber: 1, weightKg: 30, reps: 15, completed: false },
            { setNumber: 2, weightKg: 32.5, reps: 12, completed: false },
            { setNumber: 3, weightKg: 35, reps: 10, completed: false },
          ],
        },
      ];
    }

    const session: WorkoutSession = {
      id: `session-${Date.now()}`,
      planId: plan ? plan.id : 'custom-workout',
      planTitle: plan ? plan.title : 'Chest + Triceps Power',
      date: new Date().toISOString().split('T')[0],
      startTime: Date.now(),
      durationMinutes: 0,
      exercises: exercisesToLoad,
      totalVolumeKg: 0,
      caloriesBurned: 0,
    };

    setActiveSession(session);
    setCurrentView('workout-active');
  };

  const updateSet = (exIdx: number, setIdx: number, weight: number, reps: number) => {
    if (!activeSession) return;
    const nextExercises = [...activeSession.exercises];
    const targetSet = nextExercises[exIdx].sets[setIdx];
    targetSet.weightKg = weight;
    targetSet.reps = reps;
    setActiveSession({ ...activeSession, exercises: nextExercises });
  };

  const completeSet = (exIdx: number, setIdx: number) => {
    if (!activeSession) return;
    const nextExercises = [...activeSession.exercises];
    const targetSet = nextExercises[exIdx].sets[setIdx];
    const wasCompleted = targetSet.completed;
    targetSet.completed = !wasCompleted;

    if (!wasCompleted) {
      playSuccessChime();

      // Check if PR (e.g. bench press >= 85kg or high weight)
      if (
        nextExercises[exIdx].exerciseName.includes('Bench Press') &&
        targetSet.weightKg >= 85
      ) {
        targetSet.isPR = true;
        setPrCelebration({
          show: true,
          exerciseName: nextExercises[exIdx].exerciseName,
          weight: targetSet.weightKg,
        });
        playPrFanfare();
      }

      // Auto start 90s rest timer
      startRestTimer(90);
    }

    // Recalculate total volume
    let totalVol = 0;
    nextExercises.forEach(ex => {
      ex.sets.forEach(st => {
        if (st.completed) {
          totalVol += st.weightKg * st.reps;
        }
      });
    });

    setActiveSession({
      ...activeSession,
      exercises: nextExercises,
      totalVolumeKg: totalVol,
      caloriesBurned: Math.round(totalVol * 0.08) + 80,
    });
  };

  const addSetToExercise = (exIdx: number) => {
    if (!activeSession) return;
    const nextExercises = [...activeSession.exercises];
    const sets = nextExercises[exIdx].sets;
    const lastSet = sets[sets.length - 1] || { weightKg: 60, reps: 10 };
    sets.push({
      setNumber: sets.length + 1,
      weightKg: lastSet.weightKg,
      reps: lastSet.reps,
      completed: false,
    });
    setActiveSession({ ...activeSession, exercises: nextExercises });
  };

  const finishActiveWorkout = () => {
    if (!activeSession) return;
    const duration = Math.max(15, Math.round((Date.now() - activeSession.startTime) / 60000));
    const completedSession: WorkoutSession = {
      ...activeSession,
      endTime: Date.now(),
      durationMinutes: duration,
      prAchieved: activeSession.exercises.some(ex => ex.sets.some(s => s.isPR)),
    };

    setWorkoutHistory(prev => [completedSession, ...prev]);
    setActiveSession(null);

    // Increase streak if first workout today
    setUser(prev => ({
      ...prev,
      streak: prev.streak + 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    }));

    // Unlock workout habit
    setHabits(prev =>
      prev.map(h => (h.id === 'hab-1' ? { ...h, completed: true } : h))
    );

    playSuccessChime();
    setCurrentView('dashboard');
  };

  const cancelActiveWorkout = () => {
    setActiveSession(null);
    setCurrentView('dashboard');
  };

  const logFood = (
    food: FoodItem,
    servings: number,
    mealType: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'
  ) => {
    const entry: LoggedFoodItem = {
      ...food,
      loggedId: `log-${Date.now()}`,
      servings,
      mealType,
      date: new Date().toISOString().split('T')[0],
    };
    setLoggedFoods(prev => [entry, ...prev]);
    playSuccessChime();
  };

  const removeLoggedFood = (loggedId: string) => {
    setLoggedFoods(prev => prev.filter(f => f.loggedId !== loggedId));
  };

  const updateFoodPortion = (loggedId: string, servings: number) => {
    setLoggedFoods(prev =>
      prev.map(f => (f.loggedId === loggedId ? { ...f, servings } : f))
    );
  };

  const addCustomFood = (foodData: Omit<FoodItem, 'id'>) => {
    const newFood: FoodItem = {
      ...foodData,
      id: `custom-food-${Date.now()}`,
      category: 'Custom',
    };
    setFoodDatabase(prev => [newFood, ...prev]);
    const saved = localStorage.getItem('fitforge_custom_foods');
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem('fitforge_custom_foods', JSON.stringify([newFood, ...existing]));
  };

  const addWater = (ml: number) => {
    setWaterIntakeMl(prev => {
      const next = prev + ml;
      if (next >= user.waterTarget * 1000) {
        setHabits(hPrev =>
          hPrev.map(h => (h.id === 'hab-2' ? { ...h, completed: true } : h))
        );
      }
      return next;
    });
    setWaterEntries(prev => [
      { id: `w-${Date.now()}`, amountMl: ml, timestamp: Date.now() },
      ...prev,
    ]);
  };

  const resetWater = () => {
    setWaterIntakeMl(0);
    setWaterEntries([]);
  };

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const addGoal = (goalData: Omit<FitnessGoalItem, 'id' | 'isCompleted'>) => {
    const newGoal: FitnessGoalItem = {
      ...goalData,
      id: `goal-${Date.now()}`,
      isCompleted: goalData.currentValue >= goalData.targetValue,
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const updateGoalValue = (id: string, newVal: number) => {
    setGoals(prev =>
      prev.map(g =>
        g.id === id
          ? {
              ...g,
              currentValue: newVal,
              isCompleted: newVal >= g.targetValue,
            }
          : g
      )
    );
  };

  const addMeasurement = (record: Omit<BodyMeasurementRecord, 'id'>) => {
    const newRecord: BodyMeasurementRecord = {
      ...record,
      id: `meas-${Date.now()}`,
    };
    setMeasurements(prev => [...prev, newRecord]);
    if (record.weightKg) {
      setUser(u => ({ ...u, weight: record.weightKg }));
    }
    playSuccessChime();
  };

  const startRestTimer = (seconds: number) => {
    setRestTimer({
      active: true,
      remainingSec: seconds,
      totalSec: seconds,
    });
  };

  const pauseRestTimer = () => {
    setRestTimer(prev => ({ ...prev, active: !prev.active }));
  };

  const resetRestTimer = () => {
    setRestTimer({ active: false, remainingSec: 0, totalSec: 0 });
  };

  const applyCalculatedTargets = (
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ) => {
    setUser(prev => ({
      ...prev,
      calorieTarget: Math.round(calories),
      proteinTarget: Math.round(protein),
      carbsTarget: Math.round(carbs),
      fatTarget: Math.round(fat),
    }));
    playSuccessChime();
  };

  const dismissPrCelebration = () => setPrCelebration(null);

  return (
    <FitnessContext.Provider
      value={{
        user,
        isAuthenticated,
        authModalOpen,
        authModalMode,
        onboardingOpen,
        currentView,
        globalSearchOpen,
        selectedExerciseModal,
        prCelebration,
        exercises,
        foodDatabase,
        workoutPlans,
        workoutHistory,
        activeSession,
        loggedFoods,
        waterIntakeMl,
        waterEntries,
        goals,
        habits,
        achievements,
        measurements,
        restTimer,
        setCurrentView,
        openAuthModal,
        closeAuthModal,
        setOnboardingOpen,
        setGlobalSearchOpen,
        setSelectedExerciseModal,
        dismissPrCelebration,
        login,
        loginAsDemo,
        register,
        logout,
        completeOnboarding,
        updateProfile,
        startWorkout,
        updateSet,
        completeSet,
        addSetToExercise,
        finishActiveWorkout,
        cancelActiveWorkout,
        logFood,
        removeLoggedFood,
        updateFoodPortion,
        addCustomFood,
        addWater,
        resetWater,
        toggleHabit,
        addGoal,
        updateGoalValue,
        addMeasurement,
        startRestTimer,
        pauseRestTimer,
        resetRestTimer,
        applyCalculatedTargets,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
