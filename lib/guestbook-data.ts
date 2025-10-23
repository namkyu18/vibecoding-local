import { GuestbookEntry } from './types';

// 방명록 데이터를 메모리에 저장 (실제 프로덕션에서는 데이터베이스 사용)
let guestbookEntries: GuestbookEntry[] = [
  {
    id: '1',
    name: '김개발',
    message: '안녕하세요! 포트폴리오 정말 멋지네요. React 프로젝트들 보면서 많이 배웠습니다.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: '박프론트',
    message: 'Next.js와 TypeScript를 활용한 프로젝트들이 인상적이에요. 저도 이런 기술 스택으로 개발해보고 싶습니다!',
    createdAt: '2024-01-16T14:20:00Z',
    updatedAt: '2024-01-16T14:20:00Z'
  },
  {
    id: '3',
    name: '이백엔드',
    message: '풀스택 개발자로서 정말 대단하시네요. 실시간 채팅 앱 프로젝트가 특히 흥미로웠습니다.',
    createdAt: '2024-01-17T09:15:00Z',
    updatedAt: '2024-01-17T09:15:00Z'
  }
];

export const getGuestbookEntries = (): GuestbookEntry[] => {
  return guestbookEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addGuestbookEntry = (name: string, message: string): GuestbookEntry => {
  const newEntry: GuestbookEntry = {
    id: Date.now().toString(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  guestbookEntries.unshift(newEntry);
  return newEntry;
};

export const deleteGuestbookEntry = (id: string): boolean => {
  const index = guestbookEntries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    guestbookEntries.splice(index, 1);
    return true;
  }
  return false;
};
