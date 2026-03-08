'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

const stats = [
  { value: 22, suffix: '+', label: 'Sensors Integrated', color: 'text-cyan' },
  { value: 0, suffix: '', label: 'Manual Inputs Required', color: 'text-signal' },
  { value: 4, suffix: '', label: 'Specialist Roles', color: 'text-violet' },
  { value: 3, suffix: 'σ', label: 'Anomaly Threshold', color: 'text-amber' },
];

export default function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-ink2 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className={`font-mono text-4xl md:text-5xl font-bold ${stat.color}`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs font-mono text-ice3 mt-2 tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
