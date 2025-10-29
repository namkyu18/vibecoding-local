import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터로 필터링 옵션 제공
    const { searchParams } = new URL(request.url);
    const includeSkills = searchParams.get('includeSkills') === 'true';
    const skillCategory = searchParams.get('skillCategory');

    // 개발자 정보 조회
    const { data: developer, error: developerError } = await supabase
      .from('developer')
      .select('*')
      .single();

    if (developerError) {
      console.error('Supabase developer error:', developerError);
      return NextResponse.json({
        success: false,
        error: "데이터베이스에서 개발자 정보를 조회하는 중 오류가 발생했습니다.",
        message: "서버 내부 오류가 발생했습니다."
      }, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    let responseData = { ...developer };

    // 스킬 정보 포함 여부에 따라 처리
    if (includeSkills) {
      let skillsQuery = supabase.from('skills').select('*');
      
      if (skillCategory) {
        skillsQuery = skillsQuery.eq('category', skillCategory);
      }

      const { data: skills, error: skillsError } = await skillsQuery;

      if (skillsError) {
        console.error('Supabase skills error:', skillsError);
        return NextResponse.json({
          success: false,
          error: "데이터베이스에서 기술 스택을 조회하는 중 오류가 발생했습니다.",
          message: "서버 내부 오류가 발생했습니다."
        }, {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      responseData.skills = skills || [];
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
