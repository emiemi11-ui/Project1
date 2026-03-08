'use client';
import Card from '@/components/ui/Card';
import { personnel, generateTimeSeriesData, generateSleepData } from '@/lib/mockData';
import { Brain, Heart, Moon, Zap } from 'lucide-react';

export default function MyDataPage() {
  const me = personnel[0];
  const readinessData = generateTimeSeriesData(30, me.readiness, 12);
  const sleepData = generateSleepData(7);

  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">My Health Data</h1>

      {/* Main score */}
      <Card variant="glow" className="text-center py-8">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#00E5A0" strokeWidth="6" strokeDasharray={`${me.readiness * 2.64} 264`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-signal font-mono">{me.readiness}</span>
            <span className="text-[10px] font-mono text-ice3">READINESS</span>
          </div>
        </div>
        <p className="text-sm text-ice3 mt-4">Your overall readiness score is <span className="text-signal font-bold">excellent</span>.</p>
      </Card>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Brain, label: 'Cognitive', value: me.cognitive, unit: '/100', color: 'text-cyan' },
          { icon: Heart, label: 'HRV', value: me.hrv, unit: 'ms', color: 'text-violet' },
          { icon: Moon, label: 'Sleep Quality', value: me.sleep, unit: '%', color: 'text-cold2' },
          { icon: Zap, label: 'Stress', value: me.stress, unit: '%', color: me.stress > 50 ? 'text-red' : 'text-signal' },
        ].map(m => (
          <Card key={m.label} variant="default" className="text-center">
            <m.icon size={20} className={`${m.color} mx-auto mb-2`} />
            <div className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}<span className="text-xs text-ice3">{m.unit}</span></div>
            <div className="text-[10px] text-ice3 font-mono">{m.label.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      {/* Readiness trend */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Readiness — 30 Days</h3>
        <div className="h-32 flex items-end gap-[2px]">
          {readinessData.map((d, i) => (
            <div key={i} className="flex-1">
              <div
                className={`w-full rounded-t ${d.value >= 75 ? 'bg-signal/50' : d.value >= 50 ? 'bg-amber/50' : 'bg-red/50'}`}
                style={{ height: `${d.value}%` }}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Sleep */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Sleep — Last 7 Nights</h3>
        <div className="h-32 flex items-end gap-2">
          {sleepData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col">
              <div className="bg-violet/40 rounded-t" style={{ height: `${(d.deep / 9) * 100}%` }} />
              <div className="bg-cold/40" style={{ height: `${(d.rem / 9) * 100}%` }} />
              <div className="bg-cold2/30" style={{ height: `${(d.light / 9) * 100}%` }} />
              <div className="text-center mt-1">
                <span className="text-[8px] text-ice3 font-mono">{d.total}h</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Energy budget */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Today&apos;s Energy Budget</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-signal to-cyan rounded-full" style={{ width: '62%' }} />
          </div>
          <span className="text-lg font-bold font-mono text-signal">62/100</span>
        </div>
        <p className="text-xs text-ice3 mt-2">You have 62 energy points remaining today. Use them wisely.</p>
      </Card>
    </div>
  );
}
