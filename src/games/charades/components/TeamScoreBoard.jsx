import { Card } from '../../../components/ui/Card';

export function TeamScoreBoard({ teamA, teamB, mode }) {
  if (mode !== '2-teams') return null;
  
  return (
    <div className="flex justify-between items-center w-full mb-6 gap-4">
      <Card className="flex-1 p-3 bg-black/40 border-blue-500/30 flex items-center justify-between shadow-[0_0_15px_rgba(59,130,246,0.2)]">
        <span className="font-bold text-blue-400">{teamA?.name}</span>
        <span className="text-2xl font-black text-white">{teamA?.score || 0}</span>
      </Card>
      
      <div className="text-gray-500 font-bold">VS</div>
      
      <Card className="flex-1 p-3 bg-black/40 border-red-500/30 flex items-center justify-between shadow-[0_0_15px_rgba(239,68,68,0.2)]">
        <span className="font-bold text-red-400">{teamB?.name}</span>
        <span className="text-2xl font-black text-white">{teamB?.score || 0}</span>
      </Card>
    </div>
  );
}
