import React from 'react';
import { Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="cityGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23111827;stop-opacity:1" /><stop offset="100%" style="stop-color:%23000000;stop-opacity:1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23cityGrad)"/><g fill="%23374151" opacity="0.3"><rect x="100" y="400" width="60" height="400"/><rect x="200" y="300" width="80" height="500"/><rect x="320" y="350" width="70" height="450"/><rect x="450" y="250" width="90" height="550"/><rect x="600" y="320" width="75" height="480"/><rect x="720" y="280" width="85" height="520"/><rect x="850" y="360" width="65" height="440"/><rect x="950" y="200" width="100" height="600"/></g></svg>')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <div className="text-center">
              <div className="text-white text-2xl font-bold">FRC</div>
              <div className="text-white text-sm font-medium">Seoul</div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">FITNESS</span>
          <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            RUNNING
          </span>
          <span className="block">CREW</span>
          <span className="block text-3xl md:text-4xl text-gray-300 mt-2">Seoul</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          물리치료사와 함께하는 전문적인 러닝 경험
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => {
              const applicationSection = document.getElementById('application');
              applicationSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              지금 시작하기
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
    </section>
  );
};

export default HeroSection;
