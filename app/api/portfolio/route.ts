import { NextRequest, NextResponse } from 'next/server';
import { projectsData } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tech = searchParams.get('tech');
    const limit = searchParams.get('limit');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    let filteredProjects = [...projectsData];

    // 상태별 필터링
    if (status) {
      filteredProjects = filteredProjects.filter(project => project.status === status);
    }

    // 기술 스택별 필터링
    if (tech) {
      const techArray = tech.split(',').map(t => t.trim());
      filteredProjects = filteredProjects.filter(project =>
        techArray.some(t => project.tech.includes(t))
      );
    }

    // 정렬
    filteredProjects.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // 개수 제한
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredProjects = filteredProjects.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
      total: filteredProjects.length,
      message: "포트폴리오를 성공적으로 조회했습니다.",
      filters: {
        status,
        tech,
        limit,
        sortBy,
        order
      }
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Portfolio API Error:', error);
    return NextResponse.json({
      success: false,
      error: "포트폴리오를 조회하는 중 오류가 발생했습니다.",
      message: "서버 내부 오류가 발생했습니다."
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
