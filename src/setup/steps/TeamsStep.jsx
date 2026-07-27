import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';
import { Users, User } from 'lucide-react';

export function TeamsStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const teams = session.teams;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Team Mode</h3>
        <p className="text-gray-400 mb-6">How are you grouping up?</p>

        <div className="flex flex-col gap-4">
          <Card 
            className={`p-5 cursor-pointer transition-all ${teams === 'ffa' ? `ring-2 ring-white bg-white/10` : 'border-white/5 hover:bg-white/5'}`}
            onClick={() => updateSession({ teams: 'ffa' })}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-black/40 ${teams === 'ffa' ? game.accentColor : 'text-gray-400'}`}>
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Free For All</h4>
                <p className="text-sm text-gray-400">Every player for themselves.</p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-5 cursor-pointer transition-all ${teams === '2-teams' ? `ring-2 ring-white bg-white/10` : 'border-white/5 hover:bg-white/5'}`}
            onClick={() => updateSession({ teams: '2-teams' })}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-black/40 ${teams === '2-teams' ? game.accentColor : 'text-gray-400'}`}>
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">2 Teams</h4>
                <p className="text-sm text-gray-400">Split into two rival teams.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Button onClick={onNext} disabled={!teams} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}
