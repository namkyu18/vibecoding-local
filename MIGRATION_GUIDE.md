# 기존 더미 DB를 Supabase로 마이그레이션 가이드

이 가이드는 기존 백엔드에 만들어놨던 더미 DB 데이터들을 Supabase 데이터베이스로 옮기는 방법을 설명합니다.

## 방법 1: 마이그레이션 스크립트 사용 (권장)

자동화된 TypeScript 스크립트를 사용하여 모든 데이터를 Supabase로 마이그레이션합니다.

### 1단계: 필요한 패키지 설치

```bash
npm install
```

`tsx` 패키지가 자동으로 설치됩니다 (이미 package.json에 추가되어 있습니다).

### 2단계: 환경 변수 설정

`.env.local` 파일에 Supabase 연결 정보를 설정합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3단계: 마이그레이션 실행

```bash
npm run migrate
```

스크립트가 자동으로 다음 작업을 수행합니다:
- 개발자 정보 마이그레이션
- 기술 스택 마이그레이션 (8개)
- 프로젝트 마이그레이션 (3개)
- 방명록 마이그레이션 (3개)
- 좋아요 마이그레이션 (8개)
- 추천 문구 마이그레이션 (15개)

### 4단계: 마이그레이션 확인

스크립트 실행 후 콘솔에서 마이그레이션 결과를 확인할 수 있습니다:
- ✅ 성공적으로 추가된 항목
- ⚠️  이미 존재하는 항목 (업데이트 또는 스킵)
- ❌ 오류가 발생한 항목

## 방법 2: SQL 스크립트 직접 실행

SQL 파일을 직접 실행하여 데이터를 삽입합니다.

### 1단계: Supabase SQL Editor 열기

1. Supabase 대시보드 접속
2. 왼쪽 메뉴에서 "SQL Editor" 클릭
3. "New query" 클릭

### 2단계: 스키마 생성 (이미 실행했다면 스킵)

`database/schema.sql` 파일의 내용을 복사하여 실행합니다.
이 스크립트는 모든 테이블과 정책을 생성합니다.

### 3단계: 데이터 삽입

`database/seed.sql` 파일의 내용을 복사하여 실행합니다.
이 스크립트는 모든 초기 데이터를 삽입합니다.

## 마이그레이션되는 데이터

### 개발자 정보
- **1개 항목**: 바이브 코딩 개발자 프로필

### 기술 스택
- **8개 항목**:
  - React (고급, frontend)
  - Next.js (고급, frontend)
  - TypeScript (중급, frontend)
  - Tailwind CSS (고급, frontend)
  - JavaScript (고급, frontend)
  - Node.js (중급, backend)
  - Git (중급, tools)
  - Figma (초급, design)

### 프로젝트
- **3개 항목**:
  - E-커머스 웹사이트
  - 포트폴리오 웹사이트
  - 실시간 채팅 앱

### 방명록
- **3개 항목**: 김개발, 박프론트, 이백엔드의 메시지

### 좋아요
- **8개 항목**: 다양한 프로젝트와 스킬에 대한 좋아요 데이터

### 추천 문구
- **15개 항목**: 동기부여, 기술, 생활, 커리어 카테고리별 추천 문구

## 문제 해결

### 문제: 환경 변수를 찾을 수 없음

**해결책**:
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수 이름이 정확한지 확인 (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Supabase 대시보드에서 URL과 키를 다시 확인

### 문제: 중복 데이터 에러

**해결책**:
- 마이그레이션 스크립트는 중복 데이터를 자동으로 처리합니다
- 이미 존재하는 데이터는 업데이트하거나 스킵합니다
- SQL 스크립트를 사용하는 경우, 기존 데이터를 먼저 삭제할 수 있습니다:

```sql
DELETE FROM recommendations;
DELETE FROM likes;
DELETE FROM guestbook;
DELETE FROM projects;
DELETE FROM skills;
DELETE FROM developer;
```

### 문제: 날짜 형식 오류

**해결책**:
- 마이그레이션 스크립트는 자동으로 날짜 형식을 변환합니다
- SQL 스크립트의 날짜는 ISO 형식으로 되어 있습니다

### 문제: 배열 타입 오류

**해결책**:
- PostgreSQL 배열 타입을 사용하므로 `ARRAY['value1', 'value2']` 형식이 올바릅니다
- Supabase에서는 자동으로 배열 타입을 처리합니다

## 마이그레이션 후 확인

모든 마이그레이션이 완료되면 다음을 확인하세요:

1. **Supabase Table Editor**에서 데이터 확인
   - 각 테이블에 데이터가 올바르게 삽입되었는지 확인
   - 행 개수가 예상과 일치하는지 확인

2. **API 엔드포인트 테스트**
   ```bash
   npm run dev
   ```
   - `http://localhost:3000/api/portfolio` 접속
   - `http://localhost:3000/api/skills` 접속
   - `http://localhost:3000/api/guestbook` 접속
   - 등등...

3. **데이터 일관성 확인**
   - 프로젝트 ID가 올바른지 확인
   - 좋아요와 프로젝트/스킬이 올바르게 연결되었는지 확인

## 추가 정보

- 마이그레이션 스크립트: `scripts/migrate-to-supabase.ts`
- 데이터베이스 스키마: `database/schema.sql`
- 초기 데이터: `database/seed.sql`

마이그레이션 후에는 기존 더미 데이터 파일들(`lib/data.ts`, `lib/guestbook-data.ts` 등)은 백업으로 보관하거나 삭제할 수 있습니다. 모든 데이터는 이제 Supabase에서 관리됩니다.
