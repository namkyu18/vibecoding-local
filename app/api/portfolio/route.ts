import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tech = searchParams.get('tech');
    const limit = searchParams.get('limit');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    // Supabase에서 프로젝트 데이터 조회
    let query = supabase
      .from('projects')
      .select('*');

    // 상태별 필터링
    if (status) {
      query = query.eq('status', status);
    }

    // 기술 스택별 필터링 (PostgreSQL 배열 검색)
    if (tech) {
      const techArray = tech.split(',').map(t => t.trim());
      query = query.overlaps('tech', techArray);
    }

    // 정렬
    query = query.order(sortBy, { ascending: order === 'asc' });

    // 개수 제한
    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    const { data: projects, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: "데이터베이스에서 프로젝트를 조회하는 중 오류가 발생했습니다.",
        message: "서버 내부 오류가 발생했습니다."
      }, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: projects || [],
      total: projects?.length || 0,
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
