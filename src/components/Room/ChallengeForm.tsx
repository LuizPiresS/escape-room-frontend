import React, { useState } from 'react';
import '../Spinner/spinner.css';
import './ChallengeForm.css';

interface ChallengeFormProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{ correct: boolean; message: string }>;
  isChecking?: boolean;
  inputId: string;
  inputLabel: string;
  inputType?: string;
  ariaLabel?: string;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({
  question,
  onCheckAnswer,
  isChecking,
  inputId,
  inputLabel,
  inputType = 'text',
  ariaLabel = 'Sua resposta',
}) => {
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
    <form className="challenge-form" onSubmit={handleSubmit} aria-label={inputLabel}>
      <label htmlFor={inputId} className="challenge-question">
        {question}
      </label>
      <input
        id={inputId}
        className="challenge-input"
        type={inputType}
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        disabled={isChecking}
        aria-required="true"
        aria-label={ariaLabel}
        autoFocus
      />
      <button
        type="submit"
        className="challenge-submit"
        disabled={isChecking || !answer.trim()}
        aria-busy={isChecking}
      >
        {isChecking && <span className="spinner" aria-hidden="true"></span>}
        Verificar resposta
      </button>
      {feedback && (
        <div
          className={`challenge-feedback ${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}
    </form>
  );
};

export default ChallengeForm;