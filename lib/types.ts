// 방명록 관련 타입 정의
export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// 좋아요 관련 타입 정의
export interface LikeEntry {
  id: string;
  itemId: string;
  itemType: 'project' | 'skill' | 'general';
  count: number;
  createdAt: string;
  updatedAt: string;
}

// 랜덤 추천 관련 타입 정의
export interface Recommendation {
  id: string;
  content: string;
  author?: string;
  category: 'motivation' | 'tech' | 'life' | 'career';
  createdAt: string;
}
