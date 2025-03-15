import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LLMPromptPage from './pages/LLMPromptPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage/>} /> 
              <Route path="/llm-prompt" element={<LLMPromptPage />} />
          </Routes>
      </Router>
  );
};

export default App;
