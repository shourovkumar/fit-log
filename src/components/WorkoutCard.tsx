import type { Workout } from '@/types';
import { Clock, Flame, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group block bg-[#111] border border-white/10 rounded-xl overflow-hidden hover:border-[#ccff00]/50 transition-colors"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="bg-[#ccff00] text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="font-oswald text-lg font-bold text-white uppercase">
          {workout.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{workout.equipment}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3 h-3" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-[#ccbf00]">
            <Star className="w-3 h-3 fill-[#ccff00] text-[#ccff00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
