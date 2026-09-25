import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[#ccff00] text-sm font-semibold tracking-widest mb-4">
        404
      </p>
      <h1 className="font-oswald text-5xl md:text-7xl font-bold uppercase text-white">
        Page not found
      </h1>
      <p className="text-gray-400 mt-4 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Library
      </Link>
    </div>
  );
}
