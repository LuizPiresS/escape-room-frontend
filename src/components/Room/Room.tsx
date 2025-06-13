import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom, checkAnswer } from '../../../api';
import CodeChallenge from './CodeChallenge';
import RiddleChallenge from './RiddleChallenge';
import PatternChallenge from './PatternChallenge';

interface RoomProps {
  onComplete: () => void;
}

const Room: React.FC<RoomProps> = ({ onComplete }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await getRoom(parseInt(roomId || '1'));
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar sala');
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSuccess = async () => {
    try {
      // Espera um breve momento para garantir que o estado foi atualizado
      await new Promise(resolve => setTimeout(resolve, 300));
      onComplete();
      
      if (parseInt(roomId || '1') === 3) {
        navigate('/win');
      } else {
        navigate(`/room/${parseInt(roomId || '1') + 1}`);
      }
    } catch (error) {
      console.error('Erro ao avançar:', error);
    }
  };

  const handleCheckAnswer = async (answer: string) => {
    try {
      const response = await checkAnswer(room.id, answer);
      if (response.data.success) {
        handleSuccess();
        return { correct: true, message: response.data.message };
      }
      return { correct: false, message: response.data.message };
    } catch (error) {
      console.error('Erro ao verificar resposta:', error);
      return { correct: false, message: 'Erro ao verificar resposta' };
    }
  };

  if (loading) return <div className="room-loading">Carregando sala...</div>;
  if (error) return <div className="room-error">{error}</div>;

  return (
    <div className="room-container">
      <h2>{room?.name}</h2>
      <p className="room-description">{room?.description}</p>
      
      {room?.challenge.type === 'code' && (
        <CodeChallenge
          question={room.challenge.question}
          onCheckAnswer={handleCheckAnswer}
        />
      )}
      
      {room?.challenge.type === 'riddle' && (
        <RiddleChallenge
          question={room.challenge.question}
          onCheckAnswer={handleCheckAnswer}
        />
      )}
      
      {room?.challenge.type === 'pattern' && (
        <PatternChallenge
          question={room.challenge.question}
          onCheckAnswer={handleCheckAnswer}
        />
      )}
    </div>
  );
};

export default Room;