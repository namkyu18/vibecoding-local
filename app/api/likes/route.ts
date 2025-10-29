import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemType = searchParams.get('itemType');
    const itemId = searchParams.get('itemId');

    // Supabase에서 좋아요 데이터 조회
    let query = supabase
      .from('likes')
      .select('*');

    // 특정 타입으로 필터링
    if (itemType && ['project', 'skill', 'general'].includes(itemType)) {
      query = query.eq('item_type', itemType);
    }

    // 특정 아이템의 좋아요 조회
    if (itemId) {
      query = query.eq('item_id', itemId);
    }

    const { data: likesData, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: "데이터베이스에서 좋아요 정보를 조회하는 중 오류가 발생했습니다.",
        message: "서버 내부 오류가 발생했습니다."
      }, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    // 특정 아이템의 좋아요 조회인 경우
    if (itemId) {
      const itemLike = likesData?.find(like => like.item_id === itemId);
      if (itemLike) {
        return NextResponse.json({
          success: true,
          data: itemLike,
          message: "좋아요 정보를 성공적으로 조회했습니다."
        }, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      } else {
        return NextResponse.json({
          success: true,
          data: { item_id: itemId, count: 0 },
          message: "좋아요 정보를 성공적으로 조회했습니다."
        }, {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: likesData || [],
      total: likesData?.length || 0,
      message: "좋아요 목록을 성공적으로 조회했습니다."
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
    console.error('Likes GET API Error:', error);
    return NextResponse.json({
      success: false,
      error: "좋아요 정보를 조회하는 중 오류가 발생했습니다.",
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { itemId, itemType } = body;

    // 입력 검증
    if (!itemId || !itemType) {
      return NextResponse.json({
        success: false,
        error: "itemId와 itemType은 필수입니다.",
        message: "모든 필드를 입력해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    if (!['project', 'skill', 'general'].includes(itemType)) {
      return NextResponse.json({
        success: false,
        error: "itemType은 project, skill, general 중 하나여야 합니다.",
        message: "올바른 타입을 선택해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    // 기존 좋아요가 있는지 확인
    const { data: existingLike, error: checkError } = await supabase
      .from('likes')
      .select('*')
      .eq('item_id', itemId)
      .eq('item_type', itemType)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116은 "not found" 에러
      console.error('Supabase check error:', checkError);
      return NextResponse.json({
        success: false,
        error: "데이터베이스에서 좋아요 정보를 확인하는 중 오류가 발생했습니다.",
        message: "서버 내부 오류가 발생했습니다."
      }, {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    if (existingLike) {
      // 기존 좋아요가 있으면 삭제 (토글)
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        console.error('Supabase delete error:', deleteError);
        return NextResponse.json({
          success: false,
          error: "데이터베이스에서 좋아요를 삭제하는 중 오류가 발생했습니다.",
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
        data: null,
        isLiked: false,
        message: "좋아요가 취소되었습니다."
      }, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    } else {
      // 새로운 좋아요 생성
      const { data: newLike, error: insertError } = await supabase
        .from('likes')
        .insert({
          item_id: itemId,
          item_type: itemType,
          count: 1
        })
        .select()
        .single();

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        return NextResponse.json({
          success: false,
          error: "데이터베이스에 좋아요를 저장하는 중 오류가 발생했습니다.",
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
        data: newLike,
        isLiked: true,
        message: "좋아요가 성공적으로 추가되었습니다."
      }, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    }
  } catch (error) {
    console.error('Likes POST API Error:', error);
    return NextResponse.json({
      success: false,
      error: "좋아요 추가 중 오류가 발생했습니다.",
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
