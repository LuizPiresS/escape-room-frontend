import React, { useState } from 'react';
import './CodeChallenge.css';

interface CodeChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{ correct: boolean; message: string }>;
  isChecking?: boolean;
}

const CodeChallenge: React.FC<CodeChallengeProps> = ({ question, onCheckAnswer, isChecking }) => {
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
    <form className="code-challenge" onSubmit={handleSubmit} aria-label="Desafio de Código">
      <label htmlFor="code-input" className="code-question">
        {question}
      </label>
      <input
        id="code-input"
        className="code-input"
        type="text"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={isChecking}
        aria-required="true"
        aria-label="Sua resposta de código"
        autoFocus
      />
      <button
        type="submit"
        className="code-submit"
        disabled={isChecking || !answer.trim()}
        aria-busy={isChecking}
      >
        {isChecking && <span className="spinner" aria-hidden="true"></span>}
        Verificar resposta
      </button>
      {feedback && (
        <div
          className={`code-feedback ${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
};

export default CodeChallenge;