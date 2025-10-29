-- 초기 데이터 삽입
-- 기존 데이터를 Supabase로 마이그레이션

-- 1. 개발자 정보 삽입
INSERT INTO developer (id, name, title, description, location, education, email, github, linkedin, philosophy, experience) VALUES
('vibecoding', '바이브 코딩', '프론트엔드 개발자', '창의적이고 사용자 중심의 웹 애플리케이션을 만드는 프론트엔드 개발자입니다', '서울, 한국', '컴퓨터공학', 'contact@vibecoding.com', 'https://github.com/vibecoding', 'https://linkedin.com/in/vibecoding', '사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 목표로 합니다. 새로운 기술을 배우는 것에 열정적이며, 항상 더 나은 솔루션을 찾기 위해 노력합니다.', '3년 이상의 웹 개발 경험을 가지고 있으며, React, Next.js, TypeScript를 활용한 현대적인 웹 애플리케이션 개발에 전문성을 가지고 있습니다.');

-- 2. 기술 스택 삽입
INSERT INTO skills (name, icon, level, category) VALUES
('React', '⚛️', '고급', 'frontend'),
('Next.js', '▲', '고급', 'frontend'),
('TypeScript', '🔷', '중급', 'frontend'),
('Tailwind CSS', '🎨', '고급', 'frontend'),
('JavaScript', '🟨', '고급', 'frontend'),
('Node.js', '🟢', '중급', 'backend'),
('Git', '📝', '중급', 'tools'),
('Figma', '🎭', '초급', 'design');

-- 3. 프로젝트 삽입 (날짜는 ISO 형식으로 변환)
INSERT INTO projects (id, title, description, detailed_description, tech, status, image, github_url, demo_url, features, duration, team_size, challenges, solutions, created_at, updated_at) VALUES
('ecommerce-website', 'E-커머스 웹사이트', 'React와 Next.js를 사용하여 만든 반응형 온라인 쇼핑몰', '사용자 친화적인 인터페이스와 안전한 결제 시스템을 갖춘 현대적인 온라인 쇼핑몰입니다. 관리자 대시보드와 재고 관리 기능을 포함합니다.', ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], '완료', '/placeholder-ecommerce.svg', 'https://github.com/vibecoding/ecommerce-website', 'https://vibecoding-ecommerce.vercel.app', ARRAY['반응형 웹 디자인', '사용자 인증 및 권한 관리', '장바구니 및 주문 관리', '결제 시스템 연동', '관리자 대시보드', '상품 검색 및 필터링'], '3개월', '3명 (프론트엔드 2명, 백엔드 1명)', ARRAY['대용량 상품 데이터 처리', '실시간 재고 관리', '다양한 결제 수단 지원'], ARRAY['React Query를 활용한 효율적인 데이터 캐싱', 'WebSocket을 통한 실시간 재고 업데이트', 'Stripe API를 통한 안전한 결제 처리'], '2024-01-15T00:00:00Z', '2024-04-15T00:00:00Z'),

