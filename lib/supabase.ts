import { createClient, SupabaseClient } from '@supabase/supabase-js'

// 환경 변수를 안전하게 가져오기
function getEnvVar(key: string): string {
  try {
    return (process?.env?.[key] as string) || ''
  } catch {
    return ''
  }
}

const supabaseUrl = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')

// 환경 변수 검증 함수
export const isSupabaseConfigured = (): boolean => {
  const url = getEnvVar('NEXT_PUBLIC_SUPABASE_URL')
  const key = getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  return !!(url && key && url.length > 0 && key.length > 0 && !url.includes('placeholder'))
}

// Supabase 클라이언트 생성 (빌드 시에도 안전)
let supabaseClient: SupabaseClient

if (supabaseUrl && supabaseAnonKey && supabaseUrl.length > 0 && supabaseAnonKey.length > 0) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // 빌드 시 환경 변수가 없어도 오류 없이 빌드되도록 더미 클라이언트 생성
  supabaseClient = createClient('https://placeholder.supabase.co', 'placeholder-key-1234567890')
  
  // 개발 환경에서만 경고 (빌드 시에는 출력하지 않음)
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
    console.warn(
      '[Supabase] 환경 변수가 설정되지 않았습니다. API 호출 시 오류가 발생할 수 있습니다.\n' +
      '다음 환경 변수를 설정해주세요:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL\n' +
      '- NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )
  }
}

export const supabase = supabaseClient

// 타입 정의
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          detailed_description: string
          tech: string[]
          status: '완료' | '진행중' | '계획중'
          image: string
          github_url: string
          demo_url: string
          features: string[]
          duration: string
          team_size: string
          challenges: string[]
          solutions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          detailed_description: string
          tech: string[]
          status: '완료' | '진행중' | '계획중'
          image: string
          github_url: string
          demo_url: string
          features: string[]
          duration: string
          team_size: string
          challenges: string[]
          solutions: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          detailed_description?: string
          tech?: string[]
          status?: '완료' | '진행중' | '계획중'
          image?: string
          github_url?: string
          demo_url?: string
          features?: string[]
          duration?: string
          team_size?: string
          challenges?: string[]
          solutions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          icon: string
          level: '초급' | '중급' | '고급'
          category: 'frontend' | 'backend' | 'tools' | 'design'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          level: '초급' | '중급' | '고급'
          category: 'frontend' | 'backend' | 'tools' | 'design'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          level?: '초급' | '중급' | '고급'
          category?: 'frontend' | 'backend' | 'tools' | 'design'
          created_at?: string
          updated_at?: string
        }
      }
      guestbook: {
        Row: {
          id: string
          name: string
          message: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          message: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          message?: string
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          item_id: string
          item_type: 'project' | 'skill' | 'general'
          count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          item_id: string
          item_type: 'project' | 'skill' | 'general'
          count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          item_id?: string
          item_type?: 'project' | 'skill' | 'general'
          count?: number
          created_at?: string
          updated_at?: string
        }
      }
      recommendations: {
        Row: {
          id: string
          content: string
          author?: string
          category: 'motivation' | 'tech' | 'life' | 'career'
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          author?: string
          category: 'motivation' | 'tech' | 'life' | 'career'
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          author?: string
          category?: 'motivation' | 'tech' | 'life' | 'career'
          created_at?: string
        }
      }
      developer: {
        Row: {
          id: string
          name: string
          title: string
          description: string
          location: string
          education: string
          email: string
          github: string
          linkedin: string
          philosophy: string
          experience: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          title: string
          description: string
          location: string
          education: string
          email: string
          github: string
          linkedin: string
          philosophy: string
          experience: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          title?: string
          description?: string
          location?: string
          education?: string
          email?: string
          github?: string
          linkedin?: string
          philosophy?: string
          experience?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
