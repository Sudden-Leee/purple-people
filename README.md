# Purple People / 퍼플피플

양극화된 색깔론이 아닌 당신의 Personal Purple을 찾아주는 정치 성향 테스트 MVP입니다.

## 파일 구조

- `app/`: Next.js App Router 진입점과 전역 스타일
- `components/`: Splash, Home, Question, Result, Share Card 화면 컴포넌트
- `data/`: 30문항 테스트 데이터와 결과 타입 데이터
- `lib/`: 응답 점수화와 결과 계산 로직

## 실행

```bash
npm install
npm run dev
```

로컬 개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 빌드 확인

```bash
npm run build
npm run start
```

`npm run build`로 프로덕션 빌드가 통과하는지 확인하고, 필요하면 `npm run start`로 빌드 결과를 로컬에서 확인합니다.

## Vercel 배포

Vercel에서 새 프로젝트로 이 저장소를 연결하면 기본 설정으로 배포할 수 있습니다.

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: Next.js 기본값 사용

현재 앱은 별도의 필수 환경변수를 사용하지 않습니다. 환경변수가 필요해지는 경우 `.env.local`에 로컬 값을 두고, Vercel Project Settings의 Environment Variables에 배포 값을 등록하세요.

## MVP 기능

- Splash, Home/Intro, Question, Result, Share Card 화면
- 30문항 1~5점 응답
- 이전/다음 이동과 진행률 표시
- 모든 답변 완료 후 결과 계산
- 결과 타입, 설명, 컬러칩, 공유 카드 표시
- 다시 테스트하기
