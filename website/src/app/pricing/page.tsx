'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import PricingCards from '@/components/landing/PricingCards';
import Card from '@/components/ui/Card';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'How is pricing determined?',
    a: 'Pricing is based on the number of personnel in your organization and the feature tier selected. Contact our sales team for a custom quote tailored to your specific needs.',
  },
  {
    q: 'Can we start with Unit and upgrade later?',
    a: 'Absolutely. All tiers are designed for seamless upgrades. Your data, configurations, and personnel profiles carry over automatically.',
  },
  {
    q: 'Is there a free trial?',
    a: 'We offer a 30-day pilot program for qualified organizations. This includes full Formation-tier access with dedicated onboarding support.',
  },
  {
    q: 'What about data sovereignty?',
    a: 'Command tier includes air-gap deployment options. All tiers support self-hosted configurations. Data never leaves your infrastructure unless explicitly configured.',
  },
  {
    q: 'Do you support NATO STANAG compliance?',
    a: 'Command tier includes full NATO STANAG 4774/4778 compliance certification. Formation tier includes preparation and readiness assessment for certification.',
  },
  {
    q: 'What SLA do you offer?',
    a: 'Formation tier: 99.9% uptime SLA. Command tier: 99.99% uptime SLA with 24/7 dedicated support and <15 minute response time for critical issues.',
  },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border-b border-white/5 py-4"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-white">{q}</span>
        <ChevronDown size={16} className={`text-ice3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && <p className="text-sm text-ice3 mt-3 leading-relaxed">{a}</p>}
    </button>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <div className="pt-16">
        <PricingCards />

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-syne text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>
            <Card variant="default">
              {faqs.map(faq => (
                <FAQ key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <h3 className="font-syne text-2xl font-bold text-white">
              Need a Custom Solution?
            </h3>
            <p className="text-ice3 mt-3">
              Our team will design a deployment tailored to your mission requirements.
            </p>
            <a
              href="mailto:sales@vitanova.io"
              className="inline-block mt-6 px-8 py-3 bg-cold hover:bg-cold2 text-white font-syne font-semibold text-sm rounded-lg transition-colors tracking-wider uppercase"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
