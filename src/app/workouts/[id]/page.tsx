import ActionButtons from '@/components/ActionButtons';
import type { Workout } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

async function getWorkout(id: string): Promise<Workout> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch workout');
  return res.json();
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ccff00] text-sm mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="font-oswald text-4xl md:text-5xl font-bold uppercase text-white">
            {workout.name}
          </h1>

          <p className="text-gray-400 mt-3">{workout.description}</p>

          <div className="flex flex-wrap gap-2 mt-5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-6 border border-white/10 rounded-xl divide-y divide-white/10">
            <SpecRow label="Equipment" value={workout.equipment} />
            <SpecRow label="Difficulty" value={workout.difficulty} />
            <SpecRow label="Sets" value={workout.sets.toString()} />
            <SpecRow label="Reps" value={workout.reps} />
            <SpecRow label="Duration" value={`${workout.duration} min`} />
            <SpecRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
            <SpecRow label="Rating" value={workout.rating.toString()} />
          </div>

          <h2 className="font-oswald text-xl font-bold uppercase text-white mt-8 mb-4">
            Instructions
          </h2>
          <ol className="space-y-3">
            {workout.instructions.map((step, index) => (
              <li key={index} className="flex gap-3 text-sm text-gray-300">
                <span className="text-[#ccff00] font-bold">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <ActionButtons workout={workout} />
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-sm">
      <span className="text-gray-500 uppercase text-xs tracking-wider font-semibold">
        {label}
      </span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
