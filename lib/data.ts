// 개발자 정보 및 포트폴리오 데이터
export interface Developer {
  id: string;
  name: string;
  title: string;
  description: string;
  location: string;
  education: string;
  email: string;
  github: string;
  linkedin: string;
  skills: Skill[];
  philosophy: string;
  experience: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: '초급' | '중급' | '고급';
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  tech: string[];
  status: '완료' | '진행중' | '계획중';
  image: string;
  githubUrl: string;
  demoUrl: string;
  features: string[];
  duration: string;
  teamSize: string;
  challenges: string[];
  solutions: string[];
  createdAt: string;
  updatedAt: string;
}

export const developerData: Developer = {
  id: "vibecoding",
  name: "바이브 코딩",
  title: "프론트엔드 개발자",
  description: "창의적이고 사용자 중심의 웹 애플리케이션을 만드는 프론트엔드 개발자입니다",
  location: "서울, 한국",
  education: "퓨터공학",
  email: "contact@vibecoding.com",
  github: "https://github.com/vibecoding",
  linkedin: "https://linkedin.com/in/vibecoding",
  philosophy: "사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 목표로 합니다. 새로운 기술을 배우는 것에 열정적이며, 항상 더 나은 솔루션을 찾기 위해 노력합니다.",
  experience: "3년 이상의 웹 개발 경험을 가지고 있으며, React, Next.js, TypeScript를 활용한 현대적인 웹 애플리케이션 개발에 전문성을 가지고 있습니다.",
  skills: [
    { name: "React", icon: "⚛️", level: "고급", category: "frontend" },
    { name: "Next.js", icon: "▲", level: "고급", category: "frontend" },
    { name: "TypeScript", icon: "🔷", level: "중급", category: "frontend" },
    { name: "Tailwind CSS", icon: "🎨", level: "고급", category: "frontend" },
    { name: "JavaScript", icon: "🟨", level: "고급", category: "frontend" },
    { name: "Node.js", icon: "🟢", level: "중급", category: "backend" },
    { name: "Git", icon: "📝", level: "중급", category: "tools" },
    { name: "Figma", icon: "🎭", level: "초급", category: "design" }
  ]
};

export const projectsData: Project[] = [
  {
    id: "ecommerce-website",
    title: "E-커머스 웹사이트",
    description: "React와 Next.js를 사용하여 만든 반응형 온라인 쇼핑몰",
    detailedDescription: "사용자 친화적인 인터페이스와 안전한 결제 시스템을 갖춘 현대적인 온라인 쇼핑몰입니다. 관리자 대시보드와 재고 관리 기능을 포함합니다.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    status: "완료",
    image: "/placeholder-ecommerce.svg",
    githubUrl: "https://github.com/vibecoding/ecommerce-website",
    demoUrl: "https://vibecoding-ecommerce.vercel.app",
    features: [
      "반응형 웹 디자인",
      "사용자 인증 및 권한 관리",
      "장바구니 및 주문 관리",
      "결제 시스템 연동",
      "관리자 대시보드",
      "상품 검색 및 필터링"
    ],
    duration: "3개월",
    teamSize: "3명 (프론트엔드 2명, 백엔드 1명)",
    challenges: [
      "대용량 상품 데이터 처리",
      "실시간 재고 관리",
      "다양한 결제 수단 지원"
    ],
    solutions: [
      "React Query를 활용한 효율적인 데이터 캐싱",
      "WebSocket을 통한 실시간 재고 업데이트",
      "Stripe API를 통한 안전한 결제 처리"
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-04-15"
  },
  {
    id: "portfolio-website",
    title: "포트폴리오 웹사이트",
    description: "개발자 포트폴리오를 위한 모던한 웹사이트",
    detailedDescription: "개발자의 기술 스택과 프로젝트를 효과적으로 보여주는 개인 포트폴리오 웹사이트입니다. 다크모드 지원과 반응형 디자인을 적용했습니다.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "진행중",
    image: "/placeholder-portfolio.svg",
    githubUrl: "https://github.com/vibecoding/portfolio",
    demoUrl: "https://vibecoding.vercel.app",
    features: [
      "다크모드 지원",
      "반응형 디자인",
      "프로젝트 상세 모달",
      "연락처 폼",
      "SEO 최적화",
      "애니메이션 효과"
    ],
    duration: "1개월",
    teamSize: "1명 (개인 프로젝트)",
    challenges: [
      "다크모드 구현",
      "모바일 최적화",
      "SEO 성능 향상"
    ],
    solutions: [
      "CSS 변수를 활용한 테마 시스템",
      "Tailwind CSS의 반응형 클래스 활용",
      "Next.js의 메타데이터 API 활용"
    ],
    createdAt: "2024-05-01",
    updatedAt: "2024-05-15"
  },
  {
    id: "realtime-chat",
    title: "실시간 채팅 앱",
    description: "Socket.io를 활용한 실시간 채팅 애플리케이션",
    detailedDescription: "실시간 메시징과 그룹 채팅 기능을 제공하는 웹 애플리케이션입니다. 사용자 친화적인 UI와 안정적인 실시간 통신을 구현했습니다.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    status: "완료",
    image: "/placeholder-chat.svg",
    githubUrl: "https://github.com/vibecoding/realtime-chat",
    demoUrl: "https://vibecoding-chat.herokuapp.com",
    features: [
      "실시간 메시징",
      "그룹 채팅방 생성",
      "파일 및 이미지 공유",
      "온라인 상태 표시",
      "메시지 히스토리",
      "푸시 알림"
    ],
    duration: "2개월",
    teamSize: "2명 (풀스택 개발자)",
    challenges: [
      "실시간 데이터 동기화",
      "대용량 메시지 처리",
      "모바일 푸시 알림"
    ],
    solutions: [
      "Socket.io를 통한 효율적인 실시간 통신",
      "MongoDB 인덱싱을 통한 성능 최적화",
      "Firebase Cloud Messaging 활용"
    ],
    createdAt: "2023-11-01",
    updatedAt: "2024-01-01"
  }
];
