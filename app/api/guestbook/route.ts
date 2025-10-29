import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // Supabase 환경 변수 확인
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: false,
        error: "Supabase 환경 변수가 설정되지 않았습니다.",
        message: "Vercel 환경 변수에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해주세요."
      }, {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    const { data: entries, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: "데이터베이스에서 방명록을 조회하는 중 오류가 발생했습니다.",
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
      data: entries || [],
      total: entries?.length || 0,
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
    // Supabase 환경 변수 확인
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        success: false,
        error: "Supabase 환경 변수가 설정되지 않았습니다.",
        message: "Vercel 환경 변수에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정해주세요."
      }, {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

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

    const { data: newEntry, error } = await supabase
      .from('guestbook')
      .insert({
        name: name.trim(),
        message: message.trim()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      // 더 자세한 에러 메시지 제공
      let errorMessage = "서버 내부 오류가 발생했습니다.";
      if (error.code === 'PGRST204' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        errorMessage = "데이터베이스 테이블이 생성되지 않았습니다. Supabase SQL Editor에서 schema.sql을 실행해주세요.";
      } else if (error.code === '42501' || error.message?.includes('permission') || error.message?.includes('policy')) {
        errorMessage = "데이터베이스 권한 문제입니다. Supabase RLS 정책을 확인해주세요.";
      } else if (error.message) {
        errorMessage = `데이터베이스 오류: ${error.message}`;
      }
      
      return NextResponse.json({
        success: false,
        error: "데이터베이스에 방명록을 저장하는 중 오류가 발생했습니다.",
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
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
  } catch (error: any) {
    console.error('Guestbook POST API Error:', error);
    return NextResponse.json({
      success: false,
      error: "방명록 작성 중 오류가 발생했습니다.",
      message: error?.message || "서버 내부 오류가 발생했습니다.",
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
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

    const { error } = await supabase
      .from('guestbook')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({
        success: false,
        error: "데이터베이스에서 방명록을 삭제하는 중 오류가 발생했습니다.",
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
