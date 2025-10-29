import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
