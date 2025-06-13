import React from 'react';
import { useNavigate } from 'react-router-dom';
import { resetGame } from '../../../api';

interface WinScreenProps {
  onReset: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ onReset }) => {
  const navigate = useNavigate();

  const handlePlayAgain = async () => {
    try {
      await resetGame();
      onReset(); // Esta é a chamada crucial que faltava
      navigate('/room/1');
    } catch (error) {
      console.error('Erro ao reiniciar o jogo:', error);
    }
  };

  return (
    <div className="win-container">
      <h1>Parabéns! Você escapou com sucesso!</h1>
      <p>Você completou todas as salas do Escape Room.</p>
      <button onClick={handlePlayAgain}>Jogar novamente</button>
    </div>
  );
};

export default WinScreen;