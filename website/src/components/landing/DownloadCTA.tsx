'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Button from '@/components/ui/Button';
import PhoneMockup from '@/components/ui/PhoneMockup';
import { Download, Smartphone, Shield, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function DownloadCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="download" ref={ref} className="py-32 bg-ink relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-signal/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="font-syne text-4xl md:text-5xl font-bold text-white leading-tight">
              TAKE CONTROL<br />OF YOUR<br />
              <span className="text-signal text-glow-green">READINESS</span>
            </h2>
            <p className="text-ice3 mt-6 text-lg max-w-md">
              Download VitaNova for Android. Start understanding your body&apos;s signals today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/download">
                <Button variant="signal" size="lg">
                  <Download size={18} className="mr-2" />
                  DOWNLOAD APK
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="ghost" size="lg">TRY DEMO</Button>
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Smartphone, label: 'Android 8.0+' },
                { icon: Shield, label: 'E2E Encrypted' },
                { icon: Cpu, label: '45MB Size' },
              ].map(spec => (
                <div key={spec.label} className="flex flex-col items-center gap-2">
                  <spec.icon size={18} className="text-ice3" />
                  <span className="text-[10px] font-mono text-ice3">{spec.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <PhoneMockup>
              <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-signal/10 border border-signal/20 flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-signal">V</span>
                </div>
                <h3 className="font-syne font-bold text-white text-sm">VitaNova</h3>
                <p className="text-[10px] text-ice3 mt-1 font-mono">Human Performance Intelligence</p>
                <div className="mt-6 w-full space-y-2">
                  <div className="h-2 bg-signal/20 rounded-full w-full" />
                  <div className="h-2 bg-cyan/20 rounded-full w-3/4" />
                  <div className="h-2 bg-violet/20 rounded-full w-5/6" />
                </div>
              </div>
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
