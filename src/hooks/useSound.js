import { useContext } from 'react';
import { AppConfigContext } from '../context/AppConfigContext';

export function useSound() {
  const context = useContext(AppConfigContext);
  if (!context) throw new Error('useSound must be used within AppConfigProvider');
  return [context.sound, context.setSound];
}
