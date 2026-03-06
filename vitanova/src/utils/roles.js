export const ROLES = {
  ADMIN: {
    id: 'admin',
    name: 'Administrator',
    level: 100,
    permissions: ['*']
  },
  COMMANDER: {
    id: 'commander',
    name: 'Force Commander',
    level: 80,
    permissions: ['view_all_personnel', 'view_readiness', 'view_predictions', 'manage_units', 'view_reports']
  },
  PHYSICIAN: {
    id: 'physician',
    name: 'Physician',
    level: 60,
    permissions: ['view_assigned_patients', 'view_vitals', 'send_prescriptions', 'view_medical_history', 'escalate']
  },
  PSYCHOLOGIST: {
    id: 'psychologist',
    name: 'Psychologist',
    level: 60,
    permissions: ['view_assigned_patients', 'view_mood_data', 'assign_tasks', 'view_stress_data']
  },
  TRAINER: {
    id: 'trainer',
    name: 'Performance Coach',
    level: 50,
    permissions: ['view_assigned_athletes', 'view_workload', 'modify_programs', 'view_acwr']
  },
  USER: {
    id: 'user',
    name: 'Personnel / Athlete',
    level: 10,
    permissions: ['view_own_data', 'view_own_programs', 'send_messages', 'manage_consent']
  }
};

export const getRoleConfig = (roleId) => {
  return Object.values(ROLES).find(r => r.id === roleId) || ROLES.USER;
};

export const hasPermission = (roleId, permission) => {
  const role = getRoleConfig(roleId);
  return role.permissions.includes('*') || role.permissions.includes(permission);
};

export const hasMinLevel = (roleId, minLevel) => {
  const role = getRoleConfig(roleId);
  return role.level >= minLevel;
};

export const ALL_PERMISSIONS = [
  'view_all_personnel', 'view_readiness', 'view_predictions', 'manage_units', 'view_reports',
  'view_assigned_patients', 'view_vitals', 'send_prescriptions', 'view_medical_history', 'escalate',
  'view_mood_data', 'assign_tasks', 'view_stress_data',
  'view_assigned_athletes', 'view_workload', 'modify_programs', 'view_acwr',
  'view_own_data', 'view_own_programs', 'send_messages', 'manage_consent'
];
