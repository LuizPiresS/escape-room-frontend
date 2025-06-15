import ChallengeForm from './ChallengeForm';

interface PatternChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{ correct: boolean; message: string }>;
  isChecking?: boolean;
}

const PatternChallenge: React.FC<PatternChallengeProps> = (props) => (
  <ChallengeForm
    {...props}
    inputId="pattern-input"
    inputLabel="Desafio de Padrão"
    ariaLabel="Sua resposta de padrão"
  />
);

export default PatternChallenge;