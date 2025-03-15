import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<ProfilePage/>} /> 
          </Routes>
      </Router>
  );
};

export default App;
