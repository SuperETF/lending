import React from "react";

const detailImages = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png",
  "/9.png",
  "/10.png",
];
const coverImage = "/neurobook.png";
const detailUrl = "https://product.kyobobook.co.kr/detail/S000217135483";
const bookTitle = "운동 지도자를 위한 신경계 길잡이";
const bookDesc = `복잡하고 어렵게 느껴지던 신경계 개념을 단순화하고, 운동과 연결해 실질적인 이해를 돕는 책입니다. 이 책은 신경계의 구조와 기능, 그리고 운동 수행에서의 역할을 쉽고 재미있게 풀어냅니다.`;

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center py-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg mx-auto p-0 overflow-hidden">

        {/* 상세 이미지(첫번째 이미지만 px 단위 crop, 나머지는 전체 노출) */}
        <div className="w-full flex flex-col gap-2 pb-2">
          {/* 첫번째 이미지는 height(px)로 crop */}
          {detailImages.length > 0 && (
            <div
              className="w-full overflow-hidden"
              style={{
                height: "960px",         // ← 여기서 원하는 만큼 픽셀 단위로 자르세요!
              }}
            >
              <img
                src={detailImages[0]}
                alt="상세 이미지 1"
                className="w-full h-full object-cover object-bottom"
                style={{ display: "block" }}
              />
            </div>
          )}
          {/* 나머지 이미지는 전체 다 노출 */}
          {detailImages.slice(1).map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`상세 이미지 ${idx + 2}`}
              className="w-full h-auto object-cover"
            />
          ))}
        </div>

        {/* 제목/설명 */}
        <div className="p-6 pb-2">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-3 leading-tight">
            {bookTitle}
          </h1>
          <p className="text-base text-gray-600 text-center leading-relaxed mb-2 whitespace-pre-line">
            {bookDesc}
          </p>
        </div>

        {/* 하단 버튼 (그라데이션) */}
        <div className="px-6 pb-6">
          <button
            onClick={() => window.open(detailUrl, "_blank")}
            className="
              w-full h-14
              bg-gradient-to-r from-pink-500 to-purple-500
              hover:from-pink-600 hover:to-purple-600
              text-white font-medium text-lg
              rounded-full shadow-md hover:shadow-lg transition-all duration-200
              cursor-pointer active:scale-95
            "
          >
            책 구매하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
