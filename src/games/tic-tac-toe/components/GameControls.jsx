import { Undo2, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export function GameControls({ onUndo, onRestart, canUndo }) {
  return (
    <div className="flex gap-4 mt-8 justify-center">
      <Button 
        variant="secondary" 
        onClick={onUndo} 
        disabled={!canUndo}
        className="border-white/10 hover:bg-white/10"
      >
        <Undo2 size={20} className="mr-2 inline" /> Undo
      </Button>
      <Button 
        variant="secondary" 
        onClick={onRestart}
        className="border-white/10 hover:bg-white/10"
      >
        <RotateCcw size={20} className="mr-2 inline" /> Reset
      </Button>
    </div>
  );
}
