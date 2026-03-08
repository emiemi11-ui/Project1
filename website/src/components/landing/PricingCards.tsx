'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Check, X } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'UNIT',
    personnel: '10-50',
    price: 'Contact',
    period: '/mo',
    features: [
      { text: 'Full app suite', included: true },
      { text: 'Health Connect integration', included: true },
      { text: 'Commander dashboard', included: true },
      { text: '3 specialist roles', included: true },
      { text: 'Self-hosted option', included: true },
      { text: 'Custom compliance', included: false },
      { text: 'Dedicated support team', included: false },
    ],
    recommended: false,
    color: 'border-white/10',
  },
  {
    name: 'FORMATION',
    personnel: '50-500',
    price: 'Contact',
    period: '/mo',
    features: [
      { text: 'Everything in Unit', included: true },
      { text: 'All 4 dashboards', included: true },
      { text: 'Population analytics', included: true },
      { text: 'ML/GNN models', included: true },
      { text: 'ISO 27001 compliance', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'Air-gap deployment', included: false },
    ],
    recommended: true,
    color: 'border-cyan/30',
  },
  {
    name: 'COMMAND',
    personnel: 'NATO/Defence/Enterprise',
    price: 'Custom',
    period: '',
    features: [
      { text: 'Everything in Formation', included: true },
      { text: 'Air-gap deployment', included: true },
      { text: 'NATO STANAG certified', included: true },
      { text: 'Custom ML models', included: true },
      { text: 'Dedicated engineers', included: true },
      { text: 'Source code escrow', included: true },
      { text: '24/7 priority support', included: true },
    ],
    recommended: false,
    color: 'border-violet/20',
  },
];

export default function PricingCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="pricing" ref={ref} className="py-32 bg-ink2">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[4px] text-amber uppercase">PRICING</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4">
            Scale With Your Mission
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
            >
              <Card
                variant="default"
                className={`h-full border ${tier.color} relative ${
                  tier.recommended ? 'ring-1 ring-cyan/20 shadow-lg shadow-cyan/5' : ''
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="info">RECOMMENDED</Badge>
                  </div>
                )}
                <div className="mb-6 pt-2">
                  <h3 className="font-syne text-lg font-bold text-white tracking-wider">{tier.name}</h3>
                  <p className="text-xs font-mono text-ice3 mt-1">{tier.personnel} personnel</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white font-syne">{tier.price}</span>
                  <span className="text-ice3 text-sm">{tier.period}</span>
                </div>
                <div className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <div key={f.text} className="flex items-center gap-2">
                      {f.included ? (
                        <Check size={14} className="text-signal shrink-0" />
                      ) : (
                        <X size={14} className="text-ice3/30 shrink-0" />
                      )}
                      <span className={`text-sm ${f.included ? 'text-ice2' : 'text-ice3/30'}`}>{f.text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/auth/register">
                  <Button
                    variant={tier.recommended ? 'fill' : 'ghost'}
                    className="w-full"
                  >
                    {tier.price === 'Custom' ? 'CONTACT SALES' : 'GET STARTED'}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
