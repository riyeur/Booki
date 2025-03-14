import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LLMPromptPage from './pages/LLMPromptPage';

const App = () => {
  return (
      <Router>
          <Routes>
              {<Route path="/llm-prompt" element={<LLMPromptPage />} />}
          </Routes>
      </Router>
  );
};

export default App;
