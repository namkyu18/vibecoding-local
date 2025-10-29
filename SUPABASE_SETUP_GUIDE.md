# Supabase 데이터베이스 설정 가이드

이 가이드는 namkyu18's Project를 이용해서 Supabase 데이터베이스를 설정하고 기존 API들과 연결하는 방법을 설명합니다.

## 1. Supabase 프로젝트 설정

### 1.1 Supabase 프로젝트 생성
1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 이름을 "namkyu18's Project"로 설정
4. 데이터베이스 비밀번호 설정
5. 리전 선택 (가장 가까운 리전 권장)

### 1.2 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Supabase 대시보드의 Settings > API에서 URL과 anon key를 확인할 수 있습니다.

## 2. 데이터베이스 스키마 생성

### 2.1 SQL 에디터에서 스키마 실행
Supabase 대시보드의 SQL Editor에서 `database/schema.sql` 파일의 내용을 실행하세요.

이 스크립트는 다음 테이블들을 생성합니다:
- `developer` - 개발자 정보
- `skills` - 기술 스택
- `projects` - 프로젝트 정보
- `guestbook` - 방명록
- `likes` - 좋아요 시스템
- `recommendations` - 추천 문구

### 2.2 초기 데이터 삽입
SQL Editor에서 `database/seed.sql` 파일의 내용을 실행하여 초기 데이터를 삽입하세요.

## 3. API 연동 확인

### 3.1 개발 서버 실행
```bash
npm run dev
```

### 3.2 API 엔드포인트 테스트

#### 포트폴리오 API
- `GET /api/portfolio` - 모든 프로젝트 조회
- `GET /api/portfolio?status=완료` - 완료된 프로젝트만 조회
- `GET /api/portfolio?tech=React,Next.js` - 특정 기술 스택 프로젝트 조회
- `GET /api/portfolio/[id]` - 특정 프로젝트 상세 조회

#### 기술 스택 API
- `GET /api/skills` - 모든 기술 스택 조회
- `GET /api/skills?category=frontend` - 프론트엔드 기술만 조회
- `GET /api/skills?level=고급` - 고급 레벨 기술만 조회

#### 방명록 API
- `GET /api/guestbook` - 방명록 조회
- `POST /api/guestbook` - 방명록 작성
- `DELETE /api/guestbook?id=uuid` - 방명록 삭제

#### 좋아요 API
- `GET /api/likes` - 모든 좋아요 조회
- `GET /api/likes?itemType=project` - 프로젝트 좋아요만 조회
- `GET /api/likes?itemId=project-id` - 특정 아이템 좋아요 조회
- `POST /api/likes` - 좋아요 토글

#### 추천 문구 API
- `GET /api/recommendations` - 모든 추천 문구 조회
- `GET /api/recommendations?type=random` - 랜덤 추천 문구
- `GET /api/recommendations?category=motivation` - 동기부여 카테고리 추천

#### 개발자 정보 API
- `GET /api/developer` - 개발자 기본 정보
- `GET /api/developer?includeSkills=true` - 기술 스택 포함 정보
- `GET /api/developer?includeSkills=true&skillCategory=frontend` - 프론트엔드 기술만 포함

## 4. 데이터베이스 구조

### 4.1 테이블 관계
```
developer (1) -----> (N) skills
projects (N) -----> (N) likes
skills (N) -----> (N) likes
guestbook (N) -----> (N) likes (일반적인 좋아요)
recommendations (독립 테이블)
```

### 4.2 주요 필드
- 모든 테이블에 `id` (UUID), `created_at`, `updated_at` 필드 포함
- PostgreSQL 배열 타입 사용 (`tech`, `features`, `challenges`, `solutions`)
- RLS (Row Level Security) 정책으로 보안 설정

## 5. 문제 해결

### 5.1 환경 변수 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- Supabase URL과 anon key가 올바른지 확인
- 개발 서버 재시작

### 5.2 데이터베이스 연결 오류
- Supabase 프로젝트가 활성화되어 있는지 확인
- 네트워크 연결 상태 확인
- Supabase 대시보드에서 프로젝트 상태 확인

### 5.3 API 응답 오류
- 브라우저 개발자 도구의 Network 탭에서 요청/응답 확인
- 서버 콘솔에서 에러 로그 확인
- Supabase 로그에서 데이터베이스 쿼리 확인

## 6. 추가 기능

### 6.1 실시간 구독
Supabase의 실시간 기능을 활용하여 방명록이나 좋아요 변경사항을 실시간으로 반영할 수 있습니다.

### 6.2 인증 시스템
필요시 Supabase Auth를 활용하여 사용자 인증 시스템을 구축할 수 있습니다.

### 6.3 파일 저장
Supabase Storage를 활용하여 프로젝트 이미지나 파일을 저장할 수 있습니다.

## 7. 배포 시 주의사항

### 7.1 환경 변수 설정
배포 플랫폼(Vercel, Netlify 등)에서 환경 변수를 설정해야 합니다.

### 7.2 데이터베이스 백업
정기적으로 데이터베이스를 백업하는 것을 권장합니다.

### 7.3 성능 최적화
인덱스와 쿼리 최적화를 통해 성능을 향상시킬 수 있습니다.
