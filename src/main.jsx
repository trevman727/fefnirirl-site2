import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BacklogPage from './BacklogPage.jsx';
import CompletedPage from './CompletedPage.jsx';
import Home from './HomePage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/backlog" element={<BacklogPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
