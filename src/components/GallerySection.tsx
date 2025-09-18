import React, { useEffect, useRef } from 'react';
import { Camera, Heart, Users, Trophy } from 'lucide-react';

const GallerySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 실제 이미지 경로들 (public 폴더의 이미지들 사용)
  const galleryImages = [
    {
      src: '/11.jpg',
      alt: 'FREE RUNNING CREW 활동 사진 1',
      category: 'running'
    },
    {
      src: '/22.png', 
      alt: 'FREE RUNNING CREW 활동 사진 2',
      category: 'group'
    },
    {
      src: '/33.png',
      alt: 'FREE RUNNING CREW 활동 사진 3', 
      category: 'training'
    },
    {
      src: '/44.png',
      alt: 'FREE RUNNING CREW 활동 사진 4',
      category: 'running'
    },
    {
      src: '/55.png',
      alt: 'FREE RUNNING CREW 활동 사진 5',
      category: 'group'
    },
    {
      src: '/66.png',
      alt: 'FREE RUNNING CREW 활동 사진 6',
      category: 'training'
    }
  ];

  // 자동 스크롤 기능
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollDirection = 1; // 1: 오른쪽, -1: 왼쪽
    const scrollSpeed = 0.5; // 스크롤 속도 (픽셀/프레임)

    const autoScroll = () => {
      if (!scrollContainer) return;

      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // 스크롤 방향 변경 조건
      if (scrollContainer.scrollLeft >= maxScrollLeft) {
        scrollDirection = -1;
      } else if (scrollContainer.scrollLeft <= 0) {
        scrollDirection = 1;
      }

      // 스크롤 실행
      scrollContainer.scrollLeft += scrollSpeed * scrollDirection;
    };

    const intervalId = setInterval(autoScroll, 16); // ~60fps

    // 마우스 호버 시 자동 스크롤 정지
    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      clearInterval(intervalId);
      const newIntervalId = setInterval(autoScroll, 16);
      return newIntervalId;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', () => {
      const newIntervalId = setInterval(autoScroll, 16);
    });

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              OUR MOMENTS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            FRC와 함께한 특별한 순간들
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6"></div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none'
          }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl bg-gray-800 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 flex-shrink-0"
              style={{ width: '320px' }}
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    // 이미지 로드 실패 시 대체 이미지 또는 그라데이션 배경
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-500/20', 'to-purple-600/20');
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-2 text-white">
                      {image.category === 'running' && <Trophy className="w-4 h-4" />}
                      {image.category === 'group' && <Users className="w-4 h-4" />}
                      {image.category === 'training' && <Heart className="w-4 h-4" />}
                      <span className="text-sm font-medium capitalize">
                        {image.category === 'running' && '러닝 활동'}
                        {image.category === 'group' && '그룹 활동'}
                        {image.category === 'training' && '트레이닝'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>

              {/* Image Index Badge */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
