'use client';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Dumbbell } from 'lucide-react';

const programs = [
  {
    name: 'Combat Readiness Alpha',
    type: 'Strength & Conditioning',
    participants: 12,
    duration: '8 weeks',
    progress: 65,
    status: 'active',
    description: 'Progressive overload program targeting operational strength. Focus on functional movements.',
  },
  {
    name: 'Recovery Protocol B-2',
    type: 'Recovery',
    participants: 4,
    duration: '3 weeks',
    progress: 40,
    status: 'active',
    description: 'Reduced load program for personnel in ACWR risk zone. Mobility, flexibility, and active recovery.',
  },
  {
    name: 'Endurance Base Build',
    type: 'Cardio',
    participants: 18,
    duration: '12 weeks',
    progress: 80,
    status: 'active',
    description: 'Aerobic base building with zone-2 training. Includes ruck march progression.',
  },
  {
    name: 'Pre-Deployment Prep',
    type: 'Mixed',
    participants: 30,
    duration: '6 weeks',
    progress: 0,
    status: 'scheduled',
    description: 'Comprehensive readiness program covering all physical demands of deployment.',
  },
];

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Training Programs</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="glass"><div className="text-2xl font-bold text-signal font-mono">3</div><div className="text-[10px] text-ice3 font-mono">ACTIVE PROGRAMS</div></Card>
        <Card variant="glass"><div className="text-2xl font-bold text-cyan font-mono">64</div><div className="text-[10px] text-ice3 font-mono">PARTICIPANTS</div></Card>
        <Card variant="glass"><div className="text-2xl font-bold text-amber font-mono">4</div><div className="text-[10px] text-ice3 font-mono">IN RECOVERY</div></Card>
        <Card variant="glass"><div className="text-2xl font-bold text-violet font-mono">1</div><div className="text-[10px] text-ice3 font-mono">SCHEDULED</div></Card>
      </div>

      <div className="space-y-4">
        {programs.map(p => (
          <Card key={p.name} variant="glow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center shrink-0">
                  <Dumbbell size={20} className="text-amber" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-syne font-bold text-white">{p.name}</h3>
                    <Badge variant={p.status === 'active' ? 'success' : 'info'}>
                      {p.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-ice3 mt-1">{p.description}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-[10px] font-mono text-ice3">{p.type}</span>
                    <span className="text-[10px] font-mono text-ice3">{p.participants} participants</span>
                    <span className="text-[10px] font-mono text-ice3">{p.duration}</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-48">
                <div className="flex justify-between text-[10px] font-mono text-ice3 mb-1">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-signal rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
