import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { gameRegistry } from '../../../registry/gameRegistry';
import { GameCard } from '../../../components/ui/GameCard';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Component } from 'react';

class GameCardBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error("GameCard Error for game:", this.props.gameId, error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function GameGridSection() {
  const [search, setSearch] = useState('');
  
  const activeGames = useMemo(() => {
    const filtered = gameRegistry.filter(game => {
      const isAvailable = game.available !== false && !game.comingSoon;
      const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
      return isAvailable && matchesSearch;
    });
    console.log(`[GameGrid] Original length: ${gameRegistry.length}, Filtered length: ${filtered.length}`);
    return filtered;
  }, [search]);

  return (
    <div className="mb-12 px-4">
      <div className="flex flex-col mb-6 gap-4">
        <h3 className="text-2xl font-black text-white">All Games (Debug: {activeGames.length} / {gameRegistry.length})</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input 
            type="text" 
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-hyper-pink transition-all backdrop-blur-md"
          />
        </div>
      </div>

      {activeGames.length === 0 ? (
        <EmptyState 
          title="No Games Found" 
          message="Try a different search term."
          actionLabel="Clear Search"
          onAction={() => setSearch('')}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {activeGames.map(game => (
            <GameCardBoundary key={game.id} gameId={game.id}>
              <GameCard game={game} />
            </GameCardBoundary>
          ))}
        </div>
      )}
    </div>
  );
}
