'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Flame, Radio, Clock, Zap, Shield } from 'lucide-react';
import Card from '@/components/ui/Card';

const features = [
  {
    icon: Brain,
    title: 'Cognitive Load Score',
    subtitle: 'Know your capacity before you decide',
    description: 'Calculated passively from app usage, sleep quality, HRV, and notification patterns. 0-100 score updated continuously.',
    tags: ['HRV', 'Sleep', 'ML Kit'],
    color: 'text-cyan',
    glow: 'group-hover:shadow-cyan/10',
  },
  {
    icon: Flame,
    title: 'Elastic Streaks',
    subtitle: 'Habits that don\'t punish you',
    description: 'Grace days, Momentum Score, Recovery Mode. Streaks that understand life happens — and help you bounce back.',
    tags: ['Behavioral', 'Adaptive'],
    color: 'text-amber',
    glow: 'group-hover:shadow-amber/10',
  },
  {
    icon: Radio,
    title: 'Passive Stress Detection',
    subtitle: 'Zero input. Full awareness.',
    description: 'Typing patterns, touch behavior, HRV variance, screen time anomalies. Your phone knows before you do.',
    tags: ['MediaPipe', 'TFLite'],
    color: 'text-red',
    glow: 'group-hover:shadow-red/10',
  },
  {
    icon: Clock,
    title: 'Circadian Task Scheduling',
    subtitle: 'Right task, right time, automatically',
    description: 'Deep work in the morning. Creative tasks in the afternoon. Review in the evening. Aligned with your biology.',
    tags: ['Chronotype', 'Adaptive'],
    color: 'text-violet',
    glow: 'group-hover:shadow-violet/10',
  },
  {
    icon: Zap,
    title: 'Energy Budget',
    subtitle: 'Not time blocking. Energy blocking.',
    description: '100 energy points per day. Each task costs energy, not time. Know when to push and when to rest.',
    tags: ['Energy Model', 'HRV'],
    color: 'text-signal',
    glow: 'group-hover:shadow-signal/10',
  },
  {
    icon: Shield,
    title: 'On-Device AI',
    subtitle: 'Your data never leaves your phone',
    description: 'MediaPipe, TensorFlow Lite, ML Kit — all processing happens locally. Zero cloud dependency for inference.',
    tags: ['Privacy', 'Edge ML'],
    color: 'text-cold2',
    glow: 'group-hover:shadow-cold2/10',
  },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={ref} className="py-32 bg-ink relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[4px] text-signal uppercase">CAPABILITIES</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4">
            Intelligence, Not Data
          </h2>
          <p className="text-ice3 mt-4 max-w-2xl mx-auto">
            Six core capabilities that transform passive signals into actionable insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                variant="glow"
                className={`group h-full hover:shadow-lg ${feature.glow} transition-all duration-500`}
              >
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-syne text-lg font-bold text-white mb-1">{feature.title}</h3>
                <p className={`text-sm ${feature.color} font-medium mb-3`}>{feature.subtitle}</p>
                <p className="text-sm text-ice3 leading-relaxed mb-4">{feature.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {feature.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-ice3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
