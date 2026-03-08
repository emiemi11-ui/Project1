'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import PhoneMockup from '@/components/ui/PhoneMockup';
import { Home, Flame, Heart, ListTodo, Users } from 'lucide-react';

const screens = ['Home', 'Habits', 'Health', 'Tasks', 'Specialist'];
const screenIcons = [Home, Flame, Heart, ListTodo, Users];

function HomeScreen() {
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink">
      <p className="text-[10px] text-ice3 font-mono">Good morning</p>
      <p className="text-sm font-syne font-bold text-white mt-1">Cpl. Stanescu</p>
      <div className="mt-4 flex flex-col items-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#00E5A0" strokeWidth="6" strokeDasharray={`${68 * 2.64} 264`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">68</span>
            <span className="text-[8px] font-mono text-ice3">COGNITIVE</span>
          </div>
        </div>
      </div>
      <div className="mt-4 bg-white/5 rounded-xl p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono text-ice3">ENERGY BUDGET</span>
          <span className="text-[10px] font-mono text-signal">62 pts</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-signal to-cyan rounded-full" style={{ width: '62%' }} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {['Morning run', 'Team briefing', 'Equipment check'].map(task => (
          <div key={task} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
            <div className="w-4 h-4 rounded border border-white/20" />
            <span className="text-[11px] text-ice2">{task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HabitsScreen() {
  const habits = [
    { name: 'Morning Exercise', streak: 25, total: 30, momentum: 83 },
    { name: 'Meditation', streak: 18, total: 30, momentum: 60 },
    { name: 'Hydration', streak: 28, total: 30, momentum: 93 },
  ];
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink">
      <p className="text-sm font-syne font-bold text-white">Habits</p>
      <p className="text-[10px] text-signal font-mono mt-1">Elastic Streaks</p>
      <div className="mt-4 space-y-3">
        {habits.map(h => (
          <div key={h.name} className="bg-white/5 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-white font-medium">{h.name}</span>
              <span className="text-[9px] font-mono text-signal">{h.streak}/{h.total}d</span>
            </div>
            <div className="mt-2 flex gap-[2px]">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={`w-[6px] h-[6px] rounded-[1px] ${i < h.streak ? 'bg-signal' : 'bg-white/10'}`} />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber rounded-full" style={{ width: `${h.momentum}%` }} />
              </div>
              <span className="text-[8px] font-mono text-amber">{h.momentum}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthScreen() {
  const vitals = [
    { label: 'HR', value: '68', unit: 'bpm', color: 'text-red' },
    { label: 'HRV', value: '65', unit: 'ms', color: 'text-signal' },
    { label: 'SpO2', value: '98', unit: '%', color: 'text-cyan' },
  ];
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink">
      <p className="text-sm font-syne font-bold text-white">Health</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {vitals.map(v => (
          <div key={v.label} className="bg-white/5 rounded-xl p-2 text-center">
            <span className={`text-lg font-bold ${v.color}`}>{v.value}</span>
            <span className="text-[8px] text-ice3 block">{v.unit}</span>
            <span className="text-[8px] font-mono text-ice3">{v.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-white/5 rounded-xl p-3">
        <span className="text-[10px] font-mono text-ice3">SLEEP — Last 7 nights</span>
        <div className="mt-2 flex items-end gap-1 h-16">
          {[7.2, 6.5, 8.1, 5.8, 7.5, 6.9, 7.8].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t bg-gradient-to-t from-violet to-cold" style={{ height: `${(h / 9) * 100}%` }} />
              <span className="text-[7px] text-ice3">{h}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 bg-white/5 rounded-xl p-3">
        <span className="text-[10px] font-mono text-ice3">STRESS LEVEL</span>
        <div className="mt-2 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-signal flex items-center justify-center">
            <span className="text-[10px] font-bold text-signal">LOW</span>
          </div>
          <div className="text-[10px] text-ice3">Based on HRV variance, typing patterns, and activity data</div>
        </div>
      </div>
    </div>
  );
}

function TasksScreen() {
  const sections = [
    { time: 'Morning Deep Work', range: '06:00-11:00', tasks: [{ name: 'Tactical briefing review', energy: 15 }] },
    { time: 'Midday Collaboration', range: '11:00-14:00', tasks: [{ name: 'Team coordination call', energy: 10 }] },
    { time: 'Afternoon Active', range: '14:00-18:00', tasks: [{ name: 'Physical training', energy: 25 }] },
    { time: 'Evening Review', range: '18:00-22:00', tasks: [{ name: 'After-action report', energy: 12 }] },
  ];
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink overflow-auto">
      <p className="text-sm font-syne font-bold text-white">Tasks</p>
      <p className="text-[10px] text-violet font-mono mt-1">Circadian Scheduler</p>
      <div className="mt-3 space-y-2">
        {sections.map(s => (
          <div key={s.time} className="bg-white/5 rounded-xl p-2.5">
            <div className="flex justify-between">
              <span className="text-[10px] font-bold text-ice2">{s.time}</span>
              <span className="text-[8px] font-mono text-ice3">{s.range}</span>
            </div>
            {s.tasks.map(t => (
              <div key={t.name} className="mt-1.5 flex items-center gap-2 p-1.5 bg-white/5 rounded-lg">
                <div className="w-3.5 h-3.5 rounded border border-white/20" />
                <span className="text-[10px] text-ice2 flex-1">{t.name}</span>
                <span className="text-[8px] font-mono text-amber bg-amber/10 px-1.5 py-0.5 rounded">{t.energy}e</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecialistScreen() {
  const specs = [
    { label: 'Doctor', color: 'bg-signal', initials: 'EM', unread: 0 },
    { label: 'Psych', color: 'bg-violet', initials: 'AV', unread: 1 },
    { label: 'Trainer', color: 'bg-amber', initials: 'MC', unread: 0 },
    { label: 'Cdr', color: 'bg-cold2', initials: 'BA', unread: 2 },
  ];
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink flex flex-col items-center justify-center">
      <p className="text-sm font-syne font-bold text-white mb-6">Care Circle</p>
      <div className="relative w-48 h-48">
        <div className="absolute inset-1/4 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center">
          <div className="text-center">
            <span className="text-lg font-bold text-white">92</span>
            <span className="text-[8px] block font-mono text-ice3">READINESS</span>
          </div>
        </div>
        {specs.map((s, i) => {
          const angle = -90 + i * 90;
          const rad = (angle * Math.PI) / 180;
          return (
            <div
              key={s.label}
              className="absolute"
              style={{
                left: `calc(50% + ${Math.cos(rad) * 80}px - 18px)`,
                top: `calc(50% + ${Math.sin(rad) * 80}px - 18px)`,
              }}
            >
              <div className={`relative w-9 h-9 rounded-full ${s.color} flex items-center justify-center`}>
                <span className="text-[9px] font-bold text-white">{s.initials}</span>
                {s.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red rounded-full text-[7px] font-bold text-white flex items-center justify-center">
                    {s.unread}
                  </span>
                )}
              </div>
              <span className="text-[7px] font-mono text-ice3 text-center block mt-1">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const screenComponents = [HomeScreen, HabitsScreen, HealthScreen, TasksScreen, SpecialistScreen];

export default function AppDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <section id="demo" ref={ref} className="py-32 bg-ink2 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono tracking-[4px] text-violet uppercase">APP PREVIEW</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold text-white mt-4">
            Your Personal Intelligence
          </h2>
          <p className="text-ice3 mt-4 max-w-2xl mx-auto">
            Five screens. Zero manual inputs. Continuous contextual intelligence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <PhoneMockup>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {(() => {
                  const Screen = screenComponents[activeScreen];
                  return <Screen />;
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Bottom nav */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-ink/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2">
              {screens.map((screen, i) => {
                const Icon = screenIcons[i];
                return (
                  <button
                    key={screen}
                    onClick={() => setActiveScreen(i)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
                      i === activeScreen ? 'text-cyan' : 'text-ice3/40'
                    }`}
                  >
                    <Icon size={16} />
                    {i === activeScreen && (
                      <span className="text-[7px] font-mono">{screen}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </PhoneMockup>

          {/* Screen selector dots */}
          <div className="flex gap-3 mt-8">
            {screens.map((screen, i) => (
              <button
                key={screen}
                onClick={() => setActiveScreen(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-xs font-mono ${
                  i === activeScreen
                    ? 'bg-cyan/10 text-cyan border border-cyan/20'
                    : 'text-ice3/50 hover:text-ice3'
                }`}
              >
                {screen}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
