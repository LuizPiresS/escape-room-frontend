import ChallengeForm from './ChallengeForm';

interface RiddleChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{ correct: boolean; message: string }>;
  isChecking?: boolean;
}

const RiddleChallenge: React.FC<RiddleChallengeProps> = (props) => (
  <ChallengeForm
    {...props}
    inputId="riddle-input"
    inputLabel="Desafio de Enigma"
    ariaLabel="Sua resposta de enigma"
  />
);

export default RiddleChallenge;