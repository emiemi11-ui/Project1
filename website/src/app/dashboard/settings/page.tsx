'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { User, Shield, Bell, Download, Trash2, FileText } from 'lucide-react';

const dataTypes = ['Vitals (HR, SpO2, HRV)', 'Sleep', 'Mood / Stress', 'Productivity', 'Medications'];
const specialists = ['Physician', 'Psychologist', 'Trainer', 'Commander'];

const defaultMatrix: Record<string, Record<string, 'on' | 'partial' | 'off' | 'readiness'>> = {
  'Vitals (HR, SpO2, HRV)': { Physician: 'on', Psychologist: 'partial', Trainer: 'on', Commander: 'on' },
  'Sleep': { Physician: 'on', Psychologist: 'on', Trainer: 'on', Commander: 'on' },
  'Mood / Stress': { Physician: 'partial', Psychologist: 'on', Trainer: 'readiness', Commander: 'readiness' },
  'Productivity': { Physician: 'off', Psychologist: 'on', Trainer: 'off', Commander: 'partial' },
  'Medications': { Physician: 'on', Psychologist: 'partial', Trainer: 'off', Commander: 'off' },
};

const statusColors = {
  on: 'bg-signal text-ink',
  partial: 'bg-amber/20 text-amber border border-amber/30',
  off: 'bg-white/5 text-ice3/50',
  readiness: 'bg-cold/20 text-cold2 border border-cold/30',
};

const statusLabels = {
  on: 'FULL',
  partial: 'PARTIAL',
  off: 'OFF',
  readiness: 'SCORE ONLY',
};

export default function SettingsPage() {
  const { user } = useAuth();
  const [matrix, setMatrix] = useState(defaultMatrix);

  if (!user) return null;

  const cycleStatus = (dataType: string, specialist: string) => {
    const order: ('on' | 'partial' | 'off' | 'readiness')[] = ['on', 'partial', 'readiness', 'off'];
    const current = matrix[dataType][specialist];
    const nextIdx = (order.indexOf(current) + 1) % order.length;
    setMatrix({
      ...matrix,
      [dataType]: { ...matrix[dataType], [specialist]: order[nextIdx] },
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Settings</h1>

      {/* Profile */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-cyan" />
          <h3 className="text-sm font-syne font-bold text-white">Profile</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-ice3 mb-1 block">NAME</label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ice outline-none focus:border-cyan/30"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-ice3 mb-1 block">EMAIL</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-ice outline-none focus:border-cyan/30"
              readOnly
            />
          </div>
        </div>
      </Card>

      {/* Privacy Control Center */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-signal" />
          <h3 className="text-sm font-syne font-bold text-white">Privacy Control Center</h3>
          <Badge variant="info">GRANULAR CONSENT</Badge>
        </div>
        <p className="text-xs text-ice3 mb-4">
          Control exactly what data each specialist can access. Click cells to cycle through access levels.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-3 py-2 text-[10px] font-mono text-ice3">DATA TYPE</th>
                {specialists.map(s => (
                  <th key={s} className="text-center px-3 py-2 text-[10px] font-mono text-ice3">{s.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTypes.map(dt => (
                <tr key={dt} className="border-b border-white/5">
                  <td className="px-3 py-3 text-xs text-ice2">{dt}</td>
                  {specialists.map(s => {
                    const status = matrix[dt][s];
                    return (
                      <td key={s} className="px-3 py-3 text-center">
                        <button
                          onClick={() => cycleStatus(dt, s)}
                          className={`inline-flex px-2 py-1 text-[9px] font-mono font-bold rounded-md transition-all hover:scale-105 ${statusColors[status]}`}
                        >
                          {statusLabels[status]}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-signal" /><span className="text-[10px] text-ice3">Full Access</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber/30 border border-amber/30" /><span className="text-[10px] text-ice3">Partial</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cold/20 border border-cold/30" /><span className="text-[10px] text-ice3">Score Only</span></div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white/5" /><span className="text-[10px] text-ice3">Off</span></div>
        </div>
      </Card>

      {/* Notifications */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-amber" />
          <h3 className="text-sm font-syne font-bold text-white">Notifications</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Readiness Alerts', desc: 'When personnel drop below threshold', default: true },
            { label: 'Anomaly Detection', desc: 'When vitals show abnormal patterns', default: true },
            { label: 'Message Notifications', desc: 'New messages from specialists', default: true },
            { label: 'Weekly Reports', desc: 'Summary email every Monday', default: false },
          ].map(n => (
            <div key={n.label} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
              <div>
                <span className="text-sm text-ice2">{n.label}</span>
                <span className="text-xs text-ice3 block">{n.desc}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={n.default} className="sr-only peer" />
                <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:bg-signal/50 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </Card>

      {/* Data management */}
      <Card variant="default">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-violet" />
          <h3 className="text-sm font-syne font-bold text-white">Data Management</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="ghost" size="sm">
            <Download size={14} className="mr-2" />
            EXPORT MY DATA
          </Button>
          <Button variant="danger" size="sm">
            <Trash2 size={14} className="mr-2" />
            DELETE ALL DATA
          </Button>
        </div>
        <p className="text-[10px] text-ice3 mt-3">
          Data export includes all personal metrics, messages, and activity logs in JSON format.
          Data deletion is permanent and cannot be undone.
        </p>
      </Card>
    </div>
  );
}
