import { motion } from 'framer-motion';
import { Cell } from './Cell';
import { boardAnimations } from '../../../animations/boardAnimations';

export function Board({ grid, size, onCellClick, winningLine, disabled }) {
  return (
    <motion.div
      {...boardAnimations.boardEntry}
      className="grid gap-2 w-full max-w-sm mx-auto"
      style={{
        gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`
      }}
    >
      {grid.map((value, index) => (
        <Cell
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          isWinningCell={winningLine?.includes(index)}
          disabled={disabled}
        />
      ))}
    </motion.div>
  );
}
