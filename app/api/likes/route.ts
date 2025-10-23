import { NextRequest, NextResponse } from 'next/server';
import { getLikesData, getLikesByType, addLike, toggleLike } from '@/lib/likes-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemType = searchParams.get('itemType');
    const itemId = searchParams.get('itemId');

    let likesData = getLikesData();

    // 특정 타입으로 필터링
    if (itemType && ['project', 'skill', 'general'].includes(itemType)) {
      likesData = getLikesByType(itemType as 'project' | 'skill' | 'general');
    }

    // 특정 아이템의 좋아요 조회
    if (itemId) {
      const itemLike = likesData.find(like => like.itemId === itemId);
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
          data: { itemId, count: 0 },
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
      data: likesData,
      total: likesData.length,
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

    const result = toggleLike(itemId, itemType);

    return NextResponse.json({
      success: true,
      data: result.like,
      isLiked: result.isLiked,
      message: result.isLiked ? "좋아요가 성공적으로 추가되었습니다." : "좋아요가 취소되었습니다."
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
