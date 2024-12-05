import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleDetail from './pages/ArticleDetails';
import SpeakerPage from './pages/SpeakerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/speaker/:speaker" element={<SpeakerPage />} />
      </Routes>
    </Router>
  );
};

export default App;