# 바이브 코딩 API 문서

이 API는 개발자 정보와 포트폴리오를 조회할 수 있는 RESTful API입니다.

## 기본 정보

- **Base URL**: `http://localhost:3000/api`
- **Content-Type**: `application/json`
- **CORS**: 모든 도메인에서 접근 가능

## API 엔드포인트

### 1. 개발자 정보 조회

**GET** `/api/developer`

개발자의 기본 정보와 기술 스택을 조회합니다.

#### 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `includeSkills` | boolean | 선택 | 스킬 정보 포함 여부 (기본값: true) |
| `skillCategory` | string | 선택 | 스킬 카테고리 필터 (frontend, backend, tools, design) |

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "id": "vibecoding",
    "name": "바이브 코딩",
    "title": "프론트엔드 개발자",
    "description": "창의적이고 사용자 중심의 웹 애플리케이션을 만드는 프론트엔드 개발자입니다",
    "location": "서울, 한국",
    "education": "컴퓨터공학",
    "email": "contact@vibecoding.com",
    "github": "https://github.com/vibecoding",
    "linkedin": "https://linkedin.com/in/vibecoding",
    "philosophy": "사용자 경험을 최우선으로 생각하며...",
    "experience": "3년 이상의 웹 개발 경험을 가지고 있으며...",
    "skills": [
      {
        "name": "React",
        "icon": "⚛️",
        "level": "고급",
        "category": "frontend"
      }
    ]
  },
  "message": "개발자 정보를 성공적으로 조회했습니다."
}
```

### 2. 포트폴리오 목록 조회

**GET** `/api/portfolio`

프로젝트 목록을 조회합니다.

#### 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `status` | string | 선택 | 프로젝트 상태 (완료, 진행중, 계획중) |
| `tech` | string | 선택 | 기술 스택 필터 (쉼표로 구분) |
| `limit` | number | 선택 | 결과 개수 제한 |
| `sortBy` | string | 선택 | 정렬 기준 (createdAt, updatedAt, title) |
| `order` | string | 선택 | 정렬 순서 (asc, desc) |

#### 응답 예시

```json
{
  "success": true,
  "data": [
    {
      "id": "ecommerce-website",
      "title": "E-커머스 웹사이트",
      "description": "React와 Next.js를 사용하여 만든 반응형 온라인 쇼핑몰",
      "tech": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      "status": "완료",
      "githubUrl": "https://github.com/vibecoding/ecommerce-website",
      "demoUrl": "https://vibecoding-ecommerce.vercel.app"
    }
  ],
  "total": 3,
  "message": "포트폴리오를 성공적으로 조회했습니다."
}
```

### 3. 특정 프로젝트 조회

**GET** `/api/portfolio/[id]`

특정 프로젝트의 상세 정보를 조회합니다.

#### 경로 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `id` | string | 필수 | 프로젝트 ID |

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "id": "ecommerce-website",
    "title": "E-커머스 웹사이트",
    "description": "React와 Next.js를 사용하여 만든 반응형 온라인 쇼핑몰",
    "detailedDescription": "사용자 친화적인 인터페이스와 안전한 결제 시스템을 갖춘 현대적인 온라인 쇼핑몰입니다...",
    "tech": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "status": "완료",
    "features": ["반응형 웹 디자인", "사용자 인증 및 권한 관리", ...],
    "duration": "3개월",
    "teamSize": "3명 (프론트엔드 2명, 백엔드 1명)",
    "challenges": ["대용량 상품 데이터 처리", ...],
    "solutions": ["React Query를 활용한 효율적인 데이터 캐싱", ...]
  },
  "message": "프로젝트 정보를 성공적으로 조회했습니다."
}
```

### 4. 기술 스택 조회

**GET** `/api/skills`

개발자의 기술 스택을 조회합니다.

#### 쿼리 파라미터

| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| `category` | string | 선택 | 기술 카테고리 (frontend, backend, tools, design) |
| `level` | string | 선택 | 숙련도 (초급, 중급, 고급) |

#### 응답 예시

```json
{
  "success": true,
  "data": {
    "skills": [
      {
        "name": "React",
        "icon": "⚛️",
        "level": "고급",
        "category": "frontend"
      }
    ],
    "groupedSkills": {
      "frontend": [...],
      "backend": [...]
    },
    "total": 8
  },
  "message": "기술 스택을 성공적으로 조회했습니다."
}
```

## 사용 예시

### cURL 명령어

```bash
# 개발자 정보 조회
curl -X GET "http://localhost:3000/api/developer"

# 프론트엔드 기술만 조회
curl -X GET "http://localhost:3000/api/developer?skillCategory=frontend"

# 완료된 프로젝트만 조회
curl -X GET "http://localhost:3000/api/portfolio?status=완료"

# React를 사용한 프로젝트 조회
curl -X GET "http://localhost:3000/api/portfolio?tech=React"

# 특정 프로젝트 상세 조회
curl -X GET "http://localhost:3000/api/portfolio/ecommerce-website"

# 프론트엔드 기술 스택 조회
curl -X GET "http://localhost:3000/api/skills?category=frontend"
```

### JavaScript/Fetch 예시

```javascript
// 개발자 정보 조회
const response = await fetch('http://localhost:3000/api/developer');
const data = await response.json();
console.log(data);

// 포트폴리오 조회 (완료된 프로젝트만)
const portfolioResponse = await fetch('http://localhost:3000/api/portfolio?status=완료');
const portfolioData = await portfolioResponse.json();
console.log(portfolioData);

// 특정 프로젝트 조회
const projectResponse = await fetch('http://localhost:3000/api/portfolio/ecommerce-website');
const projectData = await projectResponse.json();
console.log(projectData);
```

## 에러 응답

모든 API는 일관된 에러 응답 형식을 사용합니다:

```json
{
  "success": false,
  "error": "에러 메시지",
  "message": "사용자 친화적 메시지"
}
```

### HTTP 상태 코드

- `200`: 성공
- `404`: 리소스를 찾을 수 없음
- `500`: 서버 내부 오류

## 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

서버가 실행되면 `http://localhost:3000`에서 API에 접근할 수 있습니다.
