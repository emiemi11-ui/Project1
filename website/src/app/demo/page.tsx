'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import PhoneMockup from '@/components/ui/PhoneMockup';
import Button from '@/components/ui/Button';
import { Home, Flame, Heart, ListTodo, Users, Check, Download } from 'lucide-react';
import Link from 'next/link';

const screens = ['Home', 'Habits', 'Health', 'Tasks', 'Specialist'];
const screenIcons = [Home, Flame, Heart, ListTodo, Users];

function DemoHome() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const tasks = ['Morning run — 20e', 'Team briefing — 10e', 'Equipment check — 8e'];
  const totalEnergy = 100;
  const usedEnergy = completedTasks.length * 13;

  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink overflow-auto">
      <p className="text-[10px] text-ice3 font-mono">Good morning</p>
      <p className="text-sm font-syne font-bold text-white mt-1">Demo User</p>

      <div className="mt-4 flex flex-col items-center">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#00E5A0" strokeWidth="6"
              strokeDasharray={`${72 * 2.64} 264`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">72</span>
            <span className="text-[8px] font-mono text-ice3">COGNITIVE LOAD</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white/5 rounded-xl p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-mono text-ice3">ENERGY BUDGET</span>
          <span className="text-[10px] font-mono text-signal">{totalEnergy - usedEnergy} pts</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-signal to-cyan rounded-full"
            animate={{ width: `${((totalEnergy - usedEnergy) / totalEnergy) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {tasks.map(task => (
          <button
            key={task}
            onClick={() => {
              setCompletedTasks(prev =>
                prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
              );
            }}
            className="flex items-center gap-2 p-2.5 bg-white/5 rounded-lg w-full text-left transition-all hover:bg-white/8"
          >
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              completedTasks.includes(task)
                ? 'bg-signal border-signal'
                : 'border-white/20'
            }`}>
              {completedTasks.includes(task) && <Check size={10} className="text-ink" />}
            </div>
            <span className={`text-[11px] ${completedTasks.includes(task) ? 'text-ice3 line-through' : 'text-ice2'}`}>
              {task}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DemoHabits() {
  const [habits, setHabits] = useState([
    { name: 'Morning Exercise', streak: 25, completed: false },
    { name: 'Meditation', streak: 18, completed: false },
    { name: 'Hydration', streak: 28, completed: false },
  ]);

  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink overflow-auto">
      <p className="text-sm font-syne font-bold text-white">Habits</p>
      <p className="text-[10px] text-signal font-mono mt-1">Tap to mark complete</p>
      <div className="mt-4 space-y-3">
        {habits.map((h, idx) => (
          <button
            key={h.name}
            onClick={() => {
              const updated = [...habits];
              updated[idx] = { ...h, completed: !h.completed, streak: h.completed ? h.streak - 1 : h.streak + 1 };
              setHabits(updated);
            }}
            className="bg-white/5 rounded-xl p-3 w-full text-left"
          >
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-white font-medium">{h.name}</span>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                h.completed ? 'bg-signal/20 text-signal' : 'text-ice3'
              }`}>
                {h.completed ? 'DONE' : `${h.streak}d streak`}
              </span>
            </div>
            <div className="mt-2 flex gap-[2px]">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={`w-[6px] h-[6px] rounded-[1px] ${
                  i < h.streak ? 'bg-signal' : 'bg-white/10'
                }`} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DemoHealth() {
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink overflow-auto">
      <p className="text-sm font-syne font-bold text-white">Health</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { label: 'HR', value: '68', unit: 'bpm', color: 'text-red' },
          { label: 'HRV', value: '65', unit: 'ms', color: 'text-signal' },
          { label: 'SpO2', value: '98', unit: '%', color: 'text-cyan' },
          { label: 'Temp', value: '36.5', unit: '°C', color: 'text-amber' },
        ].map(v => (
          <div key={v.label} className="bg-white/5 rounded-xl p-3 text-center">
            <span className={`text-xl font-bold ${v.color}`}>{v.value}</span>
            <span className="text-[8px] text-ice3 ml-1">{v.unit}</span>
            <span className="text-[9px] font-mono text-ice3 block mt-1">{v.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-white/5 rounded-xl p-3">
        <span className="text-[10px] font-mono text-ice3">SLEEP — Last 7 nights</span>
        <div className="mt-2 flex items-end gap-1 h-20">
          {[7.2, 6.5, 8.1, 5.8, 7.5, 6.9, 7.8].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t bg-gradient-to-t from-violet to-cold" style={{ height: `${(h / 9) * 100}%` }} />
              <span className="text-[7px] text-ice3">{h}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoTasks() {
  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink overflow-auto">
      <p className="text-sm font-syne font-bold text-white">Circadian Schedule</p>
      <div className="mt-3 space-y-2">
        {[
          { period: 'Morning Deep Work', time: '06-11', tasks: ['Tactical review', 'Report writing'] },
          { period: 'Midday', time: '11-14', tasks: ['Team sync'] },
          { period: 'Afternoon', time: '14-18', tasks: ['Physical training'] },
          { period: 'Evening', time: '18-22', tasks: ['After-action report'] },
        ].map(s => (
          <div key={s.period} className="bg-white/5 rounded-xl p-2.5">
            <div className="flex justify-between">
              <span className="text-[10px] font-bold text-ice2">{s.period}</span>
              <span className="text-[8px] font-mono text-ice3">{s.time}</span>
            </div>
            {s.tasks.map(t => (
              <div key={t} className="mt-1.5 flex items-center gap-2 p-1.5 bg-white/5 rounded-lg">
                <div className="w-3 h-3 rounded border border-white/20" />
                <span className="text-[10px] text-ice2">{t}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoSpecialist() {
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const specs = [
    { label: 'Doctor', initials: 'EM', color: 'bg-signal', msg: 'HRV readings look stable. Continue recovery.' },
    { label: 'Psych', initials: 'AV', color: 'bg-violet', msg: 'How are you feeling about the upcoming exercise?' },
    { label: 'Trainer', initials: 'MC', color: 'bg-amber', msg: 'Great session today. ACWR looking optimal.' },
    { label: 'Cdr', initials: 'BA', color: 'bg-cold2', msg: 'Unit readiness brief at 0800 tomorrow.' },
  ];

  return (
    <div className="p-4 h-full bg-gradient-to-b from-[#0D1220] to-ink overflow-auto">
      <p className="text-sm font-syne font-bold text-white mb-4">Care Circle</p>
      {!selectedSpec ? (
        <div className="grid grid-cols-2 gap-3">
          {specs.map(s => (
            <button
              key={s.label}
              onClick={() => setSelectedSpec(s.label)}
              className="bg-white/5 rounded-xl p-3 flex flex-col items-center gap-2"
            >
              <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center`}>
                <span className="text-[10px] font-bold text-white">{s.initials}</span>
              </div>
              <span className="text-[10px] font-mono text-ice3">{s.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedSpec(null)} className="text-[10px] text-cyan mb-3">
            ← Back
          </button>
          <div className="bg-white/5 rounded-xl p-3 mb-3">
            <div className="text-[10px] text-ice3 font-mono mb-1">
              {specs.find(s => s.label === selectedSpec)?.label}
            </div>
            <p className="text-[11px] text-ice2">
              {specs.find(s => s.label === selectedSpec)?.msg}
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-[10px] text-ice2 placeholder-ice3/30 outline-none border border-white/5 focus:border-cyan/30"
            />
            <button className="bg-cyan px-3 rounded-lg text-[10px] text-ink font-bold">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

const screenComponents = [DemoHome, DemoHabits, DemoHealth, DemoTasks, DemoSpecialist];

export default function DemoPage() {
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white">
              Interactive Demo
            </h1>
            <p className="text-ice3 mt-4">
              Explore VitaNova&apos;s interface. Click, tap, interact — everything works.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <PhoneMockup scale={1.1}>
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

              <div className="absolute bottom-0 left-0 right-0 h-14 bg-ink/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-2">
                {screens.map((screen, i) => {
                  const Icon = screenIcons[i];
                  return (
                    <button
                      key={screen}
                      onClick={() => setActiveScreen(i)}
                      className={`flex flex-col items-center gap-0.5 transition-all ${
                        i === activeScreen ? 'text-cyan' : 'text-ice3/40'
                      }`}
                    >
                      <Icon size={16} />
                      {i === activeScreen && <span className="text-[7px] font-mono">{screen}</span>}
                    </button>
                  );
                })}
              </div>
            </PhoneMockup>

            <div className="flex gap-3 mt-8">
              {screens.map((screen, i) => (
                <button
                  key={screen}
                  onClick={() => setActiveScreen(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    i === activeScreen
                      ? 'bg-cyan/10 text-cyan border border-cyan/20'
                      : 'text-ice3/50 hover:text-ice3'
                  }`}
                >
                  {screen}
                </button>
              ))}
            </div>

            <div className="mt-12">
              <Link href="/download">
                <Button variant="signal" size="lg">
                  <Download size={18} className="mr-2" />
                  Download Full App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
