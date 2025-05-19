import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BacklogPage from './BacklogPage';
import CompletedPage from './CompletedPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/backlog" element={<BacklogPage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/" element={<BacklogPage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}
