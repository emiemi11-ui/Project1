'use client';
import Link from 'next/link';

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'App Demo', href: '#demo' },
      { label: 'Dashboards', href: '#dashboards' },
      { label: 'Download', href: '/download' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Data Processing', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan to-signal rounded-lg rotate-45" />
                <div className="absolute inset-[3px] bg-ink rounded-[5px] rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-signal font-bold text-xs">V</span>
                </div>
              </div>
              <span className="font-syne font-bold text-sm tracking-[3px]">VITANOVA</span>
            </div>
            <p className="text-xs text-ice3 leading-relaxed">
              Built with conviction that healthcare should be continuous, not episodic.
            </p>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="font-syne text-xs font-bold text-ice2 tracking-wider uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-ice3 hover:text-ice transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ice3/50 font-mono">
            &copy; 2025 VitaNova Technologies. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
              <span key={social} className="text-xs text-ice3/50 hover:text-ice3 cursor-pointer transition-colors">
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
