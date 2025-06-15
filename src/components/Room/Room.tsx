import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom, checkAnswer } from '../../../api';
import CodeChallenge from './CodeChallenge';
import RiddleChallenge from './RiddleChallenge';
import PatternChallenge from './PatternChallenge';
import './Room.css';

// Tipos fortes
type ChallengeType = 'code' | 'riddle' | 'pattern';

interface Challenge {
  type: ChallengeType;
  question: string;
}

interface RoomData {
  id: number;
  name: string;
  description: string;
  challenge: Challenge;
}

interface RoomProps {
  onComplete: () => void;
}

// Custom hook para buscar sala
function useRoom(roomId: string | undefined) {
  const [room, setRoom] = useState<RoomData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchRoom = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getRoom(Number(roomId || '1'));
        if (isMounted) {
          setRoom(response.data);
        }
      } catch (err) {
        if (isMounted) setError('Erro ao carregar sala. Tente novamente.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchRoom();
    return () => { isMounted = false; };
  }, [roomId]);

  return { room, loading, error };
}

const Room: React.FC<RoomProps> = ({ onComplete }) => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { room, loading, error } = useRoom(roomId);
  const [answerFeedback, setAnswerFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // Atualiza o título da página
  useEffect(() => {
    if (room?.name) document.title = `Escape Room - ${room.name}`;
  }, [room?.name]);

  // Renderização do desafio
  function renderChallenge() {
    if (!room) return null;
    const props = {
      question: room.challenge.question,
      onCheckAnswer: handleCheckAnswer,
      isChecking,
    };
    switch (room.challenge.type) {
      case 'code':
        return <CodeChallenge {...props} />;
      case 'riddle':
        return <RiddleChallenge {...props} />;
      case 'pattern':
        return <PatternChallenge {...props} />;
      default:
        return null;
    }
  }

  // Verifica resposta
  async function handleCheckAnswer(answer: string) {
    if (!room) return { correct: false, message: 'Sala não carregada.' };
    setIsChecking(true);
    try {
      const response = await checkAnswer(room.id, answer);
      if (response.data.success) {
        setAnswerFeedback({ type: 'success', message: response.data.message });
        setTimeout(() => {
          setAnswerFeedback(null);
          onComplete();
          if (Number(roomId) === 3) {
            navigate('/win');
          } else {
            navigate(`/room/${Number(roomId || '1') + 1}`);
          }
        }, 1000);
        return { correct: true, message: response.data.message };
      } else {
        setAnswerFeedback({ type: 'error', message: response.data.message });
        return { correct: false, message: response.data.message };
      }
    } catch {
      setAnswerFeedback({ type: 'error', message: 'Erro ao verificar resposta.' });
      return { correct: false, message: 'Erro ao verificar resposta.' };
    } finally {
      setIsChecking(false);
    }
  }

  if (loading) {
    return (
      <div className="room-loading" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true"></span>
        Carregando sala...
      </div>
    );
  }
  if (error) {
    return (
      <div className="room-error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="room-container">
      <h2 tabIndex={0}>{room?.name}</h2>
      <p className="room-description">{room?.description}</p>

      {renderChallenge()}

      {answerFeedback && (
        <div
          className={`room-feedback ${answerFeedback.type}`}
          role={answerFeedback.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {answerFeedback.message}
        </div>
      )}
    </div>
  );
};

export default Room;