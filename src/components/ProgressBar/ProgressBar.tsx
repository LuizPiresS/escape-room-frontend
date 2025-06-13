import React, { useEffect, useState } from 'react';
import { getProgress } from '../../../api';

const ProgressBar: React.FC<{ refreshKey: number }> = ({ refreshKey }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const response = await getProgress();
        setProgress(response.data.data.percentage);
      } catch (error) {
        console.error('Erro ao carregar progresso:', error);
      }
    };
    
    loadProgress();
  }, [refreshKey]); // Atualiza quando refreshKey muda

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="progress-text">{progress}% completo</div>
    </div>
  );
};

export default ProgressBar;