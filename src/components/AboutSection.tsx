import React from 'react';
import { Heart, Users, Award, Target } from 'lucide-react';

const AboutSection: React.FC = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "전문성",
      description: "물리치료사의 임상 경험을 바탕으로 한 안전하고 효과적인 운동 지도"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "포용성",
      description: "운동을 해보지 않은 분들도 편안하게 시작할 수 있는 환경 제공"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "성장",
      description: "그로워로써 함께 발전하며 스포츠의 즐거움을 발견"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "가치",
      description: "매 순간이 의미있는 시간이 되도록 다양한 테마와 지식 공유"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            우리의 <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">가치관</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        </div>

        {/* Main Description */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-16 border border-gray-700/50">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            물리치료사가 운영하는 러닝 크루로, 임상 경험을 바탕으로 운동을 재미있게 도와드립니다. 
            우리는 그로워로써 스포츠를 즐기지 못하는 운동을 해보지 않은 사람들을 위한 러닝 경험을 선사합니다. 
            그것뿐만이 아닌 매 다양한 테마로 선물을, 그리고 지식을 한 순간이 시간 낭비가 아닐겁니다.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="group bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-blue-400 mb-4 group-hover:text-purple-400 transition-colors duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
            <div className="text-gray-400">참여자</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">세션</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
            <div className="text-gray-400">년 경력</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">지원</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
