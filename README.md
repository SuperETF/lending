# FRC (Fitness Running Crew) 웹사이트

물리치료사가 운영하는 전문적인 러닝 크루를 위한 모바일 반응형 웹사이트입니다.

## 프로젝트 소개

FRC는 물리치료사의 임상 경험을 바탕으로 안전하고 효과적인 러닝 경험을 제공하는 러닝 크루입니다. 운동을 처음 시작하는 분들도 편안하게 참여할 수 있도록 전문적인 지도와 포용적인 환경을 제공합니다.

## 기술 스택

- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 주요 기능

### 사용자 기능
- **히어로 섹션**: 어두운 도시적 테마의 메인 화면
- **소개 섹션**: FRC의 가치관과 전문성 소개
- **신청 섹션**: 개인정보 동의를 포함한 참여 신청 폼

### 관리자 기능 (`/admin`)
- 러닝 세션 생성 및 관리
- 참여자 정보 조회 및 관리
- 실시간 통계 대시보드

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 Supabase 정보를 입력하세요:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase 데이터베이스 설정
`supabase-schema.sql` 파일의 SQL을 Supabase 콘솔에서 실행하여 필요한 테이블을 생성하세요.

### 4. 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 데이터베이스 스키마

### Tables
- `admins`: 관리자 정보
- `running_sessions`: 러닝 세션 정보
- `participants`: 참여자 신청 정보

### 주요 필드
- 참여자 개인정보 (이름, 연락처, 이메일)
- 비상연락처 정보
- 건강상태 및 특이사항
- 개인정보 처리 동의 여부

## 디자인 특징

- **다크 테마**: 검은색 배경과 그라데이션 효과
- **도시적 느낌**: 건물 실루엣과 네온 색상 활용
- **모바일 우선**: 반응형 디자인으로 모든 기기 지원
- **부드러운 애니메이션**: hover 효과와 전환 애니메이션

## 보안 및 개인정보

- Supabase Row Level Security (RLS) 적용
- 개인정보 처리방침 동의 필수
- 마케팅 정보 수신 동의 선택

## 사용 방법

### 일반 사용자
1. 메인 페이지에서 FRC 소개 확인
2. "지금 시작하기" 버튼 클릭하여 신청 섹션으로 이동
3. 필요한 정보 입력 및 개인정보 동의
4. 신청 완료 후 관리자 연락 대기

### 관리자
1. `/admin` 페이지 접속
2. 새 러닝 세션 생성
3. 참여자 정보 확인 및 관리
4. 통계 정보 모니터링

## 배포

```bash
npm run build
```

빌드된 파일을 원하는 호스팅 서비스에 배포하세요.

## 문의

FRC 러닝 크루에 대한 문의사항이 있으시면 웹사이트의 신청 폼을 통해 연락주세요.
