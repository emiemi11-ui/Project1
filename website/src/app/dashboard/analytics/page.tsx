'use client';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { BarChart3, GitBranch, Lightbulb } from 'lucide-react';

const correlations = [
  { pair: 'Sleep ↔ Readiness', r: 0.92, direction: 'positive', insight: 'Strong positive correlation. Each additional hour of sleep improves readiness by ~8 points.' },
  { pair: 'Stress ↔ Cognitive', r: -0.87, direction: 'negative', insight: 'High inverse correlation. Stress above 60% consistently degrades cognitive performance below 50.' },
  { pair: 'HRV ↔ Recovery', r: 0.84, direction: 'positive', insight: 'HRV above 60ms correlates with rapid recovery (2-3 days vs 5-7 days).' },
  { pair: 'Sleep < 6h ↔ Headaches', r: 0.84, direction: 'positive', insight: 'Personnel sleeping under 6 hours report headaches 3.2x more frequently.' },
  { pair: 'ACWR ↔ Injury Risk', r: 0.79, direction: 'positive', insight: 'ACWR above 1.5 increases injury probability by 340%.' },
  { pair: 'Cognitive ↔ Task Completion', r: 0.76, direction: 'positive', insight: 'Cognitive scores above 70 correlate with 94% task completion rate.' },
];

const patterns = [
  { pattern: 'Monday Stress Spike', description: 'Stress levels are 23% higher on Mondays across all units. HRV drops precede this by 12-18 hours (Sunday evening).', severity: 'info' as const },
  { pattern: 'Sleep Debt Cascade', description: '3 consecutive nights under 6h sleep triggers a readiness decline that takes 5-7 days to recover. Currently affecting 4 personnel.', severity: 'warning' as const },
  { pattern: 'Training Overload — Bravo', description: 'Bravo unit ACWR trending upward for 2 weeks. 2 personnel already in risk zone. Recommend 30% load reduction.', severity: 'danger' as const },
  { pattern: 'Seasonal Pattern', description: 'Historical data shows 15% readiness improvement in spring months. Current trend aligns with this pattern.', severity: 'success' as const },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Analytics & Insights</h1>

      {/* Trend cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Readiness (7d)', value: '74.2', trend: '+2.1%', color: 'text-signal', trendUp: true },
          { label: 'Avg Sleep (7d)', value: '6.8h', trend: '-0.3h', color: 'text-violet', trendUp: false },
          { label: 'Avg Stress (7d)', value: '38%', trend: '-4.2%', color: 'text-amber', trendUp: false },
          { label: 'Incident Rate', value: '0.02', trend: '-50%', color: 'text-signal', trendUp: false },
        ].map(t => (
          <Card key={t.label} variant="glass">
            <div className="text-[10px] font-mono text-ice3 mb-1">{t.label.toUpperCase()}</div>
            <div className={`text-2xl font-bold font-mono ${t.color}`}>{t.value}</div>
            <div className={`text-xs font-mono mt-1 ${t.trendUp ? 'text-signal' : t.label.includes('Stress') || t.label.includes('Incident') ? 'text-signal' : 'text-amber'}`}>
              {t.trend} vs prev week
            </div>
          </Card>
        ))}
      </div>

      {/* Correlation matrix */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch size={18} className="text-cyan" />
          <h3 className="text-sm font-syne font-bold text-white">Correlation Analysis</h3>
        </div>
        <div className="space-y-3">
          {correlations.map(c => (
            <div key={c.pair} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-ice2">{c.pair}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-mono font-bold ${
                    c.direction === 'positive' ? 'text-signal' : 'text-red'
                  }`}>
                    r = {c.direction === 'negative' ? '-' : ''}{c.r}
                  </span>
                  <div className="w-16 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.direction === 'positive' ? 'bg-signal' : 'bg-red'}`}
                      style={{ width: `${c.r * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-ice3">{c.insight}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Pattern Detection */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={18} className="text-amber" />
          <h3 className="text-sm font-syne font-bold text-white">Pattern Detection</h3>
          <Badge variant="info">AI POWERED</Badge>
        </div>
        <div className="space-y-3">
          {patterns.map(p => (
            <div key={p.pattern} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <Badge variant={p.severity}>
                {p.severity === 'danger' ? 'ALERT' : p.severity === 'warning' ? 'WATCH' : p.severity === 'success' ? 'TREND' : 'INFO'}
              </Badge>
              <div>
                <h4 className="text-sm font-bold text-ice2">{p.pattern}</h4>
                <p className="text-xs text-ice3 mt-1">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Population scatter hint */}
      <Card variant="glow">
        <div className="flex items-center gap-3">
          <BarChart3 size={24} className="text-violet" />
          <div>
            <h3 className="text-sm font-syne font-bold text-white">Population Comparison</h3>
            <p className="text-xs text-ice3 mt-1">
              Compare your unit&apos;s metrics against anonymized population baselines. Available in Formation and Command tiers.
            </p>
            <Badge variant="default" className="mt-2">FORMATION+ FEATURE</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
