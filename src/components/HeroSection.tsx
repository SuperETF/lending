import React from 'react';
import { Play } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-48 h-48 mb-6">
            <img 
              src="/FRC.png" 
              alt="FREE RUNNING CREW Seoul Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="block">FREE</span>
          <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            RUNNING
          </span>
          <span className="block">CREW</span>
          <span className="block text-2xl md:text-3xl text-gray-300 mt-2">Seoul</span>
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
