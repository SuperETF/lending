import React, { useEffect } from 'react';
import { MapPin, Instagram, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  useEffect(() => {
    console.log('🚀 HeroSection 마운트됨');
    console.log(`🌐 현재 환경: ${process.env.NODE_ENV}`);
    console.log(`📂 PUBLIC_URL: ${process.env.PUBLIC_URL || 'undefined'}`);
    console.log(`🔗 현재 위치: ${window.location.href}`);
    console.log(`📱 User Agent: ${navigator.userAgent}`);
    console.log(`📊 화면 크기: ${window.innerWidth}x${window.innerHeight}`);
  }, []);
  const growers = [
    {
      id: 1,
      name: "서보찬",
      title: "FRC GROWER",
      specialty: "물리치료사",
      experience: "5년",
      description: "임상 경험을 바탕으로 안전하고 효과적인 러닝 프로그램을 설계합니다. 부상 예방과 퍼포먼스 향상에 특화된 전문가입니다.",
      instagram: "@borunnn_fit",
      achievements: ["물리치료사 면허","FRC.seoul 크루장", "20만 팔로워 크리에이터"],
      image: "/bcc.png"
    },
    {
      id: 2,
      name: "채정욱",
      title: "FRC GROWER",
      specialty: "물리치료사",
      experience: "6년",
      description: "운동 초보자분들에게 개인별 맞춤형 트레이닝과 프로그램을 제공합니다. 지속 가능한 러닝 라이프를 만들어갑니다.",
      instagram: "@chae_dev",
      achievements: ["물리치료사 면허", "통증, 교정 운동 17만 크리에이터", "파브의 통증, 교정 운동 저자"],
      image: "/ccc.png"
    }
  ];

  const handleInstagramClick = (instagram: string) => {
    const instagramUrl = `https://instagram.com/${instagram.replace('@', '')}`;
    window.open(instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
    {/* Hero Section */}
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
          <div className="inline-flex items-center justify-center w-64 h-64 mb-6 animate-fade-in-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards', animationDuration: '1.2s'}}>
            <img 
              src="/FRC.png" 
              alt="FREE RUNNING CREW Seoul Logo" 
              className="w-full h-full object-contain"
              onLoad={() => {
                console.log(`✅ FRC 로고 로드 성공: /FRC.png`);
                console.log(`🌐 현재 URL: ${window.location.href}`);
              }}
              onError={(e) => {
                console.error(`❌ FRC 로고 로드 실패: /FRC.png`);
                console.error(`🌐 현재 URL: ${window.location.href}`);
                const target = e.target as HTMLImageElement;
                console.error(`🎯 실제 src 속성: ${target.src}`);
              }}
            />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          <span className="block animate-fade-in-up opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300">RUN</span> 
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent ml-4 animate-shimmer">FREE</span>
          </span>
          <span className="block animate-fade-in-up opacity-0" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:animate-pulse transition-all duration-300">RUN</span> 
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent ml-4 animate-shimmer">STRONG</span>
          </span>
          <span className="block text-2xl md:text-3xl mt-16 flex items-center justify-center gap-2 animate-fade-in-up opacity-0" style={{animationDelay: '1.8s', animationFillMode: 'forwards'}}>
            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-blue-400 animate-bounce" />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Seoul</span>
          </span>
        </h1>



      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
    </section>

    {/* Grower Section */}
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              FRC GROWER
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          스포츠가 즐거워질 수 있도록 그로워가 여러분들을 도와드립니다.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6"></div>
        </div>

        {/* Growers Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 max-w-4xl mx-auto">
          {growers.map((grower) => (
            <div 
              key={grower.id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 w-full max-w-sm"
            >
              {/* Profile Image - Takes up half of the card */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={grower.image}
                  alt={`${grower.name} 프로필`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onLoad={() => {
                    console.log(`✅ 그로워 이미지 로드 성공: ${grower.image}`);
                    console.log(`📱 User Agent: ${navigator.userAgent}`);
                    console.log(`🌐 현재 URL: ${window.location.href}`);
                    console.log(`📂 PUBLIC_URL: ${process.env.PUBLIC_URL || 'undefined'}`);
                  }}
                  onError={(e) => {
                    console.error(`❌ 그로워 이미지 로드 실패: ${grower.image}`);
                    console.error(`📱 User Agent: ${navigator.userAgent}`);
                    console.error(`🌐 현재 URL: ${window.location.href}`);
                    console.error(`📂 PUBLIC_URL: ${process.env.PUBLIC_URL || 'undefined'}`);
                    console.error(`🔗 시도한 이미지 URL: ${grower.image}`);
                    
                    // 실제 요청된 URL 확인
                    const target = e.target as HTMLImageElement;
                    console.error(`🎯 실제 src 속성: ${target.src}`);
                    console.error(`📊 이미지 naturalWidth: ${target.naturalWidth}`);
                    console.error(`📊 이미지 naturalHeight: ${target.naturalHeight}`);
                    
                    target.style.display = 'none';
                    target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-500/20', 'to-purple-600/20');
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/80 via-transparent to-transparent"></div>
              </div>

              {/* Content Section - Takes up the other half */}
              <div className="p-8">
                {/* Profile Info */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{grower.name}</h3>
                  <p className="text-blue-400 font-semibold mb-1">{grower.title}</p>
                  <p className="text-gray-300">{grower.specialty}</p>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  {grower.description}
                </p>

                {/* Achievements */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-white font-medium">주요 자격 및 성과</span>
                  </div>
                  <div className="space-y-2">
                    {grower.achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-300 bg-gray-700/30 rounded-lg px-3 py-2"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instagram Link */}
                <div className="pt-6 border-t border-gray-700">
                  <button
                    onClick={() => handleInstagramClick(grower.instagram)}
                    className="w-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/30 text-pink-300 hover:text-pink-200 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>{grower.instagram}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    </>
  );
};

export default HeroSection;
