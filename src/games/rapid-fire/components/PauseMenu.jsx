import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { X, Play, Home } from 'lucide-react';

export function PauseMenu({ onResume, onQuit }) {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-deep-void border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl relative"
      >
        <button onClick={onResume} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Resume">
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold mb-8 text-orange-500">Paused</h2>
        <div className="flex flex-col gap-4">
          <Button onClick={onResume} className="w-full py-4 text-lg bg-orange-500 hover:bg-orange-600 text-black">
            <Play size={20} className="mr-2 inline" /> Resume Game
          </Button>
          <Button onClick={onQuit || (() => navigate('/'))} variant="secondary" className="w-full text-crimson-error border-crimson-error/30 hover:bg-crimson-error/10">
            <Home size={20} className="mr-2 inline" /> Quit to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
