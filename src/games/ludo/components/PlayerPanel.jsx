export function PlayerPanel({ currentPlayer, stats }) {
  const pColorClass = currentPlayer?.colorClass?.replace('ring-', 'text-') || 'text-white';
  
  return (
    <div className="flex items-center justify-between mb-8 bg-black/40 p-4 rounded-2xl border border-white/5">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 ${currentPlayer?.colorClass}`}>
          {currentPlayer?.avatar}
        </div>
        <div>
          <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">Current Turn</div>
          <div className={`text-2xl font-black ${pColorClass}`}>{currentPlayer?.name || 'Unknown'}</div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-xs text-gray-400">Score</div>
        <div className="text-xl font-bold">{stats?.[currentPlayer?.id]?.score || 0}</div>
      </div>
    </div>
  );
}
