import { LikeEntry } from './types';

// 좋아요 데이터를 메모리에 저장 (실제 프로덕션에서는 데이터베이스 사용)
let likesData: LikeEntry[] = [
  {
    id: '1',
    itemId: 'frontend-development',
    itemType: 'skill',
    count: 24,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    itemId: 'react-expertise',
    itemType: 'skill',
    count: 18,
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    itemId: 'nextjs-mastery',
    itemType: 'skill',
    count: 15,
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    itemId: 'typescript-skills',
    itemType: 'skill',
    count: 12,
    createdAt: '2024-01-18T11:45:00Z',
    updatedAt: '2024-01-18T11:45:00Z'
  },
  {
    id: '5',
    itemId: 'ecommerce-project',
    itemType: 'project',
    count: 22,
    createdAt: '2024-01-19T16:30:00Z',
    updatedAt: '2024-01-19T16:30:00Z'
  },
  {
    id: '6',
    itemId: 'portfolio-website',
    itemType: 'project',
    count: 19,
    createdAt: '2024-01-20T10:15:00Z',
    updatedAt: '2024-01-20T10:15:00Z'
  },
  {
    id: '7',
    itemId: 'chat-application',
    itemType: 'project',
    count: 16,
    createdAt: '2024-01-21T14:30:00Z',
    updatedAt: '2024-01-21T14:30:00Z'
  },
  {
    id: '8',
    itemId: 'api-development',
    itemType: 'project',
    count: 14,
    createdAt: '2024-01-22T09:45:00Z',
    updatedAt: '2024-01-22T09:45:00Z'
  }
];

export const getLikesData = (): LikeEntry[] => {
  return [...likesData];
};

export const getLikeByItem = (itemId: string, itemType: 'project' | 'skill' | 'general'): LikeEntry | null => {
  return likesData.find(like => like.itemId === itemId && like.itemType === itemType) || null;
};

export const toggleLike = (itemId: string, itemType: 'project' | 'skill' | 'general'): { like: LikeEntry | null, isLiked: boolean } => {
  const existingLike = getLikeByItem(itemId, itemType);
  
  if (existingLike) {
    // 기존 좋아요가 있으면 토글 (좋아요 취소)
    const index = likesData.findIndex(like => like.itemId === itemId && like.itemType === itemType);
    if (index !== -1) {
      likesData.splice(index, 1);
    }
    return { like: null, isLiked: false };
  } else {
    // 새로운 좋아요 생성
    const newLike: LikeEntry = {
      id: Date.now().toString(),
      itemId,
      itemType,
      count: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    likesData.push(newLike);
    return { like: newLike, isLiked: true };
  }
};

// 기존 addLike 함수는 호환성을 위해 유지
export const addLike = (itemId: string, itemType: 'project' | 'skill' | 'general'): LikeEntry => {
  const result = toggleLike(itemId, itemType);
  return result.like || { id: '', itemId, itemType, count: 0, createdAt: '', updatedAt: '' };
};

export const removeLike = (itemId: string, itemType: 'project' | 'skill' | 'general'): boolean => {
  const index = likesData.findIndex(like => like.itemId === itemId && like.itemType === itemType);
  if (index !== -1) {
    likesData.splice(index, 1);
    return true;
  }
  return false;
};

export const getLikesByType = (itemType: 'project' | 'skill' | 'general'): LikeEntry[] => {
  return likesData.filter(like => like.itemType === itemType);
};
