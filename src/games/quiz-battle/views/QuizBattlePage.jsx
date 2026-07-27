import { useState, useEffect } from 'react';
import { useQuizGame } from '../hooks/useQuizGame';
import { usePlayers } from '../../../hooks/usePlayers';
import { useGameSession } from '../../../hooks/useGameSession';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Button } from '../../../components/ui/Button';
import { QuestionCard } from '../components/QuestionCard';
import { OptionButton } from '../components/OptionButton';
import { ProgressBar } from '../../../components/ui/ProgressBar';
import { ScoreBoard } from '../components/ScoreBoard';
import { PauseMenu } from '../components/PauseMenu';
import { ResultsPage } from './ResultsPage';
import { motion, AnimatePresence } from 'framer-motion';
import { getGameById } from '../../../config/games';
import { Pause } from 'lucide-react';

import { ContentEmptyState } from '../../../components/ui/ContentEmptyState';
import { useNavigate } from 'react-router-dom';

export function QuizBattlePage() {
  const { session } = useGameSession();
  const { players } = usePlayers();
  const gameConfig = getGameById('quiz-battle');
  const navigate = useNavigate();
  
  const game = useQuizGame(session, players);
  const [isRevealing, setIsRevealing] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  
  useEffect(() => {
    if (game.state === 'player_ready') {
      game.start();
    }
  }, [game.state, game.start]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
    setSelectedAnswer(null);
    setAnswerStatus(null);
  }, [game.currentQuestion]);

  if (game.state === 'idle' || game.state === 'loading' || game.state === 'player_ready') {
    return (
      <ScreenWrapper className="flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-neon-indigo border-t-transparent rounded-full" />
      </ScreenWrapper>
    );
  }

  if (game.state === 'error') {
    return (
      <ScreenWrapper className="flex flex-col items-center justify-center p-4">
        <ContentEmptyState 
          title="Content Unavailable" 
          message="The requested dataset is missing or invalid. Please select a different pack or try again." 
          actionLabel="Change Pack"
          onAction={() => navigate(-1)}
        />
        <Button onClick={() => navigate('/')} variant="ghost" className="mt-4 text-gray-400">Return Home</Button>
      </ScreenWrapper>
    );
  }

  if (game.state === 'finished') {
    return <ResultsPage results={game.results} mode={session.mode} gameConfig={gameConfig} />;
  }

  if (game.state === 'player_transition') {
    return (
      <ScreenWrapper className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-black mb-4 text-neon-indigo">Next Up</h2>
        <div className={`w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center text-5xl mb-4 border-4 ring-2 ring-offset-4 ring-offset-deep-void ${game.currentPlayer?.colorClass?.replace('ring-', 'border-')}`}>
          {game.currentPlayer?.avatar}
        </div>
        <h3 className="text-2xl font-bold mb-8">{game.currentPlayer?.name}'s Turn</h3>
        <Button onClick={game.start} className="w-full max-w-sm py-4 text-lg">I'm Ready</Button>
      </ScreenWrapper>
    );
  }

  const handleOptionClick = (option) => {
    if (selectedAnswer) return;
    const timeMs = Date.now() - questionStartTime;
    setSelectedAnswer(option);
    
    const isCorrect = game.handleAnswer(option, timeMs);
    setAnswerStatus(isCorrect ? 'correct' : 'wrong');
    
    setTimeout(() => {
      game.next();
    }, 1500);
  };

  const currentScore = session.mode === 'individual' 
    ? game.liveStats?.[game.currentPlayer?.id]?.score || 0
    : game.liveStats?.['squad']?.score || 0;

  return (
    <ScreenWrapper className="pb-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">{gameConfig.title}</h1>
        <button onClick={game.pause} className="p-2 text-gray-400 hover:text-white" aria-label="Pause Game">
          <Pause size={24} />
        </button>
      </div>

      <ScoreBoard player={game.currentPlayer} score={currentScore} mode={session.mode} />
      <ProgressBar current={game.questionsAnswered} total={game.totalQuestions} />

      <div className="flex-1 flex flex-col relative min-h-0">
        <AnimatePresence mode="wait">
          {game.currentQuestion && (
            <motion.div 
              key={game.currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <QuestionCard 
                question={game.currentQuestion.question} 
                current={game.questionsAnswered + 1} 
                total={game.totalQuestions} 
                category={game.currentQuestion.category}
                difficulty={game.currentQuestion.difficulty}
              />
              
              <div className="flex flex-col gap-3 mt-auto">
                {game.currentQuestion.options.map(opt => {
                  const isSelected = selectedAnswer === opt;
                  let status = null;
                  if (selectedAnswer) {
                    if (opt === game.currentQuestion.correctAnswer) status = 'correct';
                    else if (isSelected) status = 'wrong';
                  }
                  
                  return (
                    <OptionButton 
                      key={opt}
                      option={opt}
                      isSelected={isSelected}
                      status={status}
                      disabled={!!selectedAnswer}
                      onClick={() => handleOptionClick(opt)}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {game.state === 'paused' && <PauseMenu onResume={game.resume} />}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
