import { useAuth } from '../hooks/useAuth';
import programsData from '../data/programs.json';
import personnelData from '../data/personnel.json';

const typeColors = {
  physical: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  recovery: 'bg-green-500/20 text-green-400 border-green-500/30',
  mental: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  rehabilitation: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const intensityColors = {
  low: 'text-green-400',
  moderate: 'text-yellow-400',
  high: 'text-red-400',
};

export default function ProgramsPage() {
  const { user } = useAuth();

  let programs = programsData;

  // user role only sees their own programs (matched by personnel id)
  if (user?.role === 'user') {
    // Find the personnel record matching the current user
    const myPersonnel = personnelData.find(
      (p) => p.name === user.name
    );
    if (myPersonnel) {
      programs = programs.filter((pr) => pr.assignedTo.includes(myPersonnel.id));
    } else {
      programs = [];
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 tracking-wide mb-6">
        {user?.role === 'user' ? 'My Programs' : 'Training Programs'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {programs.map((pr) => (
          <div key={pr.id} className="bg-[#12121a] border border-white/10 p-5 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-gray-200 font-medium text-sm leading-tight flex-1 mr-3">
                {pr.name}
              </h3>
              <span className={`text-[10px] px-2 py-0.5 border shrink-0 ${typeColors[pr.type] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                {pr.type}
              </span>
            </div>

            <p className="text-xs text-gray-500 mb-4 line-clamp-2">{pr.description}</p>

            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
              <div className="bg-[#0a0a0f] border border-white/5 p-2">
                <p className="text-gray-600 font-mono uppercase text-[10px]">Duration</p>
                <p className="text-gray-300 mt-0.5">{pr.duration}</p>
              </div>
              <div className="bg-[#0a0a0f] border border-white/5 p-2">
                <p className="text-gray-600 font-mono uppercase text-[10px]">Intensity</p>
                <p className={`mt-0.5 ${intensityColors[pr.intensity]}`}>{pr.intensity}</p>
              </div>
              <div className="bg-[#0a0a0f] border border-white/5 p-2">
                <p className="text-gray-600 font-mono uppercase text-[10px]">Status</p>
                <p className={`mt-0.5 ${pr.status === 'active' ? 'text-green-400' : 'text-gray-500'}`}>
                  {pr.status}
                </p>
              </div>
              <div className="bg-[#0a0a0f] border border-white/5 p-2">
                <p className="text-gray-600 font-mono uppercase text-[10px]">Assigned</p>
                <p className="text-gray-300 mt-0.5">{pr.assignedTo.length} personnel</p>
              </div>
            </div>

            {user?.role === 'trainer' && (
              <button className="mt-auto w-full bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 py-2 text-xs uppercase tracking-wider hover:bg-[#00d4ff]/20 transition-colors">
                Modify Program
              </button>
            )}
          </div>
        ))}
        {programs.length === 0 && (
          <div className="col-span-full text-center text-gray-600 py-8">
            No programs found
          </div>
        )}
      </div>
    </div>
  );
}
