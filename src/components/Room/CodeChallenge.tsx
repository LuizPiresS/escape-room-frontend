import ChallengeForm from './ChallengeForm';

interface CodeChallengeProps {
  question: string;
  onCheckAnswer: (answer: string) => Promise<{ correct: boolean; message: string }>;
  isChecking?: boolean;
}

const CodeChallenge: React.FC<CodeChallengeProps> = (props) => (
  <ChallengeForm
    {...props}
    inputId="code-input"
    inputLabel="Desafio de Código"
    ariaLabel="Sua resposta de código"
  />
);

export default CodeChallenge;