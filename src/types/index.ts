export type FitnessGoal =
  | 'Muscle Gain'
  | 'Fat Loss'
  | 'Weight Loss'
  | 'Strength'
  | 'Endurance'
  | 'General Fitness'
  | 'Maintenance';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TrainingLocation = 'Gym' | 'Home' | 'Outdoor';
export type DietPreference = 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Eggetarian' | 'Custom';
export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Biceps'
  | 'Triceps'
  | 'Legs'
  | 'Abs'
  | 'Cardio'
  | 'Full Body';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // in cm
  weight: number; // in kg
  goal: FitnessGoal;
  activityLevel: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active' | 'Extremely Active';
  experience: ExperienceLevel;
  trainingDaysPerWeek: number;
  workoutDuration: number; // minutes
  trainingLocation: TrainingLocation;
  equipment: string[];
  diet: DietPreference;
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  waterTarget: number; // in Liters
  unitPreference: 'metric' | 'imperial';
  streak: number;
  lastActiveDate: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles?: string[];
  equipment: string;
  difficulty: ExperienceLevel;
  imageUrl: string;
  instructions: string[];
  commonMistakes: string[];
  safetyTips: string;
  recommendedSets: string;
  recommendedReps: string;
  restSec: number;
  estimatedCaloriesPerMin: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  targetSets: number;
  targetReps: string;
  targetWeightKg?: number;
  restSec: number;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  category: MuscleGroup;
  difficulty: ExperienceLevel;
  durationMinutes: number;
  estimatedCalories: number;
  description: string;
  imageUrl: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutSetLog {
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  isPR?: boolean;
}

export interface WorkoutSessionExercise {
  exerciseId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  sets: WorkoutSetLog[];
}

export interface WorkoutSession {
  id: string;
  planId?: string;
  planTitle: string;
  date: string;
  startTime: number;
  endTime?: number;
  durationMinutes: number;
  exercises: WorkoutSessionExercise[];
  totalVolumeKg: number;
  caloriesBurned: number;
  notes?: string;
  prAchieved?: boolean;
}

export interface FoodItem {
  id: string;
  name: string;
  hindiName?: string;
  category: 'Indian Staples' | 'Proteins' | 'Dairy' | 'Grains' | 'Fruits & Veg' | 'Snacks' | 'Custom';
  servingSizeGrams: number;
  servingLabel: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  isVeg: boolean;
}

export interface LoggedFoodItem extends FoodItem {
  loggedId: string;
  servings: number; // multiplier of servingSizeGrams
  mealType: 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';
  date: string;
}

export interface WaterEntry {
  id: string;
  amountMl: number;
  timestamp: number;
}

export interface DailyHydration {
  date: string;
  totalMl: number;
  entries: WaterEntry[];
}

export interface BodyMeasurementRecord {
  id: string;
  date: string;
  weightKg: number;
  chestCm?: number;
  waistCm?: number;
  armsCm?: number;
  thighsCm?: number;
  notes?: string;
}

export interface FitnessGoalItem {
  id: string;
  title: string;
  category: 'Weight' | 'Strength' | 'Endurance' | 'Habit';
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline?: string;
  isCompleted: boolean;
}

export interface DailyHabitItem {
  id: string;
  title: string;
  icon: string;
  targetLabel: string;
  completed: boolean;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
