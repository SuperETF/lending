import React, { useState } from "react";

const brands = [
  {
    id: 3,
    name: "유리한 클래스",
    description: "오래가는 건강한 성장을 만드는 클래스",
    image: "/CLASS.png",
    url: "https://betterthanclass.com/",
  },
  {
    id: 1,
    name: "TO-DO",
    description: "오늘의 할 일을 내일의 건강으로",
    image: "/TODO.png",
    url: "https://www.tododoto.com/",
  },
  {
    id: 2,
    name: "PABOOK",
    description: "당신의 스토리를 모든 사람이 볼 수 있게",
    image: "/PABOOK.png",
    isComingSoon: true,
  },
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % brands.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + brands.length) % brands.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  // 현재 슬라이드 브랜드 정보
  const currentBrand = brands[currentSlide];

  // 버튼 클릭 핸들러
  const handleButtonClick = (brand: typeof brands[number]) => {
    if (brand.isComingSoon) {
      setShowModal(true);
    } else if (brand.url) {
      window.open(brand.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-50">
      {/* Header */}
      <header className="px-6 sm:px-10 pt-10 pb-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm mb-2">
            EVERTHREE WORKS
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-light">
            콘텐츠와 기술, 건강을 잇다
          </p>
        </div>
      </header>
      {/* Main Slider Container */}
      <div className="relative flex items-center justify-center min-h-[70vh] px-2 py-10">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="이전 브랜드"
          className="absolute left-2 sm:left-8 z-10 w-12 h-12 bg-white/40 hover:bg-white/70 border border-slate-200/80 backdrop-blur-md rounded-full shadow-none flex items-center justify-center transition-all duration-300 cursor-pointer"
          style={{ boxShadow: "0 4px 18px 0 rgba(0,0,0,0.04)" }}
        >
          <i className="fas fa-chevron-left text-lg text-gray-600"></i>
        </button>
        <button
          onClick={nextSlide}
          aria-label="다음 브랜드"
          className="absolute right-2 sm:right-8 z-10 w-12 h-12 bg-white/40 hover:bg-white/70 border border-slate-200/80 backdrop-blur-md rounded-full shadow-none flex items-center justify-center transition-all duration-300 cursor-pointer"
          style={{ boxShadow: "0 4px 18px 0 rgba(0,0,0,0.04)" }}
        >
          <i className="fas fa-chevron-right text-lg text-gray-600"></i>
        </button>
        {/* Brand Cards Container */}
        <div className="w-full max-w-3xl mx-auto overflow-hidden py-6 sm:py-10">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {brands.map((brand, idx) => (
              <div
                key={brand.id}
                className="w-full flex-shrink-0 px-2 sm:px-4 relative"
              >
                {/* 카드 */}
                <div
                  className={`
                    relative
                    rounded-3xl border border-slate-200/70 bg-white shadow-lg
                    transition-all duration-300
                    hover:border-slate-400 hover:scale-[1.03]
                  `}
                  style={{
                    boxShadow: "0 8px 32px 0 rgba(140,150,170,0.13)",
                  }}
                >
                  {/* Brand Image */}
                  <div className="h-72 sm:h-80 rounded-t-3xl overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover object-top transition-all duration-300"
                      draggable={false}
                    />
                  </div>
                  {/* Brand Info */}
                  <div className="p-6 sm:p-8 text-center rounded-b-3xl bg-transparent">
                    <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                      {brand.description}
                    </p>
                    <button
                      className={`px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-md hover:bg-gray-900 hover:text-white transition-all duration-300 font-semibold whitespace-nowrap !rounded-button shadow-none w-full ${
                        brand.isComingSoon ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                      onClick={() => handleButtonClick(brand)}
                    >
                      {brand.isComingSoon ? "준비중" : "자세히 보기"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {brands.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`${brands[index].name} 슬라이드로 이동`}
              className={`w-3 h-3 rounded-full transition-all duration-200 outline-none border-none ${
                index === currentSlide
                  ? "bg-gray-900 scale-125 shadow"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xs text-center">
            <div className="mb-4">
              <i className="fas fa-book-open text-4xl text-emerald-500 mb-2"></i>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">서비스 준비중입니다</h3>
            <p className="text-gray-500 mb-6">파북(PABOOK)은 곧 오픈 예정입니다.<br />조금만 기다려 주세요!</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-lg bg-emerald-500 text-white font-bold text-base hover:bg-emerald-600 transition"
            >
              확인
            </button>
          </div>
        </div>
      )}
      {/* Custom rounded-button utility */}
      <style>{`
        .!rounded-button { border-radius: 9999px !important; }
      `}</style>
    </div>
  );
};

export default App;
