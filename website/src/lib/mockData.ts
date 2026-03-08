export interface Person {
  id: string;
  rank: string;
  name: string;
  unit: string;
  readiness: number;
  hrv: number;
  sleep: number;
  stress: number;
  acwr: number;
  status: 'ready' | 'monitor' | 'risk' | 'non-deployable';
  cognitive: number;
}

export const personnel: Person[] = [
  // Alpha
  { id: 'p01', rank: 'Cpl.', name: 'R. Stanescu', unit: 'Alpha', readiness: 92, hrv: 68, sleep: 85, stress: 22, acwr: 1.05, status: 'ready', cognitive: 78 },
  { id: 'p02', rank: 'Sgt.', name: 'M. Popescu', unit: 'Alpha', readiness: 87, hrv: 62, sleep: 78, stress: 35, acwr: 1.12, status: 'ready', cognitive: 72 },
  { id: 'p03', rank: 'Lt.', name: 'A. Dumitru', unit: 'Alpha', readiness: 64, hrv: 45, sleep: 52, stress: 58, acwr: 1.48, status: 'monitor', cognitive: 55 },
  { id: 'p19', rank: 'Lt.', name: 'K. Toma', unit: 'Alpha', readiness: 85, hrv: 60, sleep: 80, stress: 30, acwr: 1.08, status: 'ready', cognitive: 70 },
  { id: 'p23', rank: 'Pvt.', name: 'A. Mihai', unit: 'Alpha', readiness: 90, hrv: 66, sleep: 88, stress: 20, acwr: 0.95, status: 'ready', cognitive: 80 },
  // Bravo
  { id: 'p04', rank: 'Pvt.', name: 'I. Radu', unit: 'Bravo', readiness: 95, hrv: 72, sleep: 90, stress: 15, acwr: 0.92, status: 'ready', cognitive: 85 },
  { id: 'p05', rank: 'Cpl.', name: 'V. Munteanu', unit: 'Bravo', readiness: 43, hrv: 38, sleep: 35, stress: 72, acwr: 1.65, status: 'risk', cognitive: 35 },
  { id: 'p06', rank: 'Sgt.', name: 'N. Gheorghe', unit: 'Bravo', readiness: 78, hrv: 55, sleep: 70, stress: 40, acwr: 1.18, status: 'ready', cognitive: 65 },
  { id: 'p20', rank: 'Pvt.', name: 'J. Matei', unit: 'Bravo', readiness: 50, hrv: 40, sleep: 42, stress: 65, acwr: 1.55, status: 'monitor', cognitive: 42 },
  { id: 'p24', rank: 'Cpl.', name: 'D. Enache', unit: 'Bravo', readiness: 82, hrv: 58, sleep: 76, stress: 33, acwr: 1.10, status: 'ready', cognitive: 68 },
  // Charlie
  { id: 'p07', rank: 'Lt.', name: 'F. Constantin', unit: 'Charlie', readiness: 88, hrv: 65, sleep: 82, stress: 28, acwr: 1.02, status: 'ready', cognitive: 75 },
  { id: 'p08', rank: 'Pvt.', name: 'D. Vasile', unit: 'Charlie', readiness: 55, hrv: 42, sleep: 48, stress: 62, acwr: 1.52, status: 'monitor', cognitive: 48 },
  { id: 'p09', rank: 'Cpl.', name: 'S. Ionescu', unit: 'Charlie', readiness: 30, hrv: 32, sleep: 28, stress: 80, acwr: 1.85, status: 'non-deployable', cognitive: 25 },
  { id: 'p21', rank: 'Cpl.', name: 'W. Luca', unit: 'Charlie', readiness: 96, hrv: 74, sleep: 94, stress: 10, acwr: 0.85, status: 'ready', cognitive: 88 },
  { id: 'p25', rank: 'Sgt.', name: 'R. Crisan', unit: 'Charlie', readiness: 71, hrv: 50, sleep: 66, stress: 44, acwr: 1.25, status: 'ready', cognitive: 60 },
  // Delta
  { id: 'p10', rank: 'Sgt.', name: 'G. Moldovan', unit: 'Delta', readiness: 91, hrv: 70, sleep: 88, stress: 18, acwr: 0.95, status: 'ready', cognitive: 82 },
  { id: 'p11', rank: 'Lt.', name: 'P. Diaconu', unit: 'Delta', readiness: 82, hrv: 58, sleep: 75, stress: 32, acwr: 1.10, status: 'ready', cognitive: 71 },
  { id: 'p12', rank: 'Pvt.', name: 'C. Barbu', unit: 'Delta', readiness: 68, hrv: 48, sleep: 60, stress: 50, acwr: 1.35, status: 'monitor', cognitive: 58 },
  { id: 'p22', rank: 'Sgt.', name: 'Q. Nistor', unit: 'Delta', readiness: 25, hrv: 30, sleep: 25, stress: 85, acwr: 1.92, status: 'non-deployable', cognitive: 20 },
  { id: 'p26', rank: 'Lt.', name: 'M. Badea', unit: 'Delta', readiness: 79, hrv: 56, sleep: 74, stress: 38, acwr: 1.15, status: 'ready', cognitive: 67 },
  // Echo
  { id: 'p13', rank: 'Cpl.', name: 'T. Neagu', unit: 'Echo', readiness: 94, hrv: 71, sleep: 92, stress: 12, acwr: 0.88, status: 'ready', cognitive: 86 },
  { id: 'p14', rank: 'Sgt.', name: 'E. Ciobanu', unit: 'Echo', readiness: 76, hrv: 53, sleep: 68, stress: 42, acwr: 1.22, status: 'ready', cognitive: 63 },
  { id: 'p15', rank: 'Lt.', name: 'H. Stefan', unit: 'Echo', readiness: 60, hrv: 44, sleep: 55, stress: 55, acwr: 1.42, status: 'monitor', cognitive: 50 },
  { id: 'p27', rank: 'Pvt.', name: 'S. Manea', unit: 'Echo', readiness: 88, hrv: 64, sleep: 83, stress: 24, acwr: 1.00, status: 'ready', cognitive: 76 },
  { id: 'p28', rank: 'Cpl.', name: 'I. Preda', unit: 'Echo', readiness: 45, hrv: 36, sleep: 38, stress: 70, acwr: 1.60, status: 'risk', cognitive: 38 },
  // Foxtrot
  { id: 'p16', rank: 'Pvt.', name: 'O. Popa', unit: 'Foxtrot', readiness: 89, hrv: 66, sleep: 84, stress: 20, acwr: 0.98, status: 'ready', cognitive: 77 },
  { id: 'p17', rank: 'Cpl.', name: 'L. Rusu', unit: 'Foxtrot', readiness: 72, hrv: 50, sleep: 65, stress: 45, acwr: 1.28, status: 'ready', cognitive: 61 },
  { id: 'p18', rank: 'Sgt.', name: 'B. Florea', unit: 'Foxtrot', readiness: 38, hrv: 35, sleep: 32, stress: 75, acwr: 1.72, status: 'risk', cognitive: 30 },
  { id: 'p29', rank: 'Lt.', name: 'V. Oancea', unit: 'Foxtrot', readiness: 84, hrv: 60, sleep: 79, stress: 29, acwr: 1.06, status: 'ready', cognitive: 73 },
  { id: 'p30', rank: 'Pvt.', name: 'C. Dobre', unit: 'Foxtrot', readiness: 93, hrv: 69, sleep: 91, stress: 14, acwr: 0.90, status: 'ready', cognitive: 83 },
];

