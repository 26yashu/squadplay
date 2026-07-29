import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { usePlayers } from '../../hooks/usePlayers';
import { UserPlus, X, Bot, User } from 'lucide-react';
import { motionVariants } from '../../lib/motion';

// Ludo specifically uses 4 fixed colors.
// Red (0), Green (1), Yellow (2), Blue (3)
const LUDO_COLORS = [
  { class: 'ring-red-500', bg: 'bg-red-500', name: 'Red' },
  { class: 'ring-green-500', bg: 'bg-green-500', name: 'Green' },
  { class: 'ring-yellow-400', bg: 'bg-yellow-400', name: 'Yellow' },
  { class: 'ring-blue-500', bg: 'bg-blue-500', name: 'Blue' }
];

const AVATARS = ['😎', '👽', '🤖', '👻', '🤠', '🦄', '🦖', '🚀'];

export function LudoPlayerStep({ game, onNext }) {
  const { players, addPlayer, removePlayer } = usePlayers();
  const [isAdding, setIsAdding] = useState(players.length === 0);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(AVATARS[0]);
  const [newColor, setNewColor] = useState(LUDO_COLORS[0].class);
  const [isBot, setIsBot] = useState(false);
  const [botDifficulty, setBotDifficulty] = useState('medium');

  const getAvailableColors = () => {
    const used = players.map(p => p.colorClass);
    return LUDO_COLORS.filter(c => !used.includes(c.class));
  };

  const handleAdd = () => {
    if (!newName.trim() && !isBot) return;
    if (players.length >= (game?.maxPlayers ?? 4)) return;
    
    // Automatically name bots if no name provided
    const finalName = !newName.trim() && isBot ? `Bot ${players.length + 1}` : newName.trim();
    
    addPlayer({ 
      name: finalName, 
      avatar: newAvatar, 
      colorClass: newColor,
      isBot: isBot,
      botDifficulty: isBot ? botDifficulty : undefined
    });
    
    setNewName('');
    setIsBot(false);
    setIsAdding(false);
  };

  const handleNext = () => {
    if (players.length >= (game?.minPlayers ?? 2)) {
      onNext();
    }
  };

  return (
    <motion.div variants={motionVariants.fadeUp} initial="initial" animate="animate" exit="exit" className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-3xl font-black mb-2 text-white drop-shadow-md">Ludo Players</h3>
        <p className="text-theme-text-muted mb-6 text-sm">Add {game?.minPlayers ?? 2} to {game?.maxPlayers ?? 4} players. Choose Human or AI.</p>

        <div className="flex flex-col gap-3 mb-6">
          <AnimatePresence>
            {players.map((p) => (
              <motion.div key={p.id} variants={motionVariants.scaleIn} initial="initial" animate="animate" exit="exit" layout>
                <Card className="p-4 flex items-center justify-between glass-panel border border-white/10 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl border-2 border-transparent ring-2 ring-offset-2 ring-offset-theme-bg shadow-[0_0_15px_rgba(255,255,255,0.1)] ${p.colorClass}`}>
                      {p.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg text-white drop-shadow-sm flex items-center gap-2">
                        {p.name}
                        {p.isBot ? <Bot size={16} className="text-theme-accent" /> : <User size={16} className="text-theme-text-muted" />}
                      </span>
                      <span className="text-[10px] text-theme-text-muted font-bold uppercase tracking-widest">{p.isBot ? `AI Bot (${p.botDifficulty || 'medium'})` : 'Human'}</span>
                    </div>
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
                
                <div className="mb-5">
                  <span className="text-[10px] uppercase font-bold text-theme-text-muted tracking-widest mb-2 block">Player Type</span>
                  <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                    <button 
                      onClick={() => setIsBot(false)} 
                      className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl font-bold transition-all ${!isBot ? 'bg-theme-accent text-white shadow-lg' : 'text-theme-text-muted hover:text-white hover:bg-white/5'}`}
                    >
                      <User size={18} /> Human
                    </button>
                    <button 
                      onClick={() => { setIsBot(true); if(!newName) setNewAvatar('🤖'); }} 
                      className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-xl font-bold transition-all ${isBot ? 'bg-theme-accent text-white shadow-lg' : 'text-theme-text-muted hover:text-white hover:bg-white/5'}`}
                    >
                      <Bot size={18} /> AI Bot
                    </button>
                  </div>
                </div>

                {isBot && (
                  <div className="mb-5">
                    <span className="text-[10px] uppercase font-bold text-theme-text-muted tracking-widest mb-2 block">AI Difficulty</span>
                    <div className="flex gap-2">
                      {['easy', 'medium', 'hard'].map(diff => (
                        <button
                          key={diff}
                          onClick={() => setBotDifficulty(diff)}
                          className={`flex-1 py-2 text-sm rounded-xl font-bold capitalize transition-all border ${botDifficulty === diff ? 'bg-theme-accent text-white border-theme-accent shadow-[0_0_15px_var(--theme-glow)]' : 'bg-black/30 text-theme-text-muted border-white/10 hover:text-white hover:bg-white/10'}`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <Input 
                  placeholder={isBot ? "Bot Name (Optional)" : "Player Name"} 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)} 
                  className="mb-5 bg-black/40 border-white/20"
                  autoFocus
                />
                
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-theme-text-muted tracking-widest mb-2 block">Select Color</span>
                  <div className="flex gap-3 flex-wrap">
                    {getAvailableColors().map(c => (
                      <button key={c.class} onClick={() => setNewColor(c.class)} className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-theme-bg shadow-lg transition-transform ${c.bg} ${newColor === c.class ? 'border-2 border-white scale-110' : 'border-2 border-transparent opacity-60 hover:opacity-100 scale-90'}`} title={c.name} />
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
                  <Button onClick={handleAdd} variant="primary" className="flex-1" disabled={!newName.trim() && !isBot}>Add Player</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!isAdding && players.length < (game?.maxPlayers ?? 4) && (
          <Button onClick={() => {
            const avail = getAvailableColors();
            if(avail.length > 0 && !avail.find(c => c.class === newColor)) {
              setNewColor(avail[0].class);
            }
            setIsAdding(true);
          }} variant="secondary" className="w-full mb-6 border-dashed border-2 border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40 text-theme-text-muted hover:text-white transition-all py-4">
            <UserPlus size={20} className="mr-2" /> Add Another Player
          </Button>
        )}
      </div>

      <Button 
        onClick={handleNext} 
        disabled={players.length < (game?.minPlayers ?? 2) || isAdding}
        className="w-full mt-4 py-4 text-lg"
      >
        Continue
      </Button>
    </motion.div>
  );
}
