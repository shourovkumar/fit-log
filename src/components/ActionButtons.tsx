'use client';

import { usePlan } from '@/context/PlanContext';
import type { Workout } from '@/types';
import { Bookmark, Check, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

interface ActionButtonsProps {
  workout: Workout;
}

const ActionButtons = ({ workout }: ActionButtonsProps) => {
  const { plan, addToPlan, addToSaved, isInPlan, isInSaved } = usePlan();
  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);

  const handleAddToPlan = () => {
    if (inPlan) {
      toast.info('Already in your plan');
      return;
    }
    if (plan.length >= 5) {
      toast.warning('Plan limit reached (5 max)');
      return;
    }
    addToPlan(workout);
    toast.success(`✅ ${workout.name} added to today's plan`);
  };

  const handleAddToSaved = () => {
    if (inSaved) {
      toast.info('Already saved');
      return;
    }
    addToSaved(workout);
    toast.success(`🔖 ${workout.name} saved for later`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-8">
      <button
        onClick={handleAddToPlan}
        disabled={inPlan}
        className={`flex-1 flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-full transition-colors ${
          inPlan
            ? 'bg-white/10 text-gray-500 cursor-not-allowed'
            : 'bg-[#ccff00] text-black hover:bg-[#b8e600]'
        }`}
      >
        {inPlan ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        {inPlan ? 'Added to plan' : "Add to today's plan"}
      </button>

      <button
        onClick={handleAddToSaved}
        disabled={inSaved}
        className={`flex-1 flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-full transition-colors ${
          inSaved
            ? 'bg-white/10 text-gray-500 cursor-not-allowed border border-transparent'
            : 'border border-white/20 text-white hover:bg-white/5'
        }`}
      >
        <Bookmark className="w-4 h-4" />
        {inSaved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  );
};

export default ActionButtons;