export const units = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];

export function getUnitStats(unit: string) {
  const unitPersonnel = personnel.filter(p => p.unit === unit);
  const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  return {
    unit,
    count: unitPersonnel.length,
    avgReadiness: avg(unitPersonnel.map(p => p.readiness)),
    ready: unitPersonnel.filter(p => p.status === 'ready').length,
    monitor: unitPersonnel.filter(p => p.status === 'monitor').length,
    risk: unitPersonnel.filter(p => p.status === 'risk').length,
    nonDeployable: unitPersonnel.filter(p => p.status === 'non-deployable').length,
  };
}

export function getAllStats() {
  return {
    total: personnel.length,
    ready: personnel.filter(p => p.status === 'ready').length,
    monitor: personnel.filter(p => p.status === 'monitor').length,
    risk: personnel.filter(p => p.status === 'risk').length,
    nonDeployable: personnel.filter(p => p.status === 'non-deployable').length,
    avgReadiness: Math.round(personnel.reduce((a, p) => a + p.readiness, 0) / personnel.length),
  };
}

export function generateTimeSeriesData(days: number, baseValue: number, variance: number) {
  const data = [];
  let value = baseValue;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    value = Math.max(0, Math.min(100, value + (Math.random() - 0.5) * variance));
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value),
    });
  }
  return data;
}

export function generateSleepData(days: number) {
  const data = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const total = 5.5 + Math.random() * 3;
    const deep = total * (0.15 + Math.random() * 0.1);
    const rem = total * (0.2 + Math.random() * 0.08);
    const light = total - deep - rem - (Math.random() * 0.5);
    const awake = total - deep - rem - light;
    data.push({
      date: date.toISOString().split('T')[0],
      total: +total.toFixed(1),
      deep: +deep.toFixed(1),
      rem: +rem.toFixed(1),
      light: +Math.max(0, light).toFixed(1),
      awake: +Math.max(0, awake).toFixed(1),
    });
  }
  return data;
}

