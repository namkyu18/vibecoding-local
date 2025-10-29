"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 프로젝트 데이터
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  
  // 기술 스택 데이터
  const [skills, setSkills] = useState<any[]>([]);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  
  // 개발자 정보
  const [developerInfo, setDeveloperInfo] = useState<any>(null);
  const [isLoadingDeveloper, setIsLoadingDeveloper] = useState(true);
  
  // API 테스트 관련 state
  const [activeTab, setActiveTab] = useState<'guestbook' | 'likes' | 'recommendation'>('guestbook');
  const [guestbookEntries, setGuestbookEntries] = useState<any[]>([]);
  const [guestbookForm, setGuestbookForm] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 좋아요 관련 state
  const [likesData, setLikesData] = useState<any[]>([]);
  const [isLiking, setIsLiking] = useState<string | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  
  // 추천 관련 state
  const [currentRecommendation, setCurrentRecommendation] = useState<any>(null);
  const [recommendationsByCategory, setRecommendationsByCategory] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 기존 하드코딩된 프로젝트 데이터 (로딩 중일 때 사용)
  const placeholderProjects = [
    {
      title: "E-커머스 웹사이트",
      description: "React와 Next.js를 사용하여 만든 반응형 온라인 쇼핑몰",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      status: "완료",
      image: "/placeholder-ecommerce.svg",
      githubUrl: "https://github.com/vibecoding/ecommerce-website",
      demoUrl: "https://vibecoding-ecommerce.vercel.app",
      detailedDescription: "사용자 친화적인 인터페이스와 안전한 결제 시스템을 갖춘 현대적인 온라인 쇼핑몰입니다. 관리자 대시보드와 재고 관리 기능을 포함합니다.",
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
      ]
    },
    {
      title: "포트폴리오 웹사이트",
      description: "개발자 포트폴리오를 위한 모던한 웹사이트",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      status: "진행중",
      image: "/placeholder-portfolio.svg",
      githubUrl: "https://github.com/vibecoding/portfolio",
      demoUrl: "https://vibecoding.vercel.app",
      detailedDescription: "개발자의 기술 스택과 프로젝트를 효과적으로 보여주는 개인 포트폴리오 웹사이트입니다. 다크모드 지원과 반응형 디자인을 적용했습니다.",
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
      ]
    },
    {
      title: "실시간 채팅 앱",
      description: "Socket.io를 활용한 실시간 채팅 애플리케이션",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      status: "완료",
      image: "/placeholder-chat.svg",
      githubUrl: "https://github.com/vibecoding/realtime-chat",
      demoUrl: "https://vibecoding-chat.herokuapp.com",
      detailedDescription: "실시간 메시징과 그룹 채팅 기능을 제공하는 웹 애플리케이션입니다. 사용자 친화적인 UI와 안정적인 실시간 통신을 구현했습니다.",
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
      ]
    }
  ];

  // 프로젝트 데이터 가져오기
  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true);
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      if (data.success) {
        // DB 스키마 필드명을 컴포넌트에서 사용하는 필드명으로 변환
        const transformedProjects = data.data.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          detailedDescription: project.detailed_description,
          tech: project.tech,
          status: project.status,
          image: project.image,
          githubUrl: project.github_url,
          demoUrl: project.demo_url,
          features: project.features,
          duration: project.duration,
          teamSize: project.team_size,
          challenges: project.challenges,
          solutions: project.solutions,
          createdAt: project.created_at,
          updatedAt: project.updated_at
        }));
        setProjects(transformedProjects);
      }
    } catch (error) {
      console.error('프로젝트 조회 실패:', error);
      // 에러 발생 시 빈 배열 또는 기본값 사용
      setProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  // 기술 스택 데이터 가져오기
  const fetchSkills = async () => {
    try {
      setIsLoadingSkills(true);
      const response = await fetch('/api/skills');
      const data = await response.json();
      if (data.success && data.data.skills) {
        setSkills(data.data.skills);
      }
    } catch (error) {
      console.error('기술 스택 조회 실패:', error);
      setSkills([]);
    } finally {
      setIsLoadingSkills(false);
    }
  };

  // 개발자 정보 가져오기
  const fetchDeveloper = async () => {
    try {
      setIsLoadingDeveloper(true);
      const response = await fetch('/api/developer?includeSkills=false');
      const data = await response.json();
      if (data.success) {
        setDeveloperInfo(data.data);
      }
    } catch (error) {
      console.error('개발자 정보 조회 실패:', error);
    } finally {
      setIsLoadingDeveloper(false);
    }
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // 방명록 관련 함수들
  const fetchGuestbookEntries = async () => {
    try {
      const response = await fetch('/api/guestbook');
      const data = await response.json();
      if (data.success) {
        setGuestbookEntries(data.data);
      }
    } catch (error) {
      console.error('방명록 조회 실패:', error);
    }
  };

  const handleGuestbookSubmit = async () => {
    if (!guestbookForm.name.trim() || !guestbookForm.message.trim()) {
      alert('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guestbookForm),
      });

      const data = await response.json();
      
      if (data.success) {
        setGuestbookForm({ name: '', message: '' });
        fetchGuestbookEntries(); // 목록 새로고침
        alert('방명록이 성공적으로 작성되었습니다!');
      } else {
        alert(data.message || '방명록 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('방명록 작성 실패:', error);
      alert('방명록 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestbookDelete = async (id: string) => {
    if (!confirm('정말로 이 방명록을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/guestbook?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        fetchGuestbookEntries(); // 목록 새로고침
        alert('방명록이 성공적으로 삭제되었습니다!');
      } else {
        alert(data.message || '방명록 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('방명록 삭제 실패:', error);
      alert('방명록 삭제 중 오류가 발생했습니다.');
    }
  };

  // 좋아요 관련 함수들
  const fetchLikesData = async () => {
    try {
      const response = await fetch('/api/likes');
      const data = await response.json();
      if (data.success) {
        setLikesData(data.data);
      }
    } catch (error) {
      console.error('좋아요 조회 실패:', error);
    }
  };

  const handleLikeClick = async (itemId: string, itemType: 'project' | 'skill' | 'general') => {
    setIsLiking(itemId);
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, itemType }),
      });

      const data = await response.json();
      
      if (data.success) {
        // 좋아요 상태 업데이트
        setLikedItems(prev => {
          const newSet = new Set(prev);
          if (data.isLiked) {
            newSet.add(itemId);
          } else {
            newSet.delete(itemId);
          }
          return newSet;
        });
        fetchLikesData(); // 목록 새로고침
      } else {
        alert(data.message || '좋아요 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLiking(null);
    }
  };

  const getLikeCount = (itemId: string): number => {
    // API 응답은 item_id 필드를 사용하므로 변환 필요
    const likeEntry = likesData.find((like: any) => 
      like.item_id === itemId || like.itemId === itemId
    );
    return likeEntry ? (likeEntry.count || 0) : 0;
  };

  const isLiked = (itemId: string): boolean => {
    return likedItems.has(itemId);
  };

  // 추천 관련 함수들
  const fetchRandomRecommendation = async () => {
    try {
      const response = await fetch('/api/recommendations?type=random');
      const data = await response.json();
      if (data.success) {
        setCurrentRecommendation(data.data);
      }
    } catch (error) {
      console.error('랜덤 추천 조회 실패:', error);
    }
  };

  const fetchRecommendationsByCategory = async (category: string) => {
    try {
      const response = await fetch(`/api/recommendations?category=${category}`);
      const data = await response.json();
      if (data.success) {
        setRecommendationsByCategory(data.data);
      }
    } catch (error) {
      console.error('카테고리별 추천 조회 실패:', error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setRecommendationsByCategory([]);
    } else {
      fetchRecommendationsByCategory(category);
    }
  };

  const getCategoryInfo = (category: string) => {
    const categoryMap = {
      'motivation': { name: '동기부여', icon: '💪', color: 'text-orange-500' },
      'tech': { name: '기술', icon: '⚙️', color: 'text-blue-500' },
      'life': { name: '인생', icon: '🌟', color: 'text-green-500' },
      'career': { name: '커리어', icon: '🚀', color: 'text-purple-500' }
    };
    return categoryMap[category as keyof typeof categoryMap] || { name: category, icon: '📝', color: 'text-gray-500' };
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchProjects();
    fetchSkills();
    fetchDeveloper();
    fetchGuestbookEntries();
    fetchLikesData();
  }, []);

  // 추천 탭이 활성화될 때 초기 데이터 로드
  useEffect(() => {
    if (activeTab === 'recommendation' && !currentRecommendation) {
      fetchRandomRecommendation();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl text-foreground">
              바이브 코딩
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">소개</a>
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">프로젝트</a>
              <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">스킬</a>
              <a href="#api-test" className="text-muted-foreground hover:text-foreground transition-colors">API 테스트</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">연락처</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                    VC
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                  <span className="text-white text-xs">💻</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              안녕하세요,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {developerInfo?.name || '바이브 코딩'}
              </span>
              입니다
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              {developerInfo?.description || '창의적이고 사용자 중심의 웹 애플리케이션을 만드는 프론트엔드 개발자입니다'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a href="#projects">프로젝트 보기</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <a href="#contact">연락하기</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">소개</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
                <Card>
              <CardHeader>
                <CardTitle className="text-2xl">개발자로서의 철학</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {developerInfo?.philosophy || '사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 목표로 합니다. 새로운 기술을 배우는 것에 열정적이며, 항상 더 나은 솔루션을 찾기 위해 노력합니다.'}
                </p>
                <Separator />
                <p className="text-muted-foreground">
                  {developerInfo?.experience || '팀워크를 중시하며, 함께 성장하는 개발 문화를 만들어가고 있습니다.'}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20 shadow-lg">
                      <AvatarImage 
                        src="/profile-avatar.svg"
                        alt="Developer profile"
                      />
                      <AvatarFallback className="text-4xl bg-muted">
                        👨‍💻
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{developerInfo?.name || '바이브 코딩'}</CardTitle>
                  <CardDescription className="text-base mb-4">{developerInfo?.title || '프론트엔드 개발자'}</CardDescription>
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <span>📍 {developerInfo?.location || '서울, 한국'}</span>
                    <span>🎓 {developerInfo?.education || '컴퓨터공학'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">기술 스택</h2>
          {isLoadingSkills ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">기술 스택을 불러오는 중...</p>
            </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">기술 스택 데이터가 없습니다.</p>
              </div>
            ) : (
              skills.map((skill) => {
                // 카테고리별 색상 매핑
                const categoryColors: Record<string, string> = {
                  frontend: 'bg-blue-50 dark:bg-blue-950',
                  backend: 'bg-green-50 dark:bg-green-950',
                  tools: 'bg-orange-50 dark:bg-orange-950',
                  design: 'bg-purple-50 dark:bg-purple-950'
                };
                const color = categoryColors[skill.category] || 'bg-gray-50 dark:bg-gray-950';
                
                return (
                  <Card key={skill.id || skill.name} className={`text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${color}`}>
                    <CardContent className="p-6">
                      <div className="text-4xl mb-3">{skill.icon}</div>
                      <CardTitle className="text-lg mb-2">{skill.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">프로젝트</h2>
          {isLoadingProjects ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">프로젝트를 불러오는 중...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">프로젝트 데이터가 없습니다.</p>
              </div>
            ) : (
              projects.map((project) => (
              <Card 
                key={project.id || project.title} 
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={project.status === '완료' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    상세 정보 보기
                  </Button>
                </CardContent>
              </Card>
            )))}
          </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-gray-600/10 via-blue-600/10 to-purple-600/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">연락처</h2>
          <p className="text-xl text-muted-foreground mb-12">
            프로젝트 협업이나 문의사항이 있으시면 언제든 연락해주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a href={developerInfo?.email ? `mailto:${developerInfo.email}` : 'mailto:contact@vibecoding.com'} className="flex items-center gap-3">
                <span>📧</span>
                이메일 보내기
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <a href={developerInfo?.github || 'https://github.com/vibecoding'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <span>🐙</span>
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <a href={developerInfo?.linkedin || 'https://linkedin.com/in/vibecoding'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <span>💼</span>
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* API Test Section */}
      <section id="api-test" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">API 테스트</h2>
          <div className="bg-background rounded-lg shadow-lg p-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 border-b">
              <button
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === 'guestbook'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => setActiveTab('guestbook')}
              >
                📝 방명록
              </button>
              <button
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === 'likes'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => setActiveTab('likes')}
              >
                ❤️ 좋아요
              </button>
              <button
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === 'recommendation'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => setActiveTab('recommendation')}
              >
                🎯 추천
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'guestbook' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">방명록</h3>
                <p className="text-muted-foreground">이름과 메시지를 남겨보세요!</p>
                
                {/* 방명록 작성 폼 */}
                <Card>
                  <CardHeader>
                    <CardTitle>방명록 작성</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">이름</label>
                      <input
                        type="text"
                        value={guestbookForm.name}
                        onChange={(e) => setGuestbookForm({...guestbookForm, name: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="이름을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">메시지</label>
                      <textarea
                        value={guestbookForm.message}
                        onChange={(e) => setGuestbookForm({...guestbookForm, message: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        placeholder="메시지를 입력하세요"
                      />
                    </div>
                    <Button 
                      onClick={handleGuestbookSubmit}
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? '작성 중...' : '방명록 작성'}
                    </Button>
                  </CardContent>
                </Card>

                {/* 방명록 목록 */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">방명록 목록</h4>
                  {guestbookEntries.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">아직 방명록이 없습니다.</p>
                  ) : (
                    <div className="space-y-3">
                      {guestbookEntries.map((entry) => (
                        <Card key={entry.id}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-foreground">{entry.name}</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {new Date(entry.createdAt).toLocaleDateString('ko-KR')}
                                </span>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleGuestbookDelete(entry.id)}
                                  className="text-xs px-2 py-1"
                                >
                                  삭제
                                </Button>
                              </div>
                            </div>
                            <p className="text-muted-foreground">{entry.message}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'likes' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">좋아요 투표</h3>
                <p className="text-muted-foreground">마음에 드는 기술이나 프로젝트에 좋아요를 눌러보세요!</p>
                
                {/* 바이브 코딩 기술 스택 좋아요 */}
                <Card>
                  <CardHeader>
                    <CardTitle>바이브 코딩의 기술 스택</CardTitle>
                    <CardDescription>어떤 기술이 가장 인상적이신가요?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'frontend-development', name: '프론트엔드 개발', icon: '🎨', description: 'React, Next.js 기반' },
                        { id: 'react-expertise', name: 'React 전문성', icon: '⚛️', description: '컴포넌트 기반 개발' },
                        { id: 'nextjs-mastery', name: 'Next.js 마스터리', icon: '▲', description: '풀스택 프레임워크' },
                        { id: 'typescript-skills', name: 'TypeScript 스킬', icon: '🔷', description: '타입 안전성' }
                      ].map((skill) => {
                        // API 응답의 item_id와 하드코딩된 id를 매칭
                        const likeEntry = likesData.find((like: any) => 
                          (like.item_id || like.itemId) === skill.id && 
                          (like.item_type || like.itemType) === 'skill'
                        );
                        const isItemLiked = likedItems.has(skill.id) || (likeEntry && likeEntry.count > 0);
                        
                        return (
                        <div key={skill.id} className="group flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{skill.icon}</span>
                            <div>
                              <span className="font-medium">{skill.name}</span>
                              <p className="text-xs text-muted-foreground">{skill.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {getLikeCount(skill.id)}개
                            </span>
                            <Button
                              size="sm"
                              variant={isItemLiked ? "default" : "outline"}
                              onClick={() => handleLikeClick(skill.id, 'skill')}
                              disabled={isLiking === skill.id}
                              className={`transition-all duration-200 hover:scale-110 ${
                                isItemLiked 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'text-red-500 hover:text-red-600 hover:bg-red-50'
                              }`}
                            >
                              {isLiking === skill.id ? '...' : (isItemLiked ? '❤️' : '🤍')}
                            </Button>
                          </div>
                        </div>
                      );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* 바이브 코딩 프로젝트 좋아요 */}
                <Card>
                  <CardHeader>
                    <CardTitle>바이브 코딩의 프로젝트</CardTitle>
                    <CardDescription>어떤 프로젝트가 가장 흥미로우신가요?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { id: 'ecommerce-project', name: 'E-커머스 웹사이트', icon: '🛒', description: 'React + Next.js 쇼핑몰' },
                        { id: 'portfolio-website', name: '포트폴리오 웹사이트', icon: '💼', description: '개인 브랜딩 사이트' },
                        { id: 'chat-application', name: '실시간 채팅 앱', icon: '💬', description: 'Socket.io 기반' },
                        { id: 'api-development', name: 'API 테스트 시스템', icon: '🔧', description: 'RESTful API 개발' }
                      ].map((project) => {
                        // API 응답의 item_id와 하드코딩된 id를 매칭
                        const likeEntry = likesData.find((like: any) => 
                          (like.item_id || like.itemId) === project.id && 
                          (like.item_type || like.itemType) === 'project'
                        );
                        const isItemLiked = likedItems.has(project.id) || (likeEntry && likeEntry.count > 0);
                        
                        return (
                        <div key={project.id} className="group flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{project.icon}</span>
                            <div>
                              <span className="font-medium">{project.name}</span>
                              <p className="text-xs text-muted-foreground">{project.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {getLikeCount(project.id)}개
                            </span>
                            <Button
                              size="sm"
                              variant={isItemLiked ? "default" : "outline"}
                              onClick={() => handleLikeClick(project.id, 'project')}
                              disabled={isLiking === project.id}
                              className={`transition-all duration-200 hover:scale-110 ${
                                isItemLiked 
                                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                                  : 'text-red-500 hover:text-red-600 hover:bg-red-50'
                              }`}
                            >
                              {isLiking === project.id ? '...' : (isItemLiked ? '❤️' : '🤍')}
                            </Button>
                          </div>
                        </div>
                      );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* 전체 좋아요 통계 */}
                <Card>
                  <CardHeader>
                    <CardTitle>좋아요 통계</CardTitle>
                    <CardDescription>현재까지의 좋아요 현황입니다</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {likesData.reduce((sum, like: any) => sum + (like.count || 0), 0)}
                        </div>
                        <div className="text-sm text-muted-foreground">총 좋아요</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {likesData.filter((like: any) => (like.item_type || like.itemType) === 'skill').length}
                        </div>
                        <div className="text-sm text-muted-foreground">기술 스택</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {likesData.filter((like: any) => (like.item_type || like.itemType) === 'project').length}
                        </div>
                        <div className="text-sm text-muted-foreground">프로젝트</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'recommendation' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">오늘의 추천</h3>
                <p className="text-muted-foreground">바이브 코딩이 전하는 개발자들을 위한 힘이 되는 메시지들입니다!</p>
                
                {/* 오늘의 랜덤 추천 */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      오늘의 한 줄 추천
                    </CardTitle>
                    <CardDescription>새로운 추천을 받아보세요!</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentRecommendation ? (
                      <div className="p-6 bg-background rounded-lg border-2 border-primary/20">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">💡</div>
                          <div className="flex-1">
                            <p className="text-lg font-medium text-foreground mb-2">
                              "{currentRecommendation.content}"
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {currentRecommendation.author && <><span>— {currentRecommendation.author}</span><span>•</span></>}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                getCategoryInfo(currentRecommendation.category).color
                              }`}>
                                {getCategoryInfo(currentRecommendation.category).icon} {getCategoryInfo(currentRecommendation.category).name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 bg-muted rounded-lg text-center">
                        <p className="text-muted-foreground">추천을 불러오는 중...</p>
                      </div>
                    )}
                    <Button 
                      onClick={fetchRandomRecommendation}
                      className="w-full"
                      variant="outline"
                    >
                      🔄 새로운 추천 받기
                    </Button>
                  </CardContent>
                </Card>

                {/* 카테고리별 추천 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      성공지식백과 - 바이브 코딩
                    </CardTitle>
                    <CardDescription>카테고리별로 정리된 개발자 지식과 조언들</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 카테고리 선택 */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleCategoryChange('all')}
                      >
                        전체
                      </Button>
                      {['motivation', 'tech', 'life', 'career'].map((category) => {
                        const info = getCategoryInfo(category);
                        return (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => handleCategoryChange(category)}
                            className="flex items-center gap-1"
                          >
                            <span>{info.icon}</span>
                            {info.name}
                          </Button>
                        );
                      })}
                    </div>

                    {/* 추천 목록 */}
                    {selectedCategory !== 'all' && (
                      <div className="space-y-3">
                        {recommendationsByCategory.length === 0 ? (
                          <div className="text-center py-8">
                            <div className="text-4xl mb-2">📖</div>
                            <p className="text-muted-foreground">추천을 불러오는 중...</p>
                          </div>
                        ) : (
                          recommendationsByCategory.map((rec) => (
                            <div key={rec.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="text-2xl">{getCategoryInfo(rec.category).icon}</div>
                                <div className="flex-1">
                                  <p className="text-foreground mb-2">{rec.content}</p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {rec.author && <><span>— {rec.author}</span><span>•</span></>}
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      getCategoryInfo(rec.category).color
                                    }`}>
                                      {getCategoryInfo(rec.category).name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}

                    {selectedCategory === 'all' && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-2">🎯</div>
                        <p className="text-muted-foreground">위에서 카테고리를 선택해보세요!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 통계 정보 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      추천 통계
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['motivation', 'tech', 'life', 'career'].map((category) => {
                        const info = getCategoryInfo(category);
                        return (
                          <div key={category} className="text-center p-4 bg-muted rounded-lg">
                            <div className="text-2xl mb-1">{info.icon}</div>
                            <div className="text-sm font-medium">{info.name}</div>
                            <div className="text-xs text-muted-foreground">카테고리</div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-muted border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">&copy; 2024 바이브 코딩. All rights reserved.</p>
        </div>
      </footer>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
