'use client';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { personnel, getAllStats, getUnitStats, units } from '@/lib/mockData';
import { Shield, AlertTriangle, Activity, TrendingUp } from 'lucide-react';

const statusColors = {
  ready: 'bg-signal',
  monitor: 'bg-amber',
  risk: 'bg-red',
  'non-deployable': 'bg-red/60',
};

export default function ReadinessPage() {
  const stats = getAllStats();

  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Readiness Overview</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Activity, color: 'text-ice' },
          { label: 'Ready', value: stats.ready, icon: Shield, color: 'text-signal' },
          { label: 'Monitor', value: stats.monitor, icon: TrendingUp, color: 'text-amber' },
          { label: 'Risk', value: stats.risk, icon: AlertTriangle, color: 'text-red' },
          { label: 'Non-Deployable', value: stats.nonDeployable, icon: AlertTriangle, color: 'text-red' },
        ].map(s => (
          <Card key={s.label} variant="glass">
            <s.icon size={18} className={`${s.color} mb-2`} />
            <div className={`text-3xl font-bold font-mono ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-ice3 font-mono">{s.label.toUpperCase()}</div>
          </Card>
        ))}
      </div>

      {/* Platoon Heatmap */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Platoon Readiness Heatmap</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {units.map(unit => {
            const unitPersonnel = personnel.filter(p => p.unit === unit);
            const unitStats = getUnitStats(unit);
            return (
              <div key={unit} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-syne font-bold text-ice2">{unit}</span>
                  <span className="text-[10px] font-mono text-ice3">{unitStats.avgReadiness}%</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {unitPersonnel.map(p => (
                    <div
                      key={p.id}
                      className={`aspect-square rounded-md ${statusColors[p.status]} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}
                      title={`${p.rank} ${p.name}: ${p.readiness}%`}
                    >
                      <span className="text-[7px] font-mono text-white font-bold">{p.readiness}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Readiness per unit bar chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Readiness by Unit</h3>
          <div className="space-y-3">
            {units.map(unit => {
              const s = getUnitStats(unit);
              return (
                <div key={unit} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-ice2 w-16">{unit}</span>
                  <div className="flex-1 h-8 bg-white/5 rounded-lg overflow-hidden relative">
                    <div
                      className={`h-full rounded-lg ${s.avgReadiness >= 75 ? 'bg-signal/60' : s.avgReadiness >= 60 ? 'bg-amber/60' : 'bg-red/60'}`}
                      style={{ width: `${s.avgReadiness}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className="text-xs font-mono text-white font-bold">{s.avgReadiness}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Status distribution */}
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Status Distribution</h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-8 rounded-lg overflow-hidden flex">
              <div className="bg-signal" style={{ width: `${(stats.ready / stats.total) * 100}%` }} />
              <div className="bg-amber" style={{ width: `${(stats.monitor / stats.total) * 100}%` }} />
              <div className="bg-red" style={{ width: `${(stats.risk / stats.total) * 100}%` }} />
              <div className="bg-red/50" style={{ width: `${(stats.nonDeployable / stats.total) * 100}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Ready', value: stats.ready, color: 'bg-signal', pct: ((stats.ready / stats.total) * 100).toFixed(0) },
              { label: 'Monitor', value: stats.monitor, color: 'bg-amber', pct: ((stats.monitor / stats.total) * 100).toFixed(0) },
              { label: 'Risk', value: stats.risk, color: 'bg-red', pct: ((stats.risk / stats.total) * 100).toFixed(0) },
              { label: 'Non-Deployable', value: stats.nonDeployable, color: 'bg-red/50', pct: ((stats.nonDeployable / stats.total) * 100).toFixed(0) },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${s.color}`} />
                <span className="text-xs text-ice3">{s.label}: {s.value} ({s.pct}%)</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Predictive card */}
      <Card variant="glow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0">
            <TrendingUp size={24} className="text-violet" />
          </div>
          <div>
            <h3 className="text-sm font-syne font-bold text-white">Predictive Readiness</h3>
            <p className="text-xs text-ice3 mt-1">
              Based on current trends, overall readiness is projected to {stats.avgReadiness > 70 ? 'maintain' : 'decline by 5-8%'} over the next 7 days.
              {stats.risk > 0 && ` ${stats.risk} personnel in risk zone require immediate intervention.`}
            </p>
            <Badge variant="info" className="mt-2">ML PREDICTION — 7 DAY HORIZON</Badge>
          </div>
        </div>
      </Card>

      {/* Alert list */}
      <Card variant="default">
        <h3 className="text-sm font-syne font-bold text-white mb-4">Active Alerts</h3>
        <div className="space-y-2">
          {personnel.filter(p => p.status !== 'ready').map(p => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${statusColors[p.status]}`} />
                <div>
                  <span className="text-sm text-ice2">{p.rank} {p.name}</span>
                  <span className="text-xs text-ice3 ml-2">{p.unit}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-ice3">R:{p.readiness} S:{p.stress} ACWR:{p.acwr}</span>
                <Badge variant={p.status === 'non-deployable' ? 'danger' : p.status === 'risk' ? 'danger' : 'warning'}>
                  {p.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
