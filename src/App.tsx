import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import ApplicationSection from './components/ApplicationSection';
import AdminPage from './components/AdminPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <AboutSection />
              <GallerySection />
              <ApplicationSection />
            </>
          } />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
