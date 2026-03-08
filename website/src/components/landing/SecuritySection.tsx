'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Lock, Cpu, EyeOff, Scale } from 'lucide-react';

const features = [
  { icon: Lock, title: 'End-to-End Encryption', desc: 'TLS 1.3 + certificate pinning. AES-256 at rest. Zero plaintext exposure.', color: 'text-cyan' },
  { icon: Cpu, title: 'On-Device ML', desc: 'All inference runs locally. No cloud processing of personal data. Ever.', color: 'text-signal' },
  { icon: EyeOff, title: 'Data Anonymization', desc: 'Aggregated analytics use k-anonymity. Individual data cannot be reverse-engineered.', color: 'text-violet' },
  { icon: Scale, title: 'GDPR Compliant', desc: 'Granular consent. Right to erasure. Data portability. Full audit trail.', color: 'text-amber' },
];

export default function SecuritySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 bg-ink2">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">
            Privacy Is Not a Feature.<br />
            <span className="text-cyan text-glow-cyan">It&apos;s the Architecture.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glow" className="h-full text-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-syne text-sm font-bold text-white mb-2">{f.title}</h3>
                <p className="text-xs text-ice3 leading-relaxed">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Badge variant="default">ISO 27001</Badge>
          <Badge variant="default">NATO STANAG</Badge>
          <Badge variant="default">Air-Gap Ready</Badge>
          <Badge variant="default">SOC 2 Type II</Badge>
        </motion.div>
      </div>
    </section>
  );
}
