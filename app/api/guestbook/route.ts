import { NextRequest, NextResponse } from 'next/server';
import { getGuestbookEntries, addGuestbookEntry, deleteGuestbookEntry } from '@/lib/guestbook-data';

export async function GET(request: NextRequest) {
  try {
    const entries = getGuestbookEntries();
    
    return NextResponse.json({
      success: true,
      data: entries,
      total: entries.length,
      message: "방명록을 성공적으로 조회했습니다."
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
    console.error('Guestbook GET API Error:', error);
    return NextResponse.json({
      success: false,
      error: "방명록을 조회하는 중 오류가 발생했습니다.",
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
    const { name, message } = body;

    // 입력 검증
    if (!name || !message) {
      return NextResponse.json({
        success: false,
        error: "이름과 메시지는 필수입니다.",
        message: "모든 필드를 입력해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    if (name.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: "이름은 2글자 이상이어야 합니다.",
        message: "이름을 2글자 이상 입력해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    if (message.trim().length < 5) {
      return NextResponse.json({
        success: false,
        error: "메시지는 5글자 이상이어야 합니다.",
        message: "메시지를 5글자 이상 입력해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    if (message.trim().length > 500) {
      return NextResponse.json({
        success: false,
        error: "메시지는 500글자 이하여야 합니다.",
        message: "메시지를 500글자 이하로 입력해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    const newEntry = addGuestbookEntry(name, message);

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: "방명록에 성공적으로 작성되었습니다."
    }, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Guestbook POST API Error:', error);
    return NextResponse.json({
      success: false,
      error: "방명록 작성 중 오류가 발생했습니다.",
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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        error: "삭제할 방명록 ID가 필요합니다.",
        message: "ID를 제공해주세요."
      }, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    const success = deleteGuestbookEntry(id);

    if (!success) {
      return NextResponse.json({
        success: false,
        error: "해당 방명록을 찾을 수 없습니다.",
        message: "존재하지 않는 방명록입니다."
      }, {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: "방명록이 성공적으로 삭제되었습니다."
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
    console.error('Guestbook DELETE API Error:', error);
    return NextResponse.json({
      success: false,
      error: "방명록 삭제 중 오류가 발생했습니다.",
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
