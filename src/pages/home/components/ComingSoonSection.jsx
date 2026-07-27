import { gameRegistry } from '../../../registry/gameRegistry';
import { GameCard } from '../../../components/ui/GameCard';

import { HorizontalCarousel } from '../../../components/ui/HorizontalCarousel';

export function ComingSoonSection() {
  const comingSoonGames = gameRegistry.filter(game => game.comingSoon || game.available === false);
  
  if (comingSoonGames.length === 0) return null;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-black mb-6 px-4 text-white">Coming Soon</h3>
      <HorizontalCarousel>
        {comingSoonGames.map(game => (
          <div key={game.id} className="min-w-[200px] sm:min-w-[280px] snap-center flex-shrink-0">
            <GameCard game={game} />
          </div>
        ))}
      </HorizontalCarousel>
    </div>
  );
}
