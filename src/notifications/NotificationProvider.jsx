import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, CheckCircle, AlertTriangle, Zap, Info } from 'lucide-react';
import { NotificationContext } from './NotificationContext';
import { notificationManager } from './notificationManager';
import { notificationStorage } from '../storage/notificationStorage';

export function NotificationProvider({ children }) {
  const [currentNotification, setCurrentNotification] = useState(null);

  useEffect(() => {
    notificationManager.initialize();
    notificationManager.onNotification = (notification, onComplete) => {
      setCurrentNotification(notification);
      setTimeout(() => {
        setCurrentNotification(null);
        setTimeout(onComplete, 500);
      }, notification.duration || 3000);
    };
    
    // Process queue in case there are pending notifications
    notificationManager.processQueue();
  }, []);

  const notify = (notification) => {
    notificationManager.queueNotification(notification);
    notificationStorage.add(notification);
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'achievement':
        return { color: 'text-yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400/30', DefaultIcon: Trophy };
      case 'success':
        return { color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/30', DefaultIcon: CheckCircle };
      case 'error':
        return { color: 'text-red-400', bg: 'bg-red-400/20', border: 'border-red-400/30', DefaultIcon: AlertTriangle };
      case 'warning':
        return { color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400/30', DefaultIcon: AlertTriangle };
      case 'xp':
        return { color: 'text-hyper-pink', bg: 'bg-hyper-pink/20', border: 'border-hyper-pink/30', DefaultIcon: Zap };
      case 'info':
      default:
        return { color: 'text-neon-indigo', bg: 'bg-neon-indigo/20', border: 'border-neon-indigo/30', DefaultIcon: Info };
    }
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <AnimatePresence>
        {currentNotification && (() => {
          const style = getNotificationStyle(currentNotification.type);
          const Icon = currentNotification.icon || style.DefaultIcon;
          
          return (
            <motion.div
              key={currentNotification.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] bg-black/80 backdrop-blur-2xl border ${style.border} rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-4 min-w-[320px] max-w-sm`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.color}`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div className={`${style.color} text-[10px] font-black uppercase tracking-widest mb-0.5`}>{currentNotification.title}</div>
                <div className="text-white font-bold text-sm leading-tight drop-shadow-md">{currentNotification.message}</div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </NotificationContext.Provider>
  );
}
