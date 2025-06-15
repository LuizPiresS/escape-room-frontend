import React, { useState } from 'react';
import './PatternChallenge.css';
import '../Spinner/spinner.css';
interface PatternChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{
    correct: boolean;
    message: string;
  }>;
  isChecking?: boolean;
}

const PatternChallenge: React.FC<PatternChallengeProps> = ({ question, onCheckAnswer, isChecking }) => {
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
    <form className="pattern-challenge" onSubmit={handleSubmit} aria-label="Desafio de Padrão">
      <label htmlFor="pattern-input" className="pattern-question">
        {question}
      </label>
      <input
        id="pattern-input"
        className="pattern-input"
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={isChecking}
        aria-required="true"
        aria-label="Sua resposta de padrão"
        autoFocus
      />
      <button
        type="submit"
        className="pattern-submit"
        disabled={isChecking || !answer.trim()}
        aria-busy={isChecking}
      >
        {isChecking && <span className="spinner" aria-hidden="true"></span>}
        Verificar resposta
      </button>
      {feedback && (
        <div
          className={`pattern-feedback ${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
};

export default PatternChallenge;