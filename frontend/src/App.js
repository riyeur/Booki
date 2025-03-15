import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<ProfilePage/>} /> 
              <Route path="/" element={<LoginPage />} />
          </Routes>
      </Router>
  );
};

export default App;
