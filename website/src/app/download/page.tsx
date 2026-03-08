'use client';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Download, Smartphone, Shield, Cpu, Check } from 'lucide-react';

const features = [
  'Cognitive Load Score — real-time capacity tracking',
  'Elastic Streaks — habits that forgive',
  'Circadian Task Scheduling — biology-aligned productivity',
  'Energy Budget — 100 points, zero burnout',
  'Passive Stress Detection — zero input required',
  'Health Connect integration — unified biometric hub',
  'On-device AI — privacy-first intelligence',
  'Specialist communication — integrated care circle',
];

const steps = [
  { step: '01', title: 'Download APK', desc: 'Click the download button to get the VitaNova APK file.' },
  { step: '02', title: 'Enable Unknown Sources', desc: 'Go to Settings → Security → Enable "Unknown Sources" or "Install Unknown Apps".' },
  { step: '03', title: 'Install', desc: 'Open the downloaded APK file and tap "Install".' },
  { step: '04', title: 'Launch & Configure', desc: 'Open VitaNova, complete onboarding, and start your first day.' },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white">
              Download VitaNova
            </h1>
            <p className="text-ice3 mt-4 text-lg">
              Human Performance Intelligence on your Android device.
            </p>
          </motion.div>

          {/* Main download card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glow" padding="lg" className="text-center mb-12">
              <div className="w-20 h-20 rounded-2xl bg-signal/10 border border-signal/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-signal font-syne">V</span>
              </div>
              <h2 className="font-syne text-2xl font-bold text-white">VitaNova for Android</h2>
              <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-ice3 font-mono">
                <span>v1.0.0-beta</span>
                <span>45 MB</span>
                <span>Android 8.0+</span>
              </div>
              <div className="mt-6">
                <Button variant="signal" size="lg">
                  <Download size={20} className="mr-2" />
                  DOWNLOAD APK
                </Button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { icon: Smartphone, label: 'Android 8.0+', desc: 'Oreo or newer' },
                  { icon: Shield, label: 'E2E Encrypted', desc: 'AES-256 + TLS 1.3' },
                  { icon: Cpu, label: 'On-Device ML', desc: 'No cloud required' },
                ].map(spec => (
                  <div key={spec.label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5">
                    <spec.icon size={18} className="text-ice3" />
                    <span className="text-xs font-bold text-ice2">{spec.label}</span>
                    <span className="text-[10px] text-ice3">{spec.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Installation Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="font-syne text-xl font-bold text-white mb-6">Installation Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map(s => (
                <Card key={s.step} variant="default" className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-mono font-bold text-cyan">{s.step}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.title}</h4>
                    <p className="text-xs text-ice3 mt-1">{s.desc}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-syne text-xl font-bold text-white mb-6">What&apos;s Included</h3>
            <Card variant="default">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <Check size={14} className="text-signal shrink-0" />
                    <span className="text-sm text-ice2">{f}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
