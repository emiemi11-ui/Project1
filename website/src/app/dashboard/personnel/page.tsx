'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { personnel, units } from '@/lib/mockData';
import { Search, Filter, ChevronUp, ChevronDown } from 'lucide-react';

type SortKey = 'name' | 'unit' | 'readiness' | 'hrv' | 'sleep' | 'stress' | 'acwr' | 'status' | 'cognitive';
type SortDir = 'asc' | 'desc';

const statusBadge = {
  ready: 'success' as const,
  monitor: 'warning' as const,
  risk: 'danger' as const,
  'non-deployable': 'danger' as const,
};

export default function PersonnelPage() {
  const [search, setSearch] = useState('');
  const [filterUnit, setFilterUnit] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('readiness');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const filtered = useMemo(() => {
    let list = [...personnel];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) || p.rank.toLowerCase().includes(q) || p.id.includes(q)
      );
    }
    if (filterUnit !== 'all') {
      list = list.filter(p => p.unit === filterUnit);
    }
    list.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return list;
  }, [search, filterUnit, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  return (
    <div className="space-y-6">
      <h1 className="font-syne text-2xl font-bold text-white">Personnel</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ice3" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search personnel..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-ice outline-none focus:border-cyan/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-ice3" />
          <select
            value={filterUnit}
            onChange={e => setFilterUnit(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-ice outline-none focus:border-cyan/30"
          >
            <option value="all">All Units</option>
            {units.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <Card variant="default" padding="none">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {([
                  ['name', 'Name'],
                  ['unit', 'Unit'],
                  ['readiness', 'Readiness'],
                  ['cognitive', 'Cognitive'],
                  ['hrv', 'HRV'],
                  ['sleep', 'Sleep'],
                  ['stress', 'Stress'],
                  ['acwr', 'ACWR'],
                  ['status', 'Status'],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th
                    key={key}
                    className="text-left px-4 py-3 text-[10px] font-mono text-ice3 uppercase tracking-wider cursor-pointer hover:text-ice transition-colors"
                    onClick={() => toggleSort(key)}
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      <SortIcon col={key} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/personnel/${p.id}`} className="text-sm text-cyan hover:underline">
                      {p.rank} {p.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-ice3">{p.unit}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.readiness >= 75 ? 'bg-signal' : p.readiness >= 50 ? 'bg-amber' : 'bg-red'}`} style={{ width: `${p.readiness}%` }} />
                      </div>
                      <span className="text-xs font-mono text-ice2">{p.readiness}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-ice2">{p.cognitive}</td>
                  <td className="px-4 py-3 text-xs font-mono text-ice2">{p.hrv}ms</td>
                  <td className="px-4 py-3 text-xs font-mono text-ice2">{p.sleep}%</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono ${p.stress > 60 ? 'text-red' : p.stress > 40 ? 'text-amber' : 'text-signal'}`}>
                      {p.stress}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono ${p.acwr > 1.5 ? 'text-red' : p.acwr > 1.3 ? 'text-amber' : 'text-signal'}`}>
                      {p.acwr.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadge[p.status]}>{p.status.toUpperCase()}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
