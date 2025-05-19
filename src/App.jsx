import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BacklogPage from './BacklogPage.jsx';
import CompletedPage from './CompletedPage.jsx';
import LibraryPage from './LibraryPage.jsx';
import FAQpage from './FAQPage.jsx';
import Home from './HomePage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/completed" element={<CompletedPage />} />
      <Route path="/backlog" element={<BacklogPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/faq" element={<FAQpage />} />
    </Routes>
  );
}
