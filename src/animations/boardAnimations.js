export const boardAnimations = {
  boardEntry: {
    initial: { opacity: 0, scale: 0.8, rotateX: 20 },
    animate: { opacity: 1, scale: 1, rotateX: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  },
  cellPop: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  winningLine: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  modalEntry: {
    initial: { scale: 0.8, opacity: 0, y: 50 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.8, opacity: 0, y: 50 },
    transition: { type: 'spring', stiffness: 250, damping: 25 }
  }
};
