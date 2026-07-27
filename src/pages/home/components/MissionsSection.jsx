import { useState, useEffect } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { missionRepository } from '../../../repositories/MissionRepository';
import { MISSIONS } from '../../../missions/missionRegistry';
import { eventBus } from '../../../events/eventBus';

export function MissionsSection() {
  const [activeMissions, setActiveMissions] = useState([]);

  useEffect(() => {
    const loadMissions = async () => {
      const data = await missionRepository.get();
      setActiveMissions(data.active || []);
    };
    loadMissions();

    const unsubscribe = eventBus.subscribe('MISSION_PROGRESS', (payload) => {
      setActiveMissions(payload.activeMissions);
    });

    return () => unsubscribe();
  }, []);

  if (activeMissions.length === 0) return null;

  return (
    <div className="mb-12 relative group px-4">
      <h3 className="text-2xl font-black mb-6 text-white">Daily Missions</h3>
      <div className="flex flex-col gap-3">
        {activeMissions.map((missionData) => {
          const missionDef = MISSIONS.find(m => m.id === missionData.id);
          if (!missionDef) return null;

          const progressPercent = Math.min((missionData.progress / missionDef.target) * 100, 100);
          
          return (
            <Card key={missionData.id} className={`relative overflow-hidden ${missionData.completed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-black/60 border-hyper-pink/30'} p-5 rounded-[24px] backdrop-blur-2xl shadow-lg transition-all duration-500`}>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 ${missionData.completed ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-hyper-pink/20 text-hyper-pink border-hyper-pink/30'} border rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm`}>
                    {missionData.completed ? <CheckCircle2 size={12} /> : <Zap size={12} className="fill-current" />} 
                    {missionDef.type === 'daily' ? 'DAILY' : 'WEEKLY'}
                  </span>
                  <span className="text-[10px] text-white/50 font-bold tracking-widest uppercase">
                    +{missionDef.xpReward} XP
                  </span>
                </div>
                
                <h3 className={`text-xl font-black mb-1 ${missionData.completed ? 'text-emerald-400' : 'text-white'} drop-shadow-md`}>
                  {missionDef.title}
                </h3>
                <p className="text-white/60 text-xs mb-4 font-medium max-w-[250px]">
                  {missionDef.description}
                </p>
                
                <div className="flex items-center justify-between gap-4 mt-auto">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${missionData.completed ? 'bg-emerald-400' : 'bg-gradient-to-r from-hyper-pink to-cyber-teal'} transition-all duration-1000 ease-out`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-white/70">
                    {missionData.progress} / {missionDef.target}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
