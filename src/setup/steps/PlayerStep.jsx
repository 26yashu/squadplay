import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { usePlayers } from '../../hooks/usePlayers';
import { UserPlus, X } from 'lucide-react';

const COLORS = ['ring-neon-indigo', 'ring-hyper-pink', 'ring-cyber-teal', 'ring-emerald-success', 'ring-amber-warning'];
const AVATARS = ['😎', '👽', '🤖', '👻', '🤠', '🦄', '🦖', '🚀'];

export function PlayerStep({ game, onNext }) {
  const { players, addPlayer, removePlayer } = usePlayers();
  const [isAdding, setIsAdding] = useState(players.length === 0);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(AVATARS[0]);
  const [newColor, setNewColor] = useState(COLORS[0]);

  const handleAdd = () => {
    if (!newName.trim()) return;
    if (players.length >= (game?.maxPlayers ?? 4)) return;
    
    addPlayer({ name: newName.trim(), avatar: newAvatar, colorClass: newColor });
    setNewName('');
    setIsAdding(false);
  };

  const handleNext = () => {
    if (players.length >= (game?.minPlayers ?? 1)) {
      onNext();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Who is playing?</h3>
        <p className="text-gray-400 mb-6">Add {game?.minPlayers ?? 1} to {game?.maxPlayers ?? 4} players.</p>

        <div className="flex flex-col gap-3 mb-6">
          {players.map((p) => (
            <Card key={p.id} className="p-4 flex items-center justify-between bg-black/40 border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl border-2 border-transparent ring-2 ring-offset-2 ring-offset-deep-void ${p.colorClass}`}>
                  {p.avatar}
                </div>
                <span className="font-bold text-lg">{p.name}</span>
              </div>
              <button onClick={() => removePlayer(p.id)} className="p-2 text-gray-500 hover:text-crimson-error" aria-label={`Remove ${p.name}`}>
                <X size={20} />
              </button>
            </Card>
          ))}
        </div>

        {isAdding && players.length < (game?.maxPlayers ?? 4) && (
          <Card className="p-4 border-neon-indigo/30 bg-neon-indigo/5 mb-6">
            <Input 
              placeholder="Player Name" 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              className="mb-4"
              autoFocus
            />
            <div className="flex justify-between items-center mb-4">
               <div className="flex gap-2 flex-wrap">
                 {AVATARS.map(a => (
                   <button key={a} onClick={() => setNewAvatar(a)} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${newAvatar === a ? 'bg-white/20 ring-1 ring-white' : 'bg-black/20'}`}>{a}</button>
                 ))}
               </div>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {COLORS.map(c => (
                <button key={c} onClick={() => setNewColor(c)} className={`w-8 h-8 rounded-full bg-white/10 ring-2 ring-offset-2 ring-offset-deep-void ${c} ${newColor === c ? 'border-2 border-white' : 'border-2 border-transparent border-opacity-0 scale-90'}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setIsAdding(false)} variant="secondary" className="flex-1" disabled={players.length === 0}>Cancel</Button>
              <Button onClick={handleAdd} className="flex-1" disabled={!newName.trim()}>Add</Button>
            </div>
          </Card>
        )}

        {!isAdding && players.length < (game?.maxPlayers ?? 4) && (
          <Button onClick={() => setIsAdding(true)} variant="secondary" className="w-full mb-6 border-dashed border border-white/20 bg-transparent hover:bg-white/5">
            <UserPlus size={18} className="mr-2" /> Add Player
          </Button>
        )}
      </div>

      <Button 
        onClick={handleNext} 
        disabled={players.length < (game?.minPlayers ?? 1) || isAdding}
        className="w-full mt-4"
      >
        Continue
      </Button>
    </motion.div>
  );
}
