/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FitnessProvider, useFitness } from './context/FitnessContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileNav } from './components/common/MobileNav';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ExerciseDetailModal } from './components/common/ExerciseDetailModal';
import { PrCelebrationModal } from './components/common/PrCelebrationModal';
import { RestTimerBar } from './components/common/RestTimerBar';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { DashboardView } from './components/dashboard/DashboardView';
import { WorkoutListView } from './components/workouts/WorkoutListView';
import { ActiveWorkoutTracker } from './components/workouts/ActiveWorkoutTracker';
import { ExerciseLibraryView } from './components/exercises/ExerciseLibraryView';
import { NutritionView } from './components/nutrition/NutritionView';
import { CalculatorView } from './components/calculators/CalculatorView';
import { ProgressView } from './components/progress/ProgressView';
import { GoalsHabitsView } from './components/goals/GoalsHabitsView';
import { CalendarView } from './components/calendar/CalendarView';
import { AICoachView } from './components/aicoach/AICoachView';
import { ProfileSettingsView } from './components/profile/ProfileSettingsView';
import { AdminView } from './components/admin/AdminView';

const MainContent: React.FC = () => {
  const { currentView } = useFitness();

  return (
    <div className="min-h-screen flex flex-col bg-[#090C10] text-slate-100 pb-16 lg:pb-0">
      <Header />

      <main className="flex-1">
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'workouts' && <WorkoutListView />}
        {currentView === 'workout-active' && <ActiveWorkoutTracker />}
        {currentView === 'exercises' && <ExerciseLibraryView />}
        {currentView === 'nutrition' && <NutritionView />}
        {currentView === 'calculators' && <CalculatorView />}
        {currentView === 'progress' && <ProgressView />}
        {currentView === 'goals' && <GoalsHabitsView />}
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'ai-coach' && <AICoachView />}
        {currentView === 'profile' && <ProfileSettingsView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      <Footer />
      <MobileNav />

      {/* Global Modals & Persistent Widgets */}
      <AuthModal />
      <OnboardingModal />
      <GlobalSearchModal />
      <ExerciseDetailModal />
      <PrCelebrationModal />
      <RestTimerBar />
    </div>
  );
};

export default function App() {
  return (
    <FitnessProvider>
      <MainContent />
    </FitnessProvider>
  );
}
