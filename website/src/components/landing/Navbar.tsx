'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'PLATFORM', href: '#features' },
  { label: 'CAPABILITIES', href: '#demo' },
  { label: 'ROLES', href: '#dashboards' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'DOWNLOAD', href: '#download' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink/85 backdrop-blur-[24px] border-b border-white/5 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan to-signal rounded-lg rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
              <div className="absolute inset-[3px] bg-ink rounded-[5px] rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-signal font-bold text-xs">V</span>
              </div>
            </div>
            <span className="font-syne font-bold text-sm tracking-[3px] text-ice">
              VITANOVA
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-syne tracking-widest text-ice3 hover:text-ice transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <Badge variant="pulse">DEVELOPMENT PHASE</Badge>
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">SIGN IN</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="fill" size="sm">GET STARTED</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-ice"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-xl pt-20 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-syne tracking-widest text-ice3 hover:text-ice"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-6">
                <Link href="/auth/login">
                  <Button variant="ghost" size="lg" className="w-full">SIGN IN</Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="fill" size="lg" className="w-full">GET STARTED</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
