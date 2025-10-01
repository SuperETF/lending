// 한국 시간 기준 날짜 유틸리티 함수들

/**
 * 한국 시간 기준으로 현재 날짜를 YYYY-MM-DD 형식으로 반환
 */
export const getKoreanToday = (): string => {
  const now = new Date();
  const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
  return koreanTime.toISOString().split('T')[0];
};

/**
 * 한국 시간 기준으로 현재 날짜와 시간을 반환
 */
export const getKoreanNow = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + (9 * 60 * 60 * 1000)); // UTC+9
};

/**
 * 날짜를 한국 시간 기준으로 변환
 */
export const toKoreanTime = (date: Date | string): Date => {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  return new Date(targetDate.getTime() + (9 * 60 * 60 * 1000));
};

/**
 * 한국 시간 기준으로 날짜를 로컬 문자열로 변환
 */
export const formatKoreanDate = (date: Date | string): string => {
  const koreanDate = toKoreanTime(date);
  return koreanDate.toLocaleDateString('ko-KR');
};

/**
 * 한국 시간 기준으로 날짜와 시간을 로컬 문자열로 변환
 */
export const formatKoreanDateTime = (date: Date | string): string => {
  const koreanDate = toKoreanTime(date);
  return koreanDate.toLocaleString('ko-KR');
};

/**
 * 한국 시간 기준으로 시간을 로컬 문자열로 변환
 */
export const formatKoreanTime = (date: Date | string): string => {
  const koreanDate = toKoreanTime(date);
  return koreanDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * 한국 시간 기준으로 월과 일을 반환
 */
export const formatKoreanMonthDay = (date: Date | string): string => {
  const koreanDate = toKoreanTime(date);
  return koreanDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric'
  });
};

/**
 * 한국 시간 기준으로 현재 월과 년도를 확인
 */
export const isCurrentMonthKorean = (date: Date | string): boolean => {
  const koreanDate = toKoreanTime(date);
  const koreanNow = getKoreanNow();
  return koreanDate.getMonth() === koreanNow.getMonth() && 
         koreanDate.getFullYear() === koreanNow.getFullYear();
};

/**
 * CSV 파일명용 한국 날짜 형식 (YYYY-MM-DD)
 */
export const getKoreanDateForFilename = (): string => {
  return getKoreanToday();
};
