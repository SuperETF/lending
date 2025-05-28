import React from "react";

const instructorData = [
  { name: "문동진", role: "퍼스널 브랜딩", img: "/mdj2.png" },
  { name: "서보찬", role: "퍼스널 브랜딩", img: "/sbc2.png" },
  { name: "이원주", role: "센터 창업", img: "/ewj2.png" },
  { name: "윤청구", role: "센터 창업", img: "/ycg2.png" },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 text-white">
      {/* Nav Bar */}
      <nav className="fixed top-0 w-full bg-emerald-900/90 backdrop-blur-sm z-50 px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">네트워킹 데이</h1>
        <button className="text-white">
          <i className="fas fa-share-alt text-xl"></i>
        </button>
      </nav>
      <main className="pt-16 pb-20 px-4">
        {/* Hero Section */}
        <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden mb-8 bg-white/5">
          <img
            src="/net.png"
            alt="물리치료사경영인모임 NETWORKING DAY"
            className="w-full h-auto block object-contain"
            style={{ aspectRatio: "3 / 4" }} // 포스터 비율 유지
          />
        </div>
        {/* Instructors Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">강사진 소개</h2>
          <div className="grid grid-cols-2 gap-4">
            {instructorData.map((instructor, idx) => (
              <div
                key={instructor.name}
                className="bg-white/10 rounded-xl p-4 text-center cursor-pointer hover:bg-white/20 transition-colors"
              >
                <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden aspect-square bg-emerald-700 flex items-center justify-center">
                  <img
                    src={instructor.img}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold">{instructor.name}</h3>
                <p className="text-sm text-emerald-300">{instructor.role}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Event Details */}
        <section className="bg-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">강의 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <i className="fas fa-calendar-alt w-6"></i>
              <span>2025년 6월 29일 (일)</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt w-6"></i>
              <span>하이서울유스호스텔, 다이아몬드홀</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock w-6"></i>
              <span>09:00 - 16:00</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-won-sign w-6"></i>
              <span>참가비: 1부 30,000원(120명) / 2부 50,000원(선착순 80명)</span>
            </div>
          </div>
        </section>
        {/* CTA Button */}
        <div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdg_y_DFOFhFnajGJIZEjc3eqlZY_2HXKHu9biTVW1GyKp7KQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
          >
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-colors">
              신청하기
            </button>
          </a>
        </div>
      </main>
    </div>
  );
};

export default App;
