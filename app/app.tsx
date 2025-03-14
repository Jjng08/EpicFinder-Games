import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import GameDetailPage from './routes/GameDetail';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/:id" element={<GameDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;