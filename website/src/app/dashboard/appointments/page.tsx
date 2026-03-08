'use client';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { appointments } from '@/lib/mockData';
// icons used inline

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Appointments</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Upcoming</h3>
          <div className="space-y-3">
            {appointments.map(a => (
              <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-mono text-cyan">{a.date.split('-')[2]}</span>
                  <span className="text-[8px] font-mono text-ice3">MAR</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-ice2">{a.title}</div>
                  <div className="text-xs text-ice3">{a.specialist} — {a.person}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-cyan">{a.time}</div>
                  <Badge variant="info">{a.status.toUpperCase()}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card variant="default">
          <h3 className="text-sm font-syne font-bold text-white mb-4">Calendar View</h3>
          <div className="grid grid-cols-7 gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="text-center text-[9px] font-mono text-ice3 py-1">{d}</div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 5;
              const hasAppointment = [10, 11, 12, 13].includes(day);
              return (
                <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-mono ${
                  day < 1 || day > 31 ? 'text-ice3/20' :
                  hasAppointment ? 'bg-cyan/10 text-cyan border border-cyan/20' :
                  day === 8 ? 'bg-signal/10 text-signal border border-signal/20' :
                  'text-ice3 hover:bg-white/5'
                }`}>
                  {day >= 1 && day <= 31 ? day : ''}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
