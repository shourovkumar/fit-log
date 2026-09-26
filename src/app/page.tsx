import Hero from '@/components/Hero';
import WorkoutCard from '@/components/WorkoutCard';
import type { Workout } from '@/types';

async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch('https://api.api-store.workers.dev/api/fitlog', {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch workouts:', error);
    return [];
  }
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <div>
      <Hero />

      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16"
      >
        <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="text-gray-400 mt-2">
          Twelve lifts covering every major muscle group.
        </p>

        {workouts.length === 0 ? (
          <div className="mt-8 border-2 border-dashed border-white/10 rounded-xl py-20 text-center">
            <p className="text-gray-400">
              Couldn't load workouts. Please refresh the page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
