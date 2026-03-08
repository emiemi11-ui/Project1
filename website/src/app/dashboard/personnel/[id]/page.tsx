'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { personnel, generateTimeSeriesData, generateSleepData } from '@/lib/mockData';
import { ArrowLeft, Heart, Brain, Activity, Moon, Zap } from 'lucide-react';

const statusBadge = {
  ready: 'success' as const,
  monitor: 'warning' as const,
  risk: 'danger' as const,
  'non-deployable': 'danger' as const,
};

export default function PersonnelDetailPage() {
  const params = useParams();
  const person = personnel.find(p => p.id === params.id);

  if (!person) {
    return (
      <div className="text-center py-20">
        <p className="text-ice3">Personnel not found.</p>
        <Link href="/dashboard/personnel" className="text-cyan text-sm hover:underline mt-4 inline-block">
          Back to personnel list
        </Link>
      </div>
    );
  }

  const readinessData = generateTimeSeriesData(30, person.readiness, 15);
  const sleepData = generateSleepData(14);
  const stressData = generateTimeSeriesData(30, person.stress, 20);

  const radarAxes = [
    { label: 'Readiness', value: person.readiness },
    { label: 'Cognitive', value: person.cognitive },
    { label: 'HRV', value: (person.hrv / 80) * 100 },
    { label: 'Sleep', value: person.sleep },
    { label: 'Recovery', value: 100 - person.stress },
  ];

  return (
    <div className="space-y-6">
      <Link href="/dashboard/personnel" className="flex items-center gap-2 text-sm text-cyan hover:underline">
        <ArrowLeft size={16} />
        Back to Personnel
      </Link>

      {/* Profile header */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card variant="glass" className="flex-1">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cold/20 flex items-center justify-center">
              <span className="text-xl font-bold text-cold2">
                {person.name.split('. ')[1]?.[0] || person.name[0]}
              </span>
            </div>
            <div>
              <h1 className="font-syne text-xl font-bold text-white">{person.rank} {person.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-ice3">Unit: {person.unit}</span>
                <Badge variant={statusBadge[person.status]}>{person.status.toUpperCase()}</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Activity, label: 'Readiness', value: person.readiness, color: person.readiness >= 75 ? 'text-signal' : person.readiness >= 50 ? 'text-amber' : 'text-red' },
          { icon: Brain, label: 'Cognitive', value: person.cognitive, color: 'text-cyan' },
          { icon: Heart, label: 'HRV', value: `${person.hrv}ms`, color: 'text-violet' },
          { icon: Moon, label: 'Sleep', value: `${person.sleep}%`, color: 'text-cold2' },
          { icon: Zap, label: 'ACWR', value: person.acwr.toFixed(2), color: person.acwr > 1.5 ? 'text-red' : 'text-signal' },
        ].map(m => (
          <Card key={m.label} variant="default" className="text-center">
            <m.icon size={20} className={`${m.color} mx-auto mb-2`} />
            <div className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}</div>
            <div className="text-[10px] text-ice3 font-mono mt-1">{m.label.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      {/* Radar chart (simplified CSS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Performance Radar</h3>
          <div className="relative w-full aspect-square max-w-[300px] mx-auto">
            {/* Background rings */}
            {[100, 75, 50, 25].map(ring => (
              <div
                key={ring}
                className="absolute border border-white/5 rounded-full"
                style={{
                  width: `${ring}%`,
                  height: `${ring}%`,
                  top: `${(100 - ring) / 2}%`,
                  left: `${(100 - ring) / 2}%`,
                }}
              />
            ))}
            {/* Axes labels */}
            {radarAxes.map((axis, i) => {
              const angle = (i / radarAxes.length) * Math.PI * 2 - Math.PI / 2;
              const x = 50 + Math.cos(angle) * 48;
              const y = 50 + Math.sin(angle) * 48;
              return (
                <div
                  key={axis.label}
                  className="absolute text-[9px] font-mono text-ice3 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {axis.label}: {Math.round(axis.value)}
                </div>
              );
            })}
            {/* Value dots */}
            {radarAxes.map((axis, i) => {
              const angle = (i / radarAxes.length) * Math.PI * 2 - Math.PI / 2;
              const r = (axis.value / 100) * 40;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <div
                  key={`dot-${axis.label}`}
                  className="absolute w-2 h-2 bg-cyan rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              );
            })}
          </div>
        </Card>

        {/* Readiness Timeline */}
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Readiness — 30 Days</h3>
          <div className="h-48 flex items-end gap-[2px]">
            {readinessData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t transition-all ${
                    d.value >= 75 ? 'bg-signal/50' : d.value >= 50 ? 'bg-amber/50' : 'bg-red/50'
                  }`}
                  style={{ height: `${d.value}%` }}
                  title={`${d.date}: ${d.value}`}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sleep analysis */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Sleep Analysis — 14 Days</h3>
        <div className="h-40 flex items-end gap-1">
          {sleepData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col">
              <div className="bg-violet/40 rounded-t" style={{ height: `${(d.deep / 9) * 100}%` }} title={`Deep: ${d.deep}h`} />
              <div className="bg-cold/40" style={{ height: `${(d.rem / 9) * 100}%` }} title={`REM: ${d.rem}h`} />
              <div className="bg-cold2/30" style={{ height: `${(d.light / 9) * 100}%` }} title={`Light: ${d.light}h`} />
              <div className="text-center mt-1">
                <span className="text-[7px] text-ice3 font-mono">{d.total}h</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-violet/40" /><span className="text-[10px] text-ice3">Deep</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-cold/40" /><span className="text-[10px] text-ice3">REM</span></div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-cold2/30" /><span className="text-[10px] text-ice3">Light</span></div>
        </div>
      </Card>

      {/* Stress Heatmap */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Stress Heatmap — 30 Days</h3>
        <div className="grid grid-cols-10 gap-1">
          {stressData.map((d, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm cursor-pointer transition-all hover:scale-110"
              style={{
                backgroundColor: d.value > 70
                  ? 'rgba(232,48,80,0.6)'
                  : d.value > 50
                  ? 'rgba(240,160,0,0.5)'
                  : d.value > 30
                  ? 'rgba(240,160,0,0.2)'
                  : 'rgba(0,229,160,0.3)',
              }}
              title={`${d.date}: ${d.value}% stress`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
