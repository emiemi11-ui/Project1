'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const tabs = ['COMMANDER', 'PHYSICIAN', 'PSYCHOLOGIST', 'TRAINER'] as const;
type TabType = typeof tabs[number];

function CommanderDash() {
  const units = [
    { name: 'Alpha', readiness: 84, count: 5, ready: 4, risk: 0 },
    { name: 'Bravo', readiness: 70, count: 5, ready: 3, risk: 1 },
    { name: 'Charlie', readiness: 68, count: 5, ready: 3, risk: 0 },
    { name: 'Delta', readiness: 69, count: 5, ready: 3, risk: 0 },
    { name: 'Echo', readiness: 73, count: 5, ready: 3, risk: 1 },
    { name: 'Foxtrot', readiness: 75, count: 5, ready: 3, risk: 1 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card variant="glass" className="md:col-span-1">
        <div className="text-center">
          <div className="text-5xl font-bold text-signal font-mono">74</div>
          <div className="text-xs font-mono text-ice3 mt-1">OVERALL READINESS</div>
          <div className="w-full h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-signal to-cyan rounded-full" style={{ width: '74%' }} />
          </div>
        </div>
      </Card>
      <Card variant="glass" className="md:col-span-2">
        <div className="text-xs font-mono text-ice3 mb-3">UNIT READINESS</div>
        <div className="space-y-2">
          {units.map(u => (
            <div key={u.name} className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-ice2 w-16">{u.name}</span>
              <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${u.readiness >= 75 ? 'bg-signal' : u.readiness >= 60 ? 'bg-amber' : 'bg-red'}`}
                  style={{ width: `${u.readiness}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-ice2 w-8">{u.readiness}%</span>
            </div>
          ))}
        </div>
      </Card>
      <Card variant="glass" className="md:col-span-3">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="danger">ALERT</Badge>
          <span className="text-xs text-ice3">2 personnel below readiness threshold</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-red/5 border border-red/10">
            <span className="text-xs font-bold text-red">Cpl. S. Ionescu — Charlie</span>
            <div className="text-[10px] text-ice3 mt-1">Readiness: 30 | ACWR: 1.85 | Status: NON-DEPLOYABLE</div>
          </div>
          <div className="p-3 rounded-lg bg-red/5 border border-red/10">
            <span className="text-xs font-bold text-red">Sgt. Q. Nistor — Delta</span>
            <div className="text-[10px] text-ice3 mt-1">Readiness: 25 | ACWR: 1.92 | Status: NON-DEPLOYABLE</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PhysicianDash() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card variant="glass">
        <div className="text-xs font-mono text-ice3 mb-3">VITAL SIGNS AGGREGATE</div>
        <div className="space-y-3">
          {[
            { label: 'Avg HR', value: '72 bpm', status: 'normal' },
            { label: 'Avg HRV', value: '54 ms', status: 'normal' },
            { label: 'Avg SpO2', value: '97%', status: 'normal' },
            { label: 'Anomalies', value: '3', status: 'warning' },
          ].map(v => (
            <div key={v.label} className="flex justify-between items-center">
              <span className="text-[11px] text-ice3">{v.label}</span>
              <span className={`text-[11px] font-mono font-bold ${v.status === 'warning' ? 'text-amber' : 'text-signal'}`}>{v.value}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card variant="glass">
        <div className="text-xs font-mono text-ice3 mb-3">MEDICATION ADHERENCE</div>
        <div className="flex items-center justify-center py-4">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#00E5A0" strokeWidth="8" strokeDasharray={`${87 * 2.64} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-signal">87%</span>
            </div>
          </div>
        </div>
      </Card>
      <Card variant="glass">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="warning">ANOMALY ALERT</Badge>
        </div>
        <div className="space-y-2">
          <div className="p-2 rounded-lg bg-amber/5 border border-amber/10">
            <div className="text-[11px] text-amber font-bold">HRV Drop — Lt. A. Dumitru</div>
            <div className="text-[10px] text-ice3 mt-1">HRV dropped from 52 to 38 in 48h. Stress correlation: 0.87</div>
          </div>
          <div className="p-2 rounded-lg bg-red/5 border border-red/10">
            <div className="text-[11px] text-red font-bold">Sleep Deprivation — Sgt. B. Florea</div>
            <div className="text-[10px] text-ice3 mt-1">Avg 3.2h sleep for 5 consecutive days. Cognitive: 30.</div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function PsychologistDash() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // hours used for heatmap grid labels
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card variant="glass" className="md:col-span-2">
        <div className="text-xs font-mono text-ice3 mb-3">STRESS HEATMAP — WEEK</div>
        <div className="grid grid-cols-7 gap-1">
          {days.map(d => (
            <div key={d} className="text-[9px] font-mono text-ice3 text-center">{d}</div>
          ))}
          {Array.from({ length: 42 }, (_, i) => {
            const stress = Math.random();
            return (
              <div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor: stress > 0.7
                    ? 'rgba(232,48,80,0.6)'
                    : stress > 0.4
                    ? 'rgba(240,160,0,0.4)'
                    : 'rgba(0,229,160,0.3)',
                }}
              />
            );
          })}
        </div>
      </Card>
      <Card variant="glass">
        <div className="text-xs font-mono text-ice3 mb-3">SESSION PREP</div>
        <div className="p-3 rounded-lg bg-violet/5 border border-violet/10">
          <div className="text-[11px] text-violet font-bold">Pvt. D. Vasile — Thursday 14:00</div>
          <div className="text-[10px] text-ice3 mt-2 space-y-1">
            <p>5 consecutive high-stress days</p>
            <p>Sleep quality declined 40%</p>
            <p>Readiness: 55 → monitor</p>
            <p className="text-violet">Suggested: Coping strategies, sleep hygiene</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TrainerDash() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card variant="glass">
        <div className="text-xs font-mono text-ice3 mb-3">ACWR OVERVIEW</div>
        <div className="flex items-center justify-center py-4">
          <div className="relative w-28 h-16">
            <svg viewBox="0 0 120 60" className="w-full h-full">
              <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
              <path d="M 10 55 A 50 50 0 0 1 110 55" fill="none" stroke="url(#acwrGrad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="157" strokeDashoffset="50" />
              <defs>
                <linearGradient id="acwrGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00E5A0" />
                  <stop offset="50%" stopColor="#F0A000" />
                  <stop offset="100%" stopColor="#E83050" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
              <span className="text-lg font-bold text-amber font-mono">1.18</span>
              <span className="text-[8px] block text-ice3 font-mono">AVG ACWR</span>
            </div>
          </div>
        </div>
      </Card>
      <Card variant="glass">
        <div className="text-xs font-mono text-ice3 mb-3">INJURY RISK</div>
        <div className="space-y-2">
          {[
            { name: 'Cpl. V. Munteanu', acwr: 1.65, risk: 'HIGH' },
            { name: 'Cpl. I. Preda', acwr: 1.60, risk: 'HIGH' },
            { name: 'Sgt. B. Florea', acwr: 1.72, risk: 'CRITICAL' },
          ].map(p => (
            <div key={p.name} className="flex items-center justify-between p-2 rounded-lg bg-red/5 border border-red/10">
              <span className="text-[10px] text-ice2">{p.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-red">{p.acwr}</span>
                <Badge variant="danger">{p.risk}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card variant="glass">
        <div className="text-xs font-mono text-ice3 mb-3">ADAPTIVE PROGRAM</div>
        <div className="p-3 rounded-lg bg-amber/5 border border-amber/10">
          <div className="text-[11px] text-amber font-bold">Load Reduction Active</div>
          <div className="text-[10px] text-ice3 mt-2 space-y-1">
            <p>3 athletes in injury risk zone</p>
            <p>Training load reduced 30%</p>
            <p>Focus: mobility + recovery</p>
            <p className="text-amber">Duration: 5-7 days</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

const dashboards: Record<TabType, () => JSX.Element> = {
  COMMANDER: CommanderDash,
  PHYSICIAN: PhysicianDash,
  PSYCHOLOGIST: PsychologistDash,
  TRAINER: TrainerDash,
};

export default function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<TabType>('COMMANDER');

  const Dashboard = dashboards[activeTab];

  return (
    <section id="dashboards" ref={ref} className="py-32 bg-ink relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono tracking-[4px] text-cold2 uppercase">ROLE DASHBOARDS</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4">
            Four Perspectives, One Truth
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="info">LIVE DATA PREVIEW</Badge>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-8">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-syne tracking-wider transition-all duration-300 relative ${
                activeTab === tab ? 'text-white' : 'text-ice3/50 hover:text-ice3'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="dashboardTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan"
                />
              )}
            </button>
          ))}
        </div>

        {/* Dashboard content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard />
        </motion.div>
      </div>
    </section>
  );
}
