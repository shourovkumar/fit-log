'use client';

import type { Workout } from '@/types';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  addToSaved: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    const storedPlan = localStorage.getItem('fitlog-plan');
    const storedSaved = localStorage.getItem('fitlog-saved');
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    setMounted(true);
  }, []);

  
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('fitlog-plan', JSON.stringify(plan));
      localStorage.setItem('fitlog-saved', JSON.stringify(saved));
    }
  }, [plan, saved, mounted]);

  const addToPlan = (workout: Workout): boolean => {
    if (plan.find((w) => w.id === workout.id)) return false;
    setPlan([...plan, workout]);
    return true;
  };

  const addToSaved = (workout: Workout): boolean => {
    if (saved.find((w) => w.id === workout.id)) return false;
    setSaved([...saved, workout]);
    return true;
  };

  const removeFromPlan = (id: number) => {
    setPlan(plan.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved(saved.filter((w) => w.id !== id));
  };

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error('usePlan must be used within PlanProvider');
  return context;
}
