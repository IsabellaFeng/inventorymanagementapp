import React from 'react';
import HomePage from './views/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopAppBar from './components/TopAppBar';
import './App.css';
import DashBoard from './views/DashboardView';

const App: React.FC = () => {
  return (
    <Router>
      <TopAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
};

export default App;