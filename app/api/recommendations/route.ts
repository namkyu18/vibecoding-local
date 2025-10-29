import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');

    let responseData;
    let message;

    if (type === 'random') {
      // 랜덤 추천
      const { data: recommendations, error } = await supabase
        .from('recommendations')
        .select('*');

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({
          success: false,
          error: "데이터베이스에서 추천 문구를 조회하는 중 오류가 발생했습니다.",
          message: "서버 내부 오류가 발생했습니다."
        }, {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      const randomIndex = Math.floor(Math.random() * (recommendations?.length || 0));
      responseData = recommendations?.[randomIndex];
      message = "오늘의 추천 문구를 성공적으로 조회했습니다.";
    } else if (category && ['motivation', 'tech', 'life', 'career'].includes(category)) {
      // 카테고리별 추천
      const { data: recommendations, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('category', category);

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({
          success: false,
          error: "데이터베이스에서 추천 문구를 조회하는 중 오류가 발생했습니다.",
          message: "서버 내부 오류가 발생했습니다."
        }, {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      responseData = recommendations || [];
      message = `${category} 카테고리 추천을 성공적으로 조회했습니다.`;
    } else {
      // 전체 추천 목록
      const { data: recommendations, error } = await supabase
        .from('recommendations')
        .select('*');

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({
          success: false,
          error: "데이터베이스에서 추천 문구를 조회하는 중 오류가 발생했습니다.",
          message: "서버 내부 오류가 발생했습니다."
        }, {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        });
      }

      responseData = recommendations || [];
      message = "추천 목록을 성공적으로 조회했습니다.";
    }

    return NextResponse.json({
      success: true,
      data: responseData,
      message,
      ...(type === 'random' ? {} : { total: Array.isArray(responseData) ? responseData.length : 1 })
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
    console.error('Recommendations API Error:', error);
    return NextResponse.json({
      success: false,
      error: "추천을 조회하는 중 오류가 발생했습니다.",
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
