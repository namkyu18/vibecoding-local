import { Recommendation } from './types';

// 추천 문구 데이터를 메모리에 저장 (실제 프로덕션에서는 데이터베이스 사용)
let recommendationsData: Recommendation[] = [
  {
    id: '1',
    content: '코딩은 마치 레고 블록을 조립하는 것과 같습니다. 작은 조각들을 하나씩 연결해가며 멋진 작품을 만들어보세요!',
    author: '바이브 코딩',
    category: 'motivation',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    content: '오늘의 한 줄: "에러는 실패가 아니라 배움의 기회입니다. 에러 메시지를 친구처럼 대하세요!"',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    content: '개발자로서 가장 중요한 것은 완벽한 코드가 아니라 지속적인 학습과 성장하는 마음입니다.',
    author: '바이브 코딩',
    category: 'career',
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    content: '코딩을 처음 시작할 때는 "Hello World"부터 시작하세요. 모든 위대한 개발자들이 거쳐온 길입니다.',
    author: '바이브 코딩',
    category: 'motivation',
    createdAt: '2024-01-18T11:45:00Z'
  },
  {
    id: '5',
    content: 'React의 핵심은 컴포넌트입니다. 작은 컴포넌트들을 조합해서 큰 애플리케이션을 만들어보세요!',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-19T16:30:00Z'
  },
  {
    id: '6',
    content: 'TypeScript는 JavaScript에 안전장치를 더한 것입니다. 타입 안전성으로 더 안정적인 코드를 작성하세요.',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-20T10:15:00Z'
  },
  {
    id: '7',
    content: 'Next.js는 React의 슈퍼파워입니다. SSR, 라우팅, 최적화까지 모든 것을 한 번에!',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-21T14:30:00Z'
  },
  {
    id: '8',
    content: '개발자 커뮤니티에 참여하세요. GitHub, Stack Overflow, 개발자 모임에서 많은 것을 배울 수 있습니다.',
    author: '바이브 코딩',
    category: 'career',
    createdAt: '2024-01-22T09:45:00Z'
  },
  {
    id: '9',
    content: '매일 조금씩이라도 코딩하세요. 1시간씩 30일이면 30시간, 1년이면 365시간의 경험이 쌓입니다!',
    author: '바이브 코딩',
    category: 'life',
    createdAt: '2024-01-23T13:20:00Z'
  },
  {
    id: '10',
    content: '포트폴리오는 개발자의 이력서입니다. 자신만의 프로젝트로 실력을 증명해보세요!',
    author: '바이브 코딩',
    category: 'career',
    createdAt: '2024-01-24T16:10:00Z'
  },
  {
    id: '11',
    content: 'Git은 개발자의 시간여행 도구입니다. 버전 관리로 안전하게 코드를 관리하세요.',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-25T11:30:00Z'
  },
  {
    id: '12',
    content: 'API는 서로 다른 프로그램들이 대화하는 방법입니다. RESTful API로 세상을 연결해보세요!',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-26T15:45:00Z'
  },
  {
    id: '13',
    content: '코딩은 문제 해결의 예술입니다. 복잡한 문제를 작은 단위로 나누어 하나씩 해결해보세요.',
    author: '바이브 코딩',
    category: 'motivation',
    createdAt: '2024-01-27T09:15:00Z'
  },
  {
    id: '14',
    content: '개발자로서 성장하려면 코드 리뷰를 적극적으로 받아보세요. 다른 사람의 관점에서 코드를 바라보는 것이 중요합니다.',
    author: '바이브 코딩',
    category: 'career',
    createdAt: '2024-01-28T14:20:00Z'
  },
  {
    id: '15',
    content: 'Tailwind CSS는 유틸리티 퍼스트 CSS 프레임워크입니다. 빠르고 일관된 디자인을 만들어보세요!',
    author: '바이브 코딩',
    category: 'tech',
    createdAt: '2024-01-29T12:00:00Z'
  }
];

export const getRecommendations = (): Recommendation[] => {
  return [...recommendationsData];
};

export const getRandomRecommendation = (): Recommendation => {
  const randomIndex = Math.floor(Math.random() * recommendationsData.length);
  return recommendationsData[randomIndex];
};

export const getRecommendationsByCategory = (category: 'motivation' | 'tech' | 'life' | 'career'): Recommendation[] => {
  return recommendationsData.filter(rec => rec.category === category);
};

export const getRecommendationById = (id: string): Recommendation | null => {
  return recommendationsData.find(rec => rec.id === id) || null;
};