export interface Message {
  id: string;
  from: string;
  fromRole: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
  contextSnapshot?: {
    readiness?: number;
    stress?: number;
    sleep?: number;
    hrv?: number;
  };
}

export const mockMessages: Message[] = [
  {
    id: 'm1', from: 'Dr. Elena Marinescu', fromRole: 'physician', to: 'Cpl. R. Stanescu',
    content: 'HRV readings look stable. Continue current recovery protocol. Next check-in Monday.',
    timestamp: '2025-03-07T14:30:00', read: true,
    contextSnapshot: { readiness: 92, hrv: 68, sleep: 85 },
  },
  {
    id: 'm2', from: 'Cpl. R. Stanescu', fromRole: 'user', to: 'Dr. Elena Marinescu',
    content: 'Understood. I noticed some irregular sleep patterns this week. Should I be concerned?',
    timestamp: '2025-03-07T15:12:00', read: true,
  },
  {
    id: 'm3', from: 'Dr. Elena Marinescu', fromRole: 'physician', to: 'Cpl. R. Stanescu',
    content: 'Your sleep architecture shows reduced deep sleep. I recommend limiting caffeine after 14:00 and maintaining consistent sleep-wake times. I\'ll monitor the trend.',
    timestamp: '2025-03-07T15:45:00', read: true,
    contextSnapshot: { sleep: 72, stress: 28 },
  },
  {
    id: 'm4', from: 'Psych. Ana Voicu', fromRole: 'psychologist', to: 'Pvt. D. Vasile',
    content: 'Session prep: Your stress levels have been elevated for 5 consecutive days. Let\'s discuss coping strategies in our Thursday session.',
    timestamp: '2025-03-06T10:00:00', read: false,
    contextSnapshot: { stress: 62, readiness: 55, sleep: 48 },
  },
  {
    id: 'm5', from: 'Trainer Mihai Costin', fromRole: 'trainer', to: 'Cpl. V. Munteanu',
    content: 'ACWR is at 1.65 — injury risk zone. Reducing training load by 30% this week. Focus on mobility and recovery.',
    timestamp: '2025-03-07T09:15:00', read: true,
    contextSnapshot: { readiness: 43, stress: 72 },
  },
  {
    id: 'm6', from: 'Cpl. V. Munteanu', fromRole: 'user', to: 'Trainer Mihai Costin',
    content: 'Acknowledged. My left knee has been bothering me after the last ruck march.',
    timestamp: '2025-03-07T11:30:00', read: true,
  },
  {
    id: 'm7', from: 'Cdr. Bogdan Avram', fromRole: 'commander', to: 'All Units',
    content: 'Readiness assessment for next week\'s field exercise. All personnel with readiness below 60 will be assigned support roles. Health takes priority.',
    timestamp: '2025-03-06T08:00:00', read: true,
  },
];

export const mockConversations = [
  { id: 'c1', name: 'Dr. Elena Marinescu', role: 'Physician', lastMessage: 'I\'ll monitor the trend.', unread: 0, avatar: 'EM', timestamp: '15:45' },
  { id: 'c2', name: 'Psych. Ana Voicu', role: 'Psychologist', lastMessage: 'Let\'s discuss coping strategies...', unread: 1, avatar: 'AV', timestamp: '10:00' },
  { id: 'c3', name: 'Trainer Mihai Costin', role: 'Trainer', lastMessage: 'Focus on mobility and recovery.', unread: 0, avatar: 'MC', timestamp: '09:15' },
  { id: 'c4', name: 'Cdr. Bogdan Avram', role: 'Commander', lastMessage: 'Health takes priority.', unread: 0, avatar: 'BA', timestamp: '08:00' },
];

export const appointments = [
  { id: 'a1', title: 'Medical Check-up', specialist: 'Dr. Elena Marinescu', role: 'physician', date: '2025-03-10', time: '09:00', status: 'scheduled' as const, person: 'Cpl. R. Stanescu' },
  { id: 'a2', title: 'Psychology Session', specialist: 'Psych. Ana Voicu', role: 'psychologist', date: '2025-03-11', time: '14:00', status: 'scheduled' as const, person: 'Pvt. D. Vasile' },
  { id: 'a3', title: 'Training Assessment', specialist: 'Trainer Mihai Costin', role: 'trainer', date: '2025-03-10', time: '11:00', status: 'scheduled' as const, person: 'Cpl. V. Munteanu' },
  { id: 'a4', title: 'HRV Follow-up', specialist: 'Dr. Elena Marinescu', role: 'physician', date: '2025-03-12', time: '10:30', status: 'scheduled' as const, person: 'Lt. A. Dumitru' },
  { id: 'a5', title: 'Stress Management', specialist: 'Psych. Ana Voicu', role: 'psychologist', date: '2025-03-13', time: '15:00', status: 'scheduled' as const, person: 'Cpl. S. Ionescu' },
];
