import { NextRequest, NextResponse } from 'next/server';
import { developerData } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터로 필터링 옵션 제공
    const { searchParams } = new URL(request.url);
    const includeSkills = searchParams.get('includeSkills') === 'true';
    const skillCategory = searchParams.get('skillCategory');

    let responseData = { ...developerData };

    // 스킬 필터링
    if (includeSkills && skillCategory) {
      responseData.skills = responseData.skills.filter(
        skill => skill.category === skillCategory
      );
    } else if (!includeSkills) {
      // 스킬 정보 제외
      delete responseData.skills;
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      message: "개발자 정보를 성공적으로 조회했습니다."
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
    console.error('Developer API Error:', error);
    return NextResponse.json({
      success: false,
      error: "개발자 정보를 조회하는 중 오류가 발생했습니다.",
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
