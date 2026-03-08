'use client';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { personnel, getAllStats, getUnitStats, units, appointments } from '@/lib/mockData';
import { Activity, Users, AlertTriangle, Shield, Heart, Brain, TrendingUp } from 'lucide-react';

function CommanderOverview() {
  const stats = getAllStats();
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Command Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Users, color: 'text-ice' },
          { label: 'Ready', value: stats.ready, icon: Shield, color: 'text-signal' },
          { label: 'Monitor', value: stats.monitor, icon: Activity, color: 'text-amber' },
          { label: 'Risk', value: stats.risk, icon: AlertTriangle, color: 'text-red' },
          { label: 'Non-Deployable', value: stats.nonDeployable, icon: AlertTriangle, color: 'text-red' },
        ].map(s => (
          <Card key={s.label} variant="glass">
            <div className="flex items-center gap-3">
              <s.icon size={20} className={s.color} />
              <div>
                <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-ice3 font-mono">{s.label.toUpperCase()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Readiness by Unit</h3>
          <div className="space-y-3">
            {units.map(unit => {
              const s = getUnitStats(unit);
              return (
                <div key={unit} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-ice2 w-16">{unit}</span>
                  <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full ${s.avgReadiness >= 75 ? 'bg-signal' : s.avgReadiness >= 60 ? 'bg-amber' : 'bg-red'}`}
                      style={{ width: `${s.avgReadiness}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white font-bold">
                      {s.avgReadiness}%
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-ice3 w-24 text-right">
                    {s.ready}R {s.monitor}M {s.risk}K
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Critical Alerts</h3>
          <div className="space-y-3">
            {personnel.filter(p => p.status === 'non-deployable' || p.status === 'risk').map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-red/5 border border-red/10">
                <div>
                  <span className="text-sm font-bold text-red">{p.rank} {p.name}</span>
                  <span className="text-xs text-ice3 ml-2">{p.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-ice3">R:{p.readiness}</span>
                  <Badge variant={p.status === 'non-deployable' ? 'danger' : 'warning'}>
                    {p.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">30-Day Readiness Trend</h3>
        <div className="h-40 flex items-end gap-1">
          {Array.from({ length: 30 }, (_, i) => {
            const value = 65 + Math.sin(i * 0.3) * 10 + (Math.random() - 0.5) * 8;
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t ${value >= 75 ? 'bg-signal/60' : value >= 60 ? 'bg-amber/60' : 'bg-red/60'}`}
                  style={{ height: `${value}%` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-ice3 font-mono">30 days ago</span>
          <span className="text-[10px] text-ice3 font-mono">Today</span>
        </div>
      </Card>
    </div>
  );
}

function PhysicianOverview() {
  const patientsWithAnomalies = personnel.filter(p => p.stress > 60 || p.hrv < 40);
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Medical Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass"><Heart size={20} className="text-signal mb-2" /><div className="text-2xl font-bold text-signal font-mono">{personnel.length}</div><div className="text-[10px] text-ice3 font-mono">TOTAL PATIENTS</div></Card>
        <Card variant="glass"><AlertTriangle size={20} className="text-amber mb-2" /><div className="text-2xl font-bold text-amber font-mono">{patientsWithAnomalies.length}</div><div className="text-[10px] text-ice3 font-mono">ANOMALIES</div></Card>
        <Card variant="glass"><Activity size={20} className="text-cyan mb-2" /><div className="text-2xl font-bold text-cyan font-mono">87%</div><div className="text-[10px] text-ice3 font-mono">MED ADHERENCE</div></Card>
        <Card variant="glass"><TrendingUp size={20} className="text-violet mb-2" /><div className="text-2xl font-bold text-violet font-mono">54ms</div><div className="text-[10px] text-ice3 font-mono">AVG HRV</div></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Upcoming Appointments</h3>
          {appointments.filter(a => a.role === 'physician').map(a => (
            <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 mb-2">
              <div><span className="text-sm text-ice2">{a.title}</span><span className="text-xs text-ice3 block">{a.person}</span></div>
              <div className="text-right"><span className="text-xs font-mono text-cyan">{a.date}</span><span className="text-xs text-ice3 block">{a.time}</span></div>
            </div>
          ))}
        </Card>
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Anomaly Alerts</h3>
          {patientsWithAnomalies.slice(0, 4).map(p => (
            <div key={p.id} className="p-3 rounded-lg bg-amber/5 border border-amber/10 mb-2">
              <span className="text-xs font-bold text-amber">{p.rank} {p.name} — {p.unit}</span>
              <div className="text-[10px] text-ice3 mt-1">
                HRV: {p.hrv}ms | Stress: {p.stress}% | Sleep: {p.sleep}%
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

function UserOverview() {
  const me = personnel[0];
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">My Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#00E5A0" strokeWidth="6" strokeDasharray={`${me.readiness * 2.64} 264`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-signal">{me.readiness}</span>
            </div>
          </div>
          <div className="text-[10px] text-ice3 font-mono mt-2">READINESS</div>
        </Card>
        <Card variant="glass" className="text-center">
          <Brain size={24} className="text-cyan mx-auto mb-2" />
          <div className="text-2xl font-bold text-cyan font-mono">{me.cognitive}</div>
          <div className="text-[10px] text-ice3 font-mono">COGNITIVE</div>
        </Card>
        <Card variant="glass" className="text-center">
          <Activity size={24} className="text-violet mx-auto mb-2" />
          <div className="text-2xl font-bold text-violet font-mono">{me.hrv}ms</div>
          <div className="text-[10px] text-ice3 font-mono">HRV</div>
        </Card>
        <Card variant="glass" className="text-center">
          <Heart size={24} className="text-red mx-auto mb-2" />
          <div className="text-2xl font-bold text-red font-mono">{me.stress}%</div>
          <div className="text-[10px] text-ice3 font-mono">STRESS</div>
        </Card>
      </div>
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Energy Budget</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-signal to-cyan rounded-full" style={{ width: '62%' }} />
          </div>
          <span className="text-sm font-mono text-signal">62/100</span>
        </div>
      </Card>
    </div>
  );
}

function DefaultOverview() {
  const stats = getAllStats();
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass"><div className="text-2xl font-bold text-signal font-mono">{stats.total}</div><div className="text-[10px] text-ice3 font-mono">PERSONNEL</div></Card>
        <Card variant="glass"><div className="text-2xl font-bold text-signal font-mono">{stats.avgReadiness}%</div><div className="text-[10px] text-ice3 font-mono">AVG READINESS</div></Card>
        <Card variant="glass"><div className="text-2xl font-bold text-amber font-mono">{stats.monitor + stats.risk}</div><div className="text-[10px] text-ice3 font-mono">NEED ATTENTION</div></Card>
        <Card variant="glass"><div className="text-2xl font-bold text-red font-mono">{stats.nonDeployable}</div><div className="text-[10px] text-ice3 font-mono">NON-DEPLOYABLE</div></Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case 'commander':
    case 'admin':
      return <CommanderOverview />;
    case 'physician':
      return <PhysicianOverview />;
    case 'user':
      return <UserOverview />;
    default:
      return <DefaultOverview />;
  }
}
