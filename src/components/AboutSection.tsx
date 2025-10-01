import React from 'react';

const AboutSection: React.FC = () => {

  return (
    <section className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            ABOUT <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">FRC</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto animate-fade-in-up opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}></div>
        </div>

        {/* Main Description - 박스 제거하고 시원하게 */}
        <div className="text-center mb-20">
          <div className="max-w-6xl mx-auto space-y-10">
            <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light animate-fade-in-up opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
              스포츠를 즐기고 싶지만,<br />
              기초 체력이 바탕이 되지 않는 분들을 위해 노력합니다.
            </p>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in-up opacity-0" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
              운동의 재미는 준비된 몸이 먼저,<br />
              건강한 스포츠를 받아들일 수 있는<br />
              징검다리로서 역할을 합니다.
            </p>
            
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed animate-fade-in-up opacity-0" style={{animationDelay: '1.0s', animationFillMode: 'forwards'}}>
              테마가 섞인 러닝 섹션<br />
              다양한 선물로 러닝에 동기부여를 드리기 위해 노력합니다.
            </p>

            <p className="text-lg md:text-xl text-blue-300 leading-relaxed font-medium animate-fade-in-up opacity-0" style={{animationDelay: '1.2s', animationFillMode: 'forwards'}}>
              우리는 그냥 뛰지 않습니다.<br />
              필요한 것을 알고 행동합니다.
            </p>
          </div>
        </div>


      </div>
    </section>
  );
};

export default AboutSection;
