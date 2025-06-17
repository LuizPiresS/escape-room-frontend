import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Room from './components/Room/Room';
import ProgressBar from './components/ProgressBar/ProgressBar';
import WinScreen from './components/WinScreen/WinScreen';

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1); // Isso força a ProgressBar a atualizar
  };

  return (
    <Router>
      <div className="app">
        <h1>Escape Room Digital</h1>
        <ProgressBar refreshKey={refreshKey} />
        <Routes>
          <Route path="/room/:roomId" element={<Room onComplete={triggerRefresh} />} />
          <Route path="/win" element={<WinScreen onReset={triggerRefresh} />} />
          <Route path="/" element={<Room onComplete={triggerRefresh} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;