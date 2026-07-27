import { Card } from '../../../components/ui/Card';

export function ScoreBoard({ player, score, mode }) {
  if (!player && mode === 'individual') return null;

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        {mode === 'individual' ? (
          <>
            <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl border border-white/20 ring-1 ${player.colorClass}`}>
              {player.avatar}
            </div>
            <div>
              <div className="text-xs text-gray-400">Current Player</div>
              <div className="font-bold">{player.name}</div>
            </div>
          </>
        ) : (
          <div>
            <div className="text-xs text-gray-400">Squad Mode</div>
            <div className="font-bold text-lg">Team Score</div>
          </div>
        )}
      </div>
      
      <Card className="px-4 py-2 bg-black/60 border-neon-indigo/30 text-neon-indigo text-2xl font-black shadow-[0_0_15px_rgba(99,102,241,0.3)]">
        {score || 0}
      </Card>
    </div>
  );
}