('portfolio-website', '포트폴리오 웹사이트', '개발자 포트폴리오를 위한 모던한 웹사이트', '개발자의 기술 스택과 프로젝트를 효과적으로 보여주는 개인 포트폴리오 웹사이트입니다. 다크모드 지원과 반응형 디자인을 적용했습니다.', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'], '진행중', '/placeholder-portfolio.svg', 'https://github.com/vibecoding/portfolio', 'https://vibecoding.vercel.app', ARRAY['다크모드 지원', '반응형 디자인', '프로젝트 상세 모달', '연락처 폼', 'SEO 최적화', '애니메이션 효과'], '1개월', '1명 (개인 프로젝트)', ARRAY['다크모드 구현', '모바일 최적화', 'SEO 성능 향상'], ARRAY['CSS 변수를 활용한 테마 시스템', 'Tailwind CSS의 반응형 클래스 활용', 'Next.js의 메타데이터 API 활용'], '2024-05-01T00:00:00Z', '2024-05-15T00:00:00Z'),

('realtime-chat', '실시간 채팅 앱', 'Socket.io를 활용한 실시간 채팅 애플리케이션', '실시간 메시징과 그룹 채팅 기능을 제공하는 웹 애플리케이션입니다. 사용자 친화적인 UI와 안정적인 실시간 통신을 구현했습니다.', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'], '완료', '/placeholder-chat.svg', 'https://github.com/vibecoding/realtime-chat', 'https://vibecoding-chat.herokuapp.com', ARRAY['실시간 메시징', '그룹 채팅방 생성', '파일 및 이미지 공유', '온라인 상태 표시', '메시지 히스토리', '푸시 알림'], '2개월', '2명 (풀스택 개발자)', ARRAY['실시간 데이터 동기화', '대용량 메시지 처리', '모바일 푸시 알림'], ARRAY['Socket.io를 통한 효율적인 실시간 통신', 'MongoDB 인덱싱을 통한 성능 최적화', 'Firebase Cloud Messaging 활용'], '2023-11-01T00:00:00Z', '2024-01-01T00:00:00Z');

-- 4. 방명록 삽입
INSERT INTO guestbook (name, message, created_at, updated_at) VALUES
('김개발', '안녕하세요! 포트폴리오 정말 멋지네요. React 프로젝트들 보면서 많이 배웠습니다.', '2024-01-15T10:30:00Z', '2024-01-15T10:30:00Z'),
('박프론트', 'Next.js와 TypeScript를 활용한 프로젝트들이 인상적이에요. 저도 이런 기술 스택으로 개발해보고 싶습니다!', '2024-01-16T14:20:00Z', '2024-01-16T14:20:00Z'),
('이백엔드', '풀스택 개발자로서 정말 대단하시네요. 실시간 채팅 앱 프로젝트가 특히 흥미로웠습니다.', '2024-01-17T09:15:00Z', '2024-01-17T09:15:00Z');

-- 5. 좋아요 삽입
INSERT INTO likes (item_id, item_type, count, created_at, updated_at) VALUES
('frontend-development', 'skill', 24, '2024-01-15T10:30:00Z', '2024-01-15T10:30:00Z'),
('react-expertise', 'skill', 18, '2024-01-16T14:20:00Z', '2024-01-16T14:20:00Z'),
('nextjs-mastery', 'skill', 15, '2024-01-17T09:15:00Z', '2024-01-17T09:15:00Z'),
('typescript-skills', 'skill', 12, '2024-01-18T11:45:00Z', '2024-01-18T11:45:00Z'),
('ecommerce-project', 'project', 22, '2024-01-19T16:30:00Z', '2024-01-19T16:30:00Z'),
('portfolio-website', 'project', 19, '2024-01-20T10:15:00Z', '2024-01-20T10:15:00Z'),
('chat-application', 'project', 16, '2024-01-21T14:30:00Z', '2024-01-21T14:30:00Z'),
('api-development', 'project', 14, '2024-01-22T09:45:00Z', '2024-01-22T09:45:00Z');

-- 6. 추천 문구 삽입
INSERT INTO recommendations (content, author, category, created_at) VALUES
('코딩은 마치 레고 블록을 조립하는 것과 같습니다. 작은 조각들을 하나씩 연결해가며 멋진 작품을 만들어보세요!', '바이브 코딩', 'motivation', '2024-01-15T10:30:00Z'),
('오늘의 한 줄: "에러는 실패가 아니라 배움의 기회입니다. 에러 메시지를 친구처럼 대하세요!"', '바이브 코딩', 'tech', '2024-01-16T14:20:00Z'),
('개발자로서 가장 중요한 것은 완벽한 코드가 아니라 지속적인 학습과 성장하는 마음입니다.', '바이브 코딩', 'career', '2024-01-17T09:15:00Z'),
('코딩을 처음 시작할 때는 "Hello World"부터 시작하세요. 모든 위대한 개발자들이 거쳐온 길입니다.', '바이브 코딩', 'motivation', '2024-01-18T11:45:00Z'),
('React의 핵심은 컴포넌트입니다. 작은 컴포넌트들을 조합해서 큰 애플리케이션을 만들어보세요!', '바이브 코딩', 'tech', '2024-01-19T16:30:00Z'),
('TypeScript는 JavaScript에 안전장치를 더한 것입니다. 타입 안전성으로 더 안정적인 코드를 작성하세요.', '바이브 코딩', 'tech', '2024-01-20T10:15:00Z'),
('Next.js는 React의 슈퍼파워입니다. SSR, 라우팅, 최적화까지 모든 것을 한 번에!', '바이브 코딩', 'tech', '2024-01-21T14:30:00Z'),
('개발자 커뮤니티에 참여하세요. GitHub, Stack Overflow, 개발자 모임에서 많은 것을 배울 수 있습니다.', '바이브 코딩', 'career', '2024-01-22T09:45:00Z'),
('매일 조금씩이라도 코딩하세요. 1시간씩 30일이면 30시간, 1년이면 365시간의 경험이 쌓입니다!', '바이브 코딩', 'life', '2024-01-23T13:20:00Z'),
('포트폴리오는 개발자의 이력서입니다. 자신만의 프로젝트로 실력을 증명해보세요!', '바이브 코딩', 'career', '2024-01-24T16:10:00Z'),
('Git은 개발자의 시간여행 도구입니다. 버전 관리로 안전하게 코드를 관리하세요.', '바이브 코딩', 'tech', '2024-01-25T11:30:00Z'),
('API는 서로 다른 프로그램들이 대화하는 방법입니다. RESTful API로 세상을 연결해보세요!', '바이브 코딩', 'tech', '2024-01-26T15:45:00Z'),
('코딩은 문제 해결의 예술입니다. 복잡한 문제를 작은 단위로 나누어 하나씩 해결해보세요.', '바이브 코딩', 'motivation', '2024-01-27T09:15:00Z'),
('개발자로서 성장하려면 코드 리뷰를 적극적으로 받아보세요. 다른 사람의 관점에서 코드를 바라보는 것이 중요합니다.', '바이브 코딩', 'career', '2024-01-28T14:20:00Z'),
('Tailwind CSS는 유틸리티 퍼스트 CSS 프레임워크입니다. 빠르고 일관된 디자인을 만들어보세요!', '바이브 코딩', 'tech', '2024-01-29T12:00:00Z');
