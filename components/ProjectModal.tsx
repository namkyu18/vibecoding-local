"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: string;
  image: string;
  githubUrl?: string;
  demoUrl?: string;
  detailedDescription?: string;
  features?: string[];
  duration?: string;
  teamSize?: string;
  challenges?: string[];
  solutions?: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
          <DialogDescription className="text-base">
            {project.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Project Image */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant={project.status === '완료' ? 'default' : 'secondary'}>
                {project.status}
              </Badge>
            </div>
          </div>

          {/* Project Links */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <Button asChild variant="outline" className="flex items-center gap-2">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub 코드 보기
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild className="flex items-center gap-2">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  라이브 데모 보기
                </a>
              </Button>
            )}
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {project.duration && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>개발 기간: {project.duration}</span>
                </div>
              )}
              
              {project.teamSize && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>팀 규모: {project.teamSize}</span>
                </div>
              )}

              {project.detailedDescription && (
                <div>
                  <h3 className="font-semibold mb-2">프로젝트 소개</h3>
                  <p className="text-muted-foreground">{project.detailedDescription}</p>
                </div>
              )}

              {project.features && (
                <div>
                  <h3 className="font-semibold mb-2">주요 기능</h3>
                  <ul className="space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">사용 기술</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {project.challenges && (
                <div>
                  <h3 className="font-semibold mb-2">도전 과제</h3>
                  <ul className="space-y-1">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-orange-500 mt-1">⚡</span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.solutions && (
                <div>
                  <h3 className="font-semibold mb-2">해결 방법</h3>
                  <ul className="space-y-1">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-blue-500 mt-1">💡</span>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
