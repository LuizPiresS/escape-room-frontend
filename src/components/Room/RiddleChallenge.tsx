import React, { useState } from 'react';
import './RiddleChallenge.css';
import '../Spinner/spinner.css';

interface RiddleChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{ correct: boolean; message: string }>;
  isChecking?: boolean;
}

const RiddleChallenge: React.FC<RiddleChallengeProps> = ({ question, onCheckAnswer, isChecking }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const result = await onCheckAnswer(answer);
    setFeedback({
      type: result.correct ? 'success' : 'error',
      message: result.message,
    });
    if (result.correct) setAnswer('');
  };

  return (
    <form className="riddle-challenge" onSubmit={handleSubmit} aria-label="Desafio de Enigma">
      <label htmlFor="riddle-input" className="riddle-question">
        {question}
      </label>
      <input
        id="riddle-input"
        className="riddle-input"
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={isChecking}
        autoFocus
        aria-required="true"
        aria-label="Sua resposta"
      />
      <button
        type="submit"
        className="riddle-submit"
        disabled={isChecking || !answer.trim()}
        aria-busy={isChecking}
      >
        {isChecking && <span className="spinner" aria-hidden="true"></span>}
        Verificar resposta
      </button>
      {feedback && (
        <div
          className={`riddle-feedback ${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
};

export default RiddleChallenge;