import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import personnelData from '../data/personnel.json';

const STATUS_COLORS = {
  ready: '#22c55e',
  monitor: '#eab308',
  risk: '#f97316',
  'non-deployable': '#ef4444',
};

export default function ReadinessPage() {
  const stats = useMemo(() => {
    const total = personnelData.length;
    const ready = personnelData.filter((p) => p.status === 'ready').length;
    const monitor = personnelData.filter((p) => p.status === 'monitor').length;
    const risk = personnelData.filter((p) => p.status === 'risk').length;
    const nonDeployable = personnelData.filter((p) => p.status === 'non-deployable').length;
    return { total, ready, monitor, risk, nonDeployable };
  }, []);

  const unitData = useMemo(() => {
    const units = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
    return units.map((unit) => {
      const members = personnelData.filter((p) => p.unit === unit);
      const avg = members.length
        ? Math.round(members.reduce((s, p) => s + p.readiness, 0) / members.length)
        : 0;
      return { unit, readiness: avg };
    });
  }, []);

  const pieData = useMemo(() => [
    { name: 'Ready', value: stats.ready },
    { name: 'Monitor', value: stats.monitor },
    { name: 'Risk', value: stats.risk },
    { name: 'Non-Deployable', value: stats.nonDeployable },
  ], [stats]);

  const summaryCards = [
    { label: 'Total Personnel', value: stats.total, color: 'text-[#00d4ff]' },
    { label: 'Ready', value: stats.ready, color: 'text-green-400' },
    { label: 'Monitor', value: stats.monitor, color: 'text-yellow-400' },
    { label: 'Risk', value: stats.risk, color: 'text-orange-400' },
    { label: 'Non-Deployable', value: stats.nonDeployable, color: 'text-red-400' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 tracking-wide mb-6">
        Readiness Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-[#12121a] border border-white/10 p-4">
            <p className="text-[10px] text-gray-600 uppercase tracking-wider font-mono">{card.label}</p>
            <p className={`text-2xl font-mono mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-[#12121a] border border-white/10 p-6">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-4">
            Average Readiness by Unit
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={unitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="unit" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: '#12121a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#e5e7eb',
                  fontSize: 12,
                }}
              />
              <Bar dataKey="readiness" fill="#00d4ff" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#12121a] border border-white/10 p-6">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-4">
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name.toLowerCase().replace('-', '-')] || STATUS_COLORS[entry.name === 'Non-Deployable' ? 'non-deployable' : entry.name.toLowerCase()]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#12121a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#e5e7eb',
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, color: '#9ca3af' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
