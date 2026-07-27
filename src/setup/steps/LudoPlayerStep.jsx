import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { usePlayers } from '../../hooks/usePlayers';
import { UserPlus, X, Bot, User } from 'lucide-react';

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
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Ludo Players</h3>
        <p className="text-gray-400 mb-6">Add {game?.minPlayers ?? 2} to {game?.maxPlayers ?? 4} players. Choose Human or AI.</p>

        <div className="flex flex-col gap-3 mb-6">
          {players.map((p) => (
            <Card key={p.id} className="p-4 flex items-center justify-between bg-black/40 border-white/5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl border-2 border-transparent ring-2 ring-offset-2 ring-offset-deep-void ${p.colorClass}`}>
                  {p.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg flex items-center gap-2">
                    {p.name}
                    {p.isBot ? <Bot size={16} className="text-neon-indigo" /> : <User size={16} className="text-gray-400" />}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{p.isBot ? `AI Bot (${p.botDifficulty || 'medium'})` : 'Human'}</span>
                </div>
              </div>
              <button onClick={() => removePlayer(p.id)} className="p-2 text-gray-500 hover:text-crimson-error" aria-label={`Remove ${p.name}`}>
                <X size={20} />
              </button>
            </Card>
          ))}
        </div>

        {isAdding && players.length < (game?.maxPlayers ?? 4) && (
          <Card className="p-4 border-neon-indigo/30 bg-neon-indigo/5 mb-6">
            <div className="flex gap-2 mb-4 bg-black/30 p-1 rounded-lg">
              <button 
                onClick={() => setIsBot(false)} 
                className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-md font-bold transition-colors ${!isBot ? 'bg-neon-indigo text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <User size={18} /> Human
              </button>
              <button 
                onClick={() => { setIsBot(true); if(!newName) setNewAvatar('🤖'); }} 
                className={`flex-1 py-2 flex items-center justify-center gap-2 rounded-md font-bold transition-colors ${isBot ? 'bg-neon-indigo text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Bot size={18} /> AI Bot
              </button>
            </div>

            {isBot && (
              <div className="flex gap-2 mb-4">
                {['easy', 'medium', 'hard'].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setBotDifficulty(diff)}
                    className={`flex-1 py-1 text-sm rounded-md capitalize transition-colors ${botDifficulty === diff ? 'bg-neon-indigo text-white' : 'bg-black/20 text-gray-400 hover:text-white'}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            )}

            <Input 
              placeholder={isBot ? "Bot Name (Optional)" : "Player Name"} 
              value={newName} 
              onChange={e => setNewName(e.target.value)} 
              className="mb-4"
              autoFocus
            />
            
            <div className="flex gap-2 mb-4 flex-wrap">
              {getAvailableColors().map(c => (
                <button key={c.class} onClick={() => setNewColor(c.class)} className={`w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-deep-void ${c.bg} ${newColor === c.class ? 'border-2 border-white scale-110' : 'border-2 border-transparent border-opacity-0 scale-90 opacity-70'}`} title={c.name} />
              ))}
            </div>
            
            <div className="flex justify-between items-center mb-6">
               <div className="flex gap-2 flex-wrap">
                 {AVATARS.map(a => (
                   <button key={a} onClick={() => setNewAvatar(a)} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${newAvatar === a ? 'bg-white/20 ring-1 ring-white' : 'bg-black/20'}`}>{a}</button>
                 ))}
               </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setIsAdding(false)} variant="secondary" className="flex-1" disabled={players.length === 0}>Cancel</Button>
              <Button onClick={handleAdd} className="flex-1" disabled={!newName.trim() && !isBot}>Add</Button>
            </div>
          </Card>
        )}

        {!isAdding && players.length < (game?.maxPlayers ?? 4) && (
          <Button onClick={() => {
            const avail = getAvailableColors();
            if(avail.length > 0 && !avail.find(c => c.class === newColor)) {
              setNewColor(avail[0].class);
            }
            setIsAdding(true);
          }} variant="secondary" className="w-full mb-6 border-dashed border border-white/20 bg-transparent hover:bg-white/5">
            <UserPlus size={18} className="mr-2" /> Add Player
          </Button>
        )}
      </div>

      <Button 
        onClick={handleNext} 
        disabled={players.length < (game?.minPlayers ?? 2) || isAdding}
        className="w-full mt-4"
      >
        Continue
      </Button>
    </motion.div>
  );
}
