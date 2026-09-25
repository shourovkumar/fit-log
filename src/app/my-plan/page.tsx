'use client';

import SearchBar from '@/components/SearchBar';
import { usePlan } from '@/context/PlanContext';
import type { Workout } from '@/types';
import { ArrowRight, Check, Clock, Flame, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Tab = 'plan' | 'saved';
type SortOption = 'duration' | 'calories' | 'rating';

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<Tab>('plan');
  const [sortBy, setSortBy] = useState<SortOption>('duration');
  const [searchQuery, setSearchQuery] = useState('');

  const currentList = activeTab === 'plan' ? plan : saved;

  const filteredList = currentList.filter((workout) => {
    const query = searchQuery.toLowerCase();
    return (
      workout.name.toLowerCase().includes(query) ||
      workout.muscleGroups.some((group) => group.toLowerCase().includes(query))
    );
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'calories') return a.caloriesBurned - b.caloriesBurned;
    return b.rating - a.rating;
  });

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = currentList.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleRemove = (id: number, name: string) => {
    if (activeTab === 'plan') removeFromPlan(id);
    else removeFromSaved(id);
    toast.error(`❌ ${name} removed`);
  };

  const handleMarkDone = (name: string, id: number) => {
    toast.success(`✅ ${name} marked as done`);
    removeFromPlan(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <h1 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
        My Plan
      </h1>
      <p className="text-gray-400 mt-2">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-8 border border-white/10 rounded-xl p-6">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-wider">Exercises</p>
          <p className="text-[#ccff00] font-oswald text-4xl md:text-5xl font-bold mt-1">
            {totalExercises}
          </p>
        </div>
        <div className="border-l border-white/10 pl-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Minutes</p>
          <p className="text-white font-oswald text-4xl md:text-5xl font-bold mt-1">
            {totalMinutes}
          </p>
        </div>
        <div className="border-l border-white/10 pl-4">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Calories</p>
          <p className="text-white font-oswald text-4xl md:text-5xl font-bold mt-1">
            {totalCalories}
          </p>
        </div>
      </div>

      {/* Tabs + Search + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
        <div className="inline-flex bg-white/5 rounded-full p-1">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'plan' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Today's Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === 'saved' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search workouts..."
          />
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-white text-sm outline-none cursor-pointer"
            >
              <option value="duration" className="bg-[#1a1a1a]">Duration</option>
              <option value="calories" className="bg-[#1a1a1a]">Calories</option>
              <option value="rating" className="bg-[#1a1a1a]">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      {sortedList.length === 0 ? (
        <div className="mt-8 border-2 border-dashed border-white/10 rounded-xl py-20 text-center">
          <h3 className="font-oswald text-2xl font-bold uppercase text-white">
            {searchQuery ? 'No results found' : 'Nothing here yet'}
          </h3>
          <p className="text-gray-500 mt-2">
            {searchQuery
              ? `No workouts match "${searchQuery}". Try a different search.`
              : 'Browse the library and add a lift to get today moving.'}
          </p>
          {!searchQuery && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full mt-6 hover:bg-[#b8e600] transition-colors"
            >
              Go to workouts
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {sortedList.map((workout) => (
            <WorkoutRow
              key={workout.id}
              workout={workout}
              activeTab={activeTab}
              onRemove={handleRemove}
              onMarkDone={handleMarkDone}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkoutRow({
  workout,
  activeTab,
  onRemove,
  onMarkDone,
}: {
  workout: Workout;
  activeTab: Tab;
  onRemove: (id: number, name: string) => void;
  onMarkDone: (name: string, id: number) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-white/10 rounded-xl p-4 bg-[#0f0f0f]">
      <div className="relative w-full sm:w-24 h-24 sm:h-20 rounded-lg overflow-hidden shrink-0">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
          sizes="100px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-oswald text-lg font-bold uppercase text-white truncate">
          {workout.name}
        </h3>
        <p className="text-gray-500 text-xs">{workout.equipment}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#ccff00] text-[#ccff00]" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Link
          href={`/workouts/${workout.id}`}
          className="px-4 py-2 border border-white/20 rounded-full text-xs text-white hover:bg-white/5 transition-colors"
        >
          View Details
        </Link>

        {activeTab === 'plan' && (
          <button
            onClick={() => onMarkDone(workout.name, workout.id)}
            className="flex items-center gap-1.5 bg-[#ccff00] text-black font-bold px-4 py-2 rounded-full text-xs hover:bg-[#b8e600] transition-colors"
          >
            <Check className="w-3 h-3" />
            Mark as Done
          </button>
        )}

        <button
          onClick={() => onRemove(workout.id, workout.name)}
          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
