import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Left: Text */}
        <div className="w-full md:flex-1 text-center md:text-left order-2 md:order-1">
          <p className="text-[#ccff00] text-xs sm:text-sm font-semibold tracking-widest mb-3 sm:mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-none text-white">
            Train with Intent. <br />
            Log Every Set.
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-[#b8e600] transition-colors"
          >
            BROWSE WORKOUTS
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Image */}
        <div className="w-full md:flex-1 order-1 md:order-2">
          <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-2xl overflow-hidden">
            <Image
              src="https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740"
              alt="Workout hero"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
