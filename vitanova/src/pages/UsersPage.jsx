import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const roleBadgeColors = {
  admin: 'bg-red-500/20 text-red-400 border-red-500/30',
  commander: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  physician: 'bg-green-500/20 text-green-400 border-green-500/30',
  psychologist: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  trainer: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  user: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export default function UsersPage() {
  const { getAllUsers, updateUser, user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(getAllUsers());
  }, []);

  const toggleActive = (userId) => {
    if (userId === currentUser?.id) return;
    const target = users.find((u) => u.id === userId);
    if (!target) return;
    updateUser(userId, { active: !target.active });
    setUsers(getAllUsers());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-200 tracking-wide mb-6">
        User Management
      </h2>

      <div className="bg-[#12121a] border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Name</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Email</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Role</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Status</th>
              <th className="px-4 py-3 text-xs text-gray-500 uppercase tracking-wider font-mono">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-gray-200">{u.name}</td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 border ${roleBadgeColors[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-mono ${u.active ? 'text-green-400' : 'text-red-400'}`}>
                    {u.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {u.id !== currentUser?.id && (
                    <button
                      onClick={() => toggleActive(u.id)}
                      className={`text-xs px-3 py-1 border transition-colors ${
                        u.active
                          ? 'border-red-500/30 text-red-400 hover:bg-red-500/10'
                          : 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                      }`}
                    >
                      {u.active ? 'Deactivate' : 'Activate'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
