import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import personnelData from '../data/personnel.json';
import appointmentsData from '../data/appointments.json';

const statusColors = {
  ready: 'bg-green-500/20 text-green-400 border-green-500/30',
  monitor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  risk: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'non-deployable': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function PersonnelPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [unitFilter, setUnitFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const units = [...new Set(personnelData.map((p) => p.unit))];

  const personnel = useMemo(() => {
    let data = personnelData;

    // Role-based filtering
    if (user?.role === 'physician') {
      const myPatientIds = appointmentsData
        .filter((a) => a.specialistId === user.id && a.type === 'medical')
        .map((a) => a.personnelId);
      data = data.filter((p) => myPatientIds.includes(p.id));
    } else if (user?.role === 'psychologist') {
      const myPatientIds = appointmentsData
        .filter((a) => a.specialistId === user.id && a.type === 'psychological')
        .map((a) => a.personnelId);
      data = data.filter((p) => myPatientIds.includes(p.id));
    } else if (user?.role === 'trainer') {
      const myPatientIds = appointmentsData
        .filter((a) => a.specialistId === user.id && a.type === 'training')
        .map((a) => a.personnelId);
      data = data.filter((p) => myPatientIds.includes(p.id));
    }

    if (unitFilter !== 'all') data = data.filter((p) => p.unit === unitFilter);
    if (statusFilter !== 'all') data = data.filter((p) => p.status === statusFilter);

    return data;
  }, [unitFilter, statusFilter, user]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-200 tracking-wide">
          Personnel
        </h2>
        <div className="flex gap-3">
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="bg-[#12121a] border border-white/10 text-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#00d4ff]/50"
          >
            <option value="all">All Units</option>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#12121a] border border-white/10 text-gray-300 text-sm px-3 py-2 focus:outline-none focus:border-[#00d4ff]/50"
          >
            <option value="all">All Status</option>
            <option value="ready">Ready</option>
            <option value="monitor">Monitor</option>
            <option value="risk">Risk</option>
            <option value="non-deployable">Non-Deployable</option>
          </select>
        </div>
      </div>

      <div className="bg-[#12121a] border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Name</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Unit</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Readiness</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Status</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">HRV</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Sleep</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Stress</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">ACWR</th>
            </tr>
          </thead>
          <tbody>
            {personnel.map((p) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/dashboard/personnel/${p.id}`)}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 text-gray-200">{p.name}</td>
                <td className="px-4 py-3 text-gray-400">{p.unit}</td>
                <td className="px-4 py-3">
                  <span className="text-[#00d4ff] font-mono">{p.readiness}%</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 border ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 font-mono">{p.hrv}</td>
                <td className="px-4 py-3 text-gray-400 font-mono">{p.sleepQuality}</td>
                <td className="px-4 py-3 text-gray-400 font-mono">{p.stressLevel}</td>
                <td className="px-4 py-3 text-gray-400 font-mono">{p.acwr}</td>
              </tr>
            ))}
            {personnel.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-600">
                  No personnel found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
