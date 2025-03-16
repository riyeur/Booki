import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LLMPromptPage from './pages/LLMPromptPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/signupPage';
import ResultsPage from './pages/ResultsPage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/llm-prompt" element={<LLMPromptPage />} />
              <Route path="llm-results" element={<ResultsPage />} />
          </Routes>
      </Router>
  );
};

export default App;
