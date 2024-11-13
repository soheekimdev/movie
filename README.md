# 영화 정보 웹 애플리케이션

## 기본 정보

- 프로젝트명: 영화 정보 웹 애플리케이션 (가제)
- 프로젝트 소개: TMDB API를 활용한 영화 정보 웹 애플리케이션
- 프로젝트의 목적/목표: 웹 애플리케이션 제작 과정에서 프론트엔드 웹개발 기술을 학습
- 주요 기능
  - 영화 정보 조회: 최신 영화 목록, 인기순 영화 목록, 영화 상세 정보
  - 검색 기능: 영화 제목 기반 검색
  - 사용자 관리: 이메일 회원가입/로그인, Google 소셜 로그인
  - (추가 예정)

## 기술 스택

### Frontend

- React + Vite
- JavaScript
- TailwindCSS
- 상태 관리: Redux (Redux Toolkit)

### Backend/Infrastructure

- Supabase (인증, 데이터베이스)
- TMDB API (영화 데이터)

## 개발 환경 정보

### 필수 요구사항

- Node.js: v18.0.0 이상
- pnpm: v8.0.0 이상

### 주요 라이브러리 버전

#### Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "@reduxjs/toolkit": "^2.3.0",
  "react-redux": "^9.1.2",
  "@supabase/supabase-js": "^2.46.1",
  "axios": "^1.7.7",
  "swiper": "^11.1.14",
  "lucide-react": "^0.456.0",
  "react-icons": "^5.3.0"
}
```

#### DevDependencies

```json
{
  "vite": "^5.4.10",
  "tailwindcss": "^3.4.14",
  "eslint": "^9.13.0",
  "postcss": "^8.4.47",
  "autoprefixer": "^10.4.20"
}
```

### 스크립트 명령어

```bash
# 개발 서버 실행 (기본 포트: 5173)
pnpm dev

# 프로덕션용 빌드
pnpm build

# 빌드된 버전 미리보기
pnpm preview

# 코드 린팅 실행
pnpm lint
```

### 환경 구성

1. 저장소 클론

```bash
git clone [repository-url]
cd [project-directory]
```

2. 환경 변수 설정

```bash
cp .env.example .env
```

- `.env` 파일에 필요한 환경 변수 설정
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY
  - VITE_TMDB_API_KEY

3. 프로젝트 실행

```bash
# pnpm 설치 (아직 설치하지 않은 경우)
npm install -g pnpm

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

## 프로젝트 구조

```
MOVIE/
├── docs/                      # 프로젝트 문서
├── public/                    # 정적 파일
├── src/
│   ├── api/                   # API 관련 설정
│   │   ├── supabase.js       # Supabase 클라이언트 설정
│   │   └── tmdb.js           # TMDB API 설정
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── Button.jsx
│   │   ├── GoogleLoginButton.jsx
│   │   ├── InputWithLabel.jsx
│   │   ├── MovieCard.jsx
│   │   └── NavBar.jsx
│   ├── hooks/                # 커스텀 훅
│   ├── layouts/              # 레이아웃 컴포넌트
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── AuthCallback.jsx
│   │   ├── Login.jsx
│   │   ├── Main.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── MyPage.jsx
│   │   └── Signup.jsx
│   ├── store/                # 상태 관리
│   │   ├── authSlice.js
│   │   └── store.js
│   └── styles/               # 스타일 관련 파일
├── .env                      # 환경 변수
└── package.json
```

## API 구조

### TMDB API

- 영화 목록 조회: `/movie/popular`, `/movie/now_playing`
- 영화 상세 정보: `/movie/{movie_id}`
- 영화 검색: `/search/movie`

### Supabase

- 인증 관리: 이메일/비밀번호 로그인, Google OAuth
- 사용자 데이터 관리: profiles 테이블

## 개발 가이드

### 컴포넌트 작성 규칙

- 컴포넌트는 기능별로 분리하여 작성
- Props는 명확한 이름과 타입을 사용
- 재사용 가능한 로직은 커스텀 훅으로 분리

### 코드 스타일

- ESLint 규칙을 준수
- 함수형 컴포넌트와 훅 사용
- 일관된 코드 포맷팅 (Prettier 설정 사용)

## 배포 정보

- 배포 플랫폼: Vercel/Netlify (예정)
- 배포 URL: [추후 추가]

## 프로젝트 관리

- 이슈 관리: GitHub Issues
- 프로젝트 보드: GitHub Projects
- 문서화: docs/ 디렉토리
