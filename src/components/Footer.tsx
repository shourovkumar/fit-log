import { Zap } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#ccff00] rounded flex items-center justify-center">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="font-oswald font-bold text-lg tracking-wider text-white">
            FITLOG
          </span>
        </Link>
        <p className="text-gray-500 text-xs text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
