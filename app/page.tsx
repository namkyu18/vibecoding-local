"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ProjectModal from "@/components/ProjectModal";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "E-커머스 웹사이트",
      description: "React와 Next.js를 사용하여 만든 반응형 온라인 쇼핑몰",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      status: "완료",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">연락처</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Coding background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Developer profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-background flex items-center justify-center">
                  <span className="text-white text-xs">💻</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              안녕하세요,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                바이브 코딩
              </span>
              입니다
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              창의적이고 사용자 중심의 웹 애플리케이션을 만드는 프론트엔드 개발자입니다
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
                  사용자 경험을 최우선으로 생각하며, 깔끔하고 효율적인 코드를 작성하는 것을 목표로 합니다. 
                  새로운 기술을 배우는 것에 열정적이며, 항상 더 나은 솔루션을 찾기 위해 노력합니다.
                </p>
                <Separator />
                <p className="text-muted-foreground">
                  팀워크를 중시하며, 함께 성장하는 개발 문화를 만들어가고 있습니다.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20 shadow-lg">
                      <AvatarImage 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
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
                  <CardTitle className="text-xl mb-2">바이브 코딩</CardTitle>
                  <CardDescription className="text-base mb-4">프론트엔드 개발자</CardDescription>
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <span>📍 서울, 한국</span>
                    <span>🎓 컴퓨터공학</span>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                name: "React", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
                level: "고급",
                color: "bg-blue-50 dark:bg-blue-950"
              },
              { 
                name: "Next.js", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", 
                level: "고급",
                color: "bg-gray-50 dark:bg-gray-950"
              },
              { 
                name: "TypeScript", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", 
                level: "중급",
                color: "bg-blue-50 dark:bg-blue-950"
              },
              { 
                name: "Tailwind CSS", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", 
                level: "고급",
                color: "bg-cyan-50 dark:bg-cyan-950"
              },
              { 
                name: "JavaScript", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
                level: "고급",
                color: "bg-yellow-50 dark:bg-yellow-950"
              },
              { 
                name: "Node.js", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
                level: "중급",
                color: "bg-green-50 dark:bg-green-950"
              },
              { 
                name: "Git", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
                level: "중급",
                color: "bg-orange-50 dark:bg-orange-950"
              },
              { 
                name: "Figma", 
                icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", 
                level: "초급",
                color: "bg-purple-50 dark:bg-purple-950"
              }
            ].map((skill) => (
              <Card key={skill.name} className={`text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${skill.color}`}>
                <CardContent className="p-6">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg mb-2">{skill.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {skill.level}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">프로젝트</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Contact background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">연락처</h2>
          <p className="text-xl text-muted-foreground mb-12">
            프로젝트 협업이나 문의사항이 있으시면 언제든 연락해주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a href="mailto:contact@vibecoding.com" className="flex items-center gap-3">
                <span>📧</span>
                이메일 보내기
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <a href="https://github.com/vibecoding" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <span>🐙</span>
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <a href="https://linkedin.com/in/vibecoding" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <span>💼</span>
                LinkedIn
              </a>
            </Button>
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
