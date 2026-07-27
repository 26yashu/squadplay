import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';

const QUIZ_CATEGORIES = [
  { id: 'general', title: 'General Knowledge', emoji: '🧠' },
  { id: 'science', title: 'Science', emoji: '🔬' },
  { id: 'technology', title: 'Technology', emoji: '💻' },
  { id: 'history', title: 'History', emoji: '📜' },
  { id: 'geography', title: 'Geography', emoji: '🌍' },
  { id: 'sports', title: 'Sports', emoji: '⚽' },
  { id: 'movies', title: 'Movies', emoji: '🎬' },
  { id: 'music', title: 'Music', emoji: '🎵' },
  { id: 'nature', title: 'Nature', emoji: '🌿' },
  { id: 'food', title: 'Food', emoji: '🍔' },
  { id: 'business', title: 'Business', emoji: '💼' },
  { id: 'programming', title: 'Programming', emoji: '⌨️' },
  { id: 'ai', title: 'Artificial Intelligence', emoji: '🤖' },
  { id: 'mixed', title: 'Mixed', emoji: '🎲' }
];

const TOD_CATEGORIES = [
  { id: 'classic', title: 'Classic', emoji: '🔥' },
  { id: 'funny', title: 'Funny', emoji: '😂' },
  { id: 'family', title: 'Family Friendly', emoji: '👨‍👩‍👧‍👦' },
  { id: 'party', title: 'Party', emoji: '🎉' }
];

const CHARADES_CATEGORIES = [
  { id: 'movies', title: 'Movies', emoji: '🎬' },
  { id: 'actions', title: 'Actions', emoji: '🏃' },
  { id: 'animals', title: 'Animals', emoji: '🦁' },
  { id: 'mixed', title: 'Mixed', emoji: '🎲' }
];

const SPIN_WHEEL_CATEGORIES = [
  { id: 'actions', title: 'Actions', emoji: '🏃' },
  { id: 'categories', title: 'Categories', emoji: '📋' },
  { id: 'challenges', title: 'Challenges', emoji: '🔥' },
  { id: 'lucky-rewards', title: 'Lucky Rewards', emoji: '🎁' },
  { id: 'mini-games', title: 'Mini Games', emoji: '🎮' },
  { id: 'punishments', title: 'Punishments', emoji: '💀' },
  { id: 'random-tasks', title: 'Random Tasks', emoji: '🎲' }
];

export function CategoryStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const selectedCategory = session.category;
  
  let categories = QUIZ_CATEGORIES;
  if (game?.id === 'truth-or-dare') categories = TOD_CATEGORIES;
  if (game?.id === 'charades') categories = CHARADES_CATEGORIES;
  if (game?.id === 'spin-wheel') categories = SPIN_WHEEL_CATEGORIES;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Category</h3>
        <p className="text-gray-400 mb-6">Select a topic for questions.</p>

        <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-4">
          {categories.map(cat => (
            <Card 
              key={cat.id}
              onClick={() => updateSession({ category: cat.id })}
              className={`p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${selectedCategory === cat.id ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
              role="button"
              tabIndex={0}
            >
              <span className="text-3xl mb-2 block">{cat.emoji}</span>
              <span className="font-bold text-sm">{cat.title}</span>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={onNext} disabled={!selectedCategory} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}
