'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Card from '@/components/ui/Card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Before VitaNova, I was making deployment decisions based on last week's PT scores and gut feeling. Now I see real-time readiness for every soldier. Last month, we caught a non-deployable status 72 hours before a critical mission.",
    name: 'Lt. Col. Andrei Vasile',
    role: 'Battalion Commander',
    highlight: 'readiness',
  },
  {
    quote: "I used to see patients for 10 minutes every 6 months and hope nothing critical happened between visits. Now I get continuous vital sign trends, sleep architecture data, and anomaly alerts. I caught an HRV degradation pattern that predicted a cardiac event 11 days before onset.",
    name: 'Dr. Maria Teodorescu',
    role: 'Military Physician',
    highlight: 'medical',
  },
  {
    quote: "The ACWR monitoring alone has reduced our injury rate by 40%. But what really changed was seeing how sleep affects training adaptation. Athletes who sleep under 6 hours get zero strength gains — we proved it with 8 months of data.",
    name: 'Coach Dan Petrescu',
    role: 'Performance Director, National Team',
    highlight: 'performance',
  },
];

const highlightColors = {
  readiness: 'from-cold/20 to-cyan/10 border-cold/20',
  medical: 'from-signal/20 to-signal/5 border-signal/20',
  performance: 'from-amber/20 to-amber/5 border-amber/20',
};

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 bg-ink">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[4px] text-ice3 uppercase">TESTIMONIALS</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4">
            From the Field
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <Card
                variant="default"
                className={`h-full bg-gradient-to-b ${highlightColors[t.highlight as keyof typeof highlightColors]} border`}
              >
                <Quote className="w-8 h-8 text-white/10 mb-4" />
                <p className="text-sm text-ice2 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-white/5 pt-4">
                  <div className="font-syne font-bold text-white text-sm">{t.name}</div>
                  <div className="text-xs font-mono text-ice3 mt-1">{t.role}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
