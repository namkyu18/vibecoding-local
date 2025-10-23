import { NextRequest, NextResponse } from 'next/server';
import { developerData } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');

    let skills = [...developerData.skills];

    // 카테고리별 필터링
    if (category) {
      skills = skills.filter(skill => skill.category === category);
    }

    // 레벨별 필터링
    if (level) {
      skills = skills.filter(skill => skill.level === level);
    }

    // 카테고리별 그룹화
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);

    return NextResponse.json({
      success: true,
      data: {
        skills,
        groupedSkills,
        total: skills.length
      },
      message: "기술 스택을 성공적으로 조회했습니다.",
      filters: {
        category,
        level
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
    console.error('Skills API Error:', error);
    return NextResponse.json({
      success: false,
      error: "기술 스택을 조회하는 중 오류가 발생했습니다.",
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
