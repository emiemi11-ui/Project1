import { useParams, useNavigate } from 'react-router-dom';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ResponsiveContainer,
} from 'recharts';
import personnelData from '../data/personnel.json';
import appointmentsData from '../data/appointments.json';
import programsData from '../data/programs.json';

const statusColors = {
  ready: 'bg-green-500/20 text-green-400 border-green-500/30',
  monitor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  risk: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'non-deployable': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const apptStatusColors = {
  scheduled: 'text-[#00d4ff]',
  completed: 'text-green-400',
  cancelled: 'text-gray-500',
};

export default function PersonnelDetail({ overrideId, hideBack } = {}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const person = personnelData.find((p) => p.id === (overrideId || id));

  if (!person) {
    return (
      <div className="text-gray-500 text-center py-16">
        Personnel not found.
        <button onClick={() => navigate(-1)} className="block mx-auto mt-4 text-[#00d4ff] text-sm">
          Go back
        </button>
      </div>
    );
  }

  const radarData = [
    { metric: 'Readiness', value: person.readiness },
    { metric: 'HRV', value: (person.hrv / 100) * 100 },
    { metric: 'Sleep', value: person.sleepQuality },
    { metric: 'Stress Inv.', value: 100 - person.stressLevel },
    { metric: 'ACWR Norm.', value: (2 - person.acwr) * 50 },
  ];

  const appointments = appointmentsData.filter((a) => a.personnelId === person.id);
  const programs = programsData.filter((pr) => pr.assignedTo.includes(person.id));

  return (
    <div>
      {!hideBack && (
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-[#00d4ff] transition-colors mb-6"
        >
          ← Back to Personnel
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-[#12121a] border border-white/10 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-200">{person.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Unit: {person.unit}</p>
            </div>
            <span className={`text-xs px-3 py-1 border ${statusColors[person.status]}`}>
              {person.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Readiness', value: `${person.readiness}%`, color: 'text-[#00d4ff]' },
              { label: 'HRV', value: person.hrv, color: 'text-gray-200' },
              { label: 'Sleep Quality', value: `${person.sleepQuality}%`, color: 'text-gray-200' },
              { label: 'Stress Level', value: `${person.stressLevel}%`, color: person.stressLevel > 60 ? 'text-red-400' : 'text-gray-200' },
              { label: 'ACWR', value: person.acwr, color: person.acwr > 1.5 ? 'text-orange-400' : 'text-gray-200' },
              { label: 'Last Updated', value: new Date(person.lastUpdated).toLocaleDateString(), color: 'text-gray-400' },
            ].map((item) => (
              <div key={item.label} className="bg-[#0a0a0f] border border-white/5 p-3">
                <p className="text-[10px] text-gray-600 uppercase tracking-wider font-mono">{item.label}</p>
                <p className={`text-lg font-mono mt-1 ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-[#12121a] border border-white/10 p-6">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-4">
            Performance Profile
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 11 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#4b5563', fontSize: 10 }} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#00d4ff"
                fill="#00d4ff"
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Appointments */}
        <div className="bg-[#12121a] border border-white/10 p-6">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-4">
            Appointments
          </h3>
          {appointments.length === 0 ? (
            <p className="text-gray-600 text-sm">No appointments scheduled</p>
          ) : (
            <div className="space-y-3">
              {appointments.map((a) => (
                <div key={a.id} className="bg-[#0a0a0f] border border-white/5 p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">{a.notes}</p>
                    <p className="text-xs text-gray-600 mt-1 font-mono">
                      {a.date} · {a.time} · {a.type}
                    </p>
                  </div>
                  <span className={`text-xs font-mono ${apptStatusColors[a.status]}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Programs */}
        <div className="bg-[#12121a] border border-white/10 p-6">
          <h3 className="text-sm text-gray-500 uppercase tracking-wider font-mono mb-4">
            Assigned Programs
          </h3>
          {programs.length === 0 ? (
            <p className="text-gray-600 text-sm">No programs assigned</p>
          ) : (
            <div className="space-y-3">
              {programs.map((pr) => (
                <div key={pr.id} className="bg-[#0a0a0f] border border-white/5 p-3">
                  <p className="text-sm text-gray-300">{pr.name}</p>
                  <p className="text-xs text-gray-600 mt-1 font-mono">
                    {pr.type} · {pr.duration} · {pr.intensity} intensity
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
