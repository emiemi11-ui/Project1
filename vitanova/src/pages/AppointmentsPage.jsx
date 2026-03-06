import { useAuth } from '../hooks/useAuth';
import appointmentsData from '../data/appointments.json';
import personnelData from '../data/personnel.json';

const statusColors = {
  scheduled: 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/20',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  cancelled: 'bg-gray-500/20 text-gray-500 border-gray-500/30',
};

const typeColors = {
  medical: 'text-blue-400',
  psychological: 'text-purple-400',
  training: 'text-green-400',
};

export default function AppointmentsPage() {
  const { user } = useAuth();

  const personnelMap = Object.fromEntries(personnelData.map((p) => [p.id, p.name]));

  let appointments = appointmentsData;
  if (user?.role === 'physician' || user?.role === 'psychologist' || user?.role === 'trainer') {
    appointments = appointments.filter((a) => a.specialistId === user.id);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 tracking-wide mb-6">
        Appointments
      </h2>

      <div className="bg-[#12121a] border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Personnel</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Type</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Date</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Time</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Status</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-gray-200">
                  {personnelMap[a.personnelId] || a.personnelId}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-mono uppercase ${typeColors[a.type]}`}>
                    {a.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 font-mono">{a.date}</td>
                <td className="px-4 py-3 text-gray-400 font-mono">{a.time}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 border ${statusColors[a.status]}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{a.notes}</td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
