import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { usePlayers } from '../../hooks/usePlayers';
import { UserPlus, X } from 'lucide-react';
import { motionVariants } from '../../lib/motion';

const COLORS = ['ring-theme-accent', 'ring-pink-500', 'ring-teal-400', 'ring-emerald-500', 'ring-amber-400'];
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
    <motion.div variants={motionVariants.fadeUp} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-3xl font-black mb-2 text-white drop-shadow-md">Who is playing?</h3>
        <p className="text-theme-text-muted mb-6 text-sm">Add {game?.minPlayers ?? 1} to {game?.maxPlayers ?? 4} players.</p>

        <div className="flex flex-col gap-3 mb-6">
          <AnimatePresence>
            {players.map((p) => (
              <motion.div key={p.id} variants={motionVariants.scaleIn} initial="initial" animate="animate" exit="exit" layout>
                <Card className="p-4 flex items-center justify-between glass-panel border border-white/10 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl border-2 border-transparent ring-2 ring-offset-2 ring-offset-theme-bg shadow-[0_0_15px_rgba(255,255,255,0.1)] ${p.colorClass}`}>
                      {p.avatar}
                    </div>
                    <span className="font-bold text-lg text-white drop-shadow-sm">{p.name}</span>
                  </div>
                  <button onClick={() => removePlayer(p.id)} className="p-2 text-theme-text-muted hover:text-red-400 transition-colors bg-white/5 hover:bg-red-500/20 rounded-full" aria-label={`Remove ${p.name}`}>
                    <X size={20} />
                  </button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isAdding && players.length < (game?.maxPlayers ?? 4) && (
            <motion.div variants={motionVariants.fadeUp} initial="initial" animate="animate" exit="exit">
              <Card className="p-5 border-theme-accent/30 bg-theme-accent/5 mb-6 shadow-[0_0_30px_rgba(var(--theme-glow),0.1)]">
                <Input 
                  placeholder="Player Name" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  className="mb-5 bg-black/40 border-white/20"
                  autoFocus
                />
                
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-theme-text-muted tracking-widest mb-2 block">Select Color</span>
                  <div className="flex gap-3 flex-wrap">
                    {COLORS.map(c => (
                      <button key={c} onClick={() => setNewColor(c)} className={`w-8 h-8 rounded-full bg-white/10 ring-2 ring-offset-2 ring-offset-theme-bg shadow-lg transition-transform ${c} ${newColor === c ? 'border-2 border-white scale-110' : 'border-2 border-transparent opacity-60 hover:opacity-100 scale-90'}`} />
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-[10px] uppercase font-bold text-theme-text-muted tracking-widest mb-2 block">Select Avatar</span>
                  <div className="flex justify-between items-center bg-black/30 p-2 rounded-2xl border border-white/5">
                    <div className="flex gap-2 flex-wrap">
                      {AVATARS.map(a => (
                        <button key={a} onClick={() => setNewAvatar(a)} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${newAvatar === a ? 'bg-theme-accent text-white shadow-[0_0_15px_var(--theme-glow)]' : 'bg-transparent hover:bg-white/10 opacity-70 hover:opacity-100'}`}>{a}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => setIsAdding(false)} variant="secondary" className="flex-1" disabled={players.length === 0}>Cancel</Button>
                  <Button onClick={handleAdd} variant="primary" className="flex-1" disabled={!newName.trim()}>Add Player</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!isAdding && players.length < (game?.maxPlayers ?? 4) && (
          <Button onClick={() => setIsAdding(true)} variant="secondary" className="w-full mb-6 border-dashed border-2 border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 text-theme-text-muted hover:text-white transition-all py-4">
            <UserPlus size={20} className="mr-2" /> Add Another Player
          </Button>
        )}
      </div>

      <Button 
        onClick={handleNext} 
        disabled={players.length < (game?.minPlayers ?? 1) || isAdding}
        className="w-full mt-4 py-4 text-lg"
      >
        Continue
      </Button>
    </motion.div>
  );
}
