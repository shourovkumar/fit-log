'use client';

import { Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Workouts', href: '/' },
    { name: 'My Plan', href: '/my-plan' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#ccff00] rounded flex items-center justify-center">
            <Zap className="w-5 h-5 text-black fill-black" />
          </div>
          <span className="font-oswald font-bold text-xl tracking-wider text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#ccff00] border-b-2 border-[#ccff00] pb-1'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Badges */}
        <div className="flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">Plan</span>
            <span className="bg-[#ccff00] text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              0
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">Saved</span>
            <span className="border border-white/20 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
