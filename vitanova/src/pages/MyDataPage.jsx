import { useAuth } from '../hooks/useAuth';
import personnelData from '../data/personnel.json';
import PersonnelDetail from './PersonnelDetail';

export default function MyDataPage() {
  const { user } = useAuth();

  // Match user to their personnel record by name
  const myRecord = personnelData.find((p) => p.name === user?.name);

  if (!myRecord) {
    return (
      <div className="text-gray-500 text-center py-16">
        <p>No personnel record found for your account.</p>
      </div>
    );
  }

  // Render the PersonnelDetail inline with the matched ID
  return <PersonnelDetail overrideId={myRecord.id} hideBack />;
}
