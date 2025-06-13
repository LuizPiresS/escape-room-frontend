import React, { useState } from 'react';

interface CodeChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{
    correct: boolean;
    message: string;
  }>;
}

const CodeChallenge: React.FC<CodeChallengeProps> = ({ question, onCheckAnswer }) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await onCheckAnswer(answer);
    if (!result.correct) {
      setError(result.message);
    }
  };

  return (
    <div className="challenge-container">
      <h3>{question}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Sua resposta"
        />
        <button type="submit">Enviar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CodeChallenge;