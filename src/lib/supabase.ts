import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Database {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string
          nome: string
          email: string
          telefone?: string
          empresa?: string
          data_cadastro: string
          ativo: boolean
        }
        Insert: {
          id?: string
          nome: string
          email: string
          telefone?: string
          empresa?: string
          data_cadastro?: string
          ativo?: boolean
        }
        Update: {
          id?: string
          nome?: string
          email?: string
          telefone?: string
          empresa?: string
          data_cadastro?: string
          ativo?: boolean
        }
      }
      campanhas: {
        Row: {
          id: string
          cliente_id: string
          nome_campanha: string
          canal: string
          objetivo: string
          status: string
          data_inicio: string
          ultima_alteracao: string
          resultado_principal: string
          link_campanha?: string
          investimento?: number
        }
        Insert: {
          id?: string
          cliente_id: string
          nome_campanha: string
          canal: string
          objetivo: string
          status: string
          data_inicio?: string
          ultima_alteracao?: string
          resultado_principal: string
          link_campanha?: string
          investimento?: number
        }
        Update: {
          id?: string
          cliente_id?: string
          nome_campanha?: string
          canal?: string
          objetivo?: string
          status?: string
          data_inicio?: string
          ultima_alteracao?: string
          resultado_principal?: string
          link_campanha?: string
          investimento?: number
        }
      }
      resultados: {
        Row: {
          id: string
          cliente_id: string
          data: string
          kpi_principal: string
          variacao: string
          destaques: string[]
          comentario?: string
        }
        Insert: {
          id?: string
          cliente_id: string
          data: string
          kpi_principal: string
          variacao: string
          destaques: string[]
          comentario?: string
        }
        Update: {
          id?: string
          cliente_id?: string
          data?: string
          kpi_principal?: string
          variacao?: string
          destaques?: string[]
          comentario?: string
        }
      }
      leads: {
        Row: {
          id: string
          cliente_id: string
          nome: string
          telefone: string
          campanha_origem: string
          data_entrada: string
          status: string
          tag_extra?: string
          observacoes?: string
        }
        Insert: {
          id?: string
          cliente_id: string
          nome: string
          telefone: string
          campanha_origem: string
          data_entrada?: string
          status: string
          tag_extra?: string
          observacoes?: string
        }
        Update: {
          id?: string
          cliente_id?: string
          nome?: string
          telefone?: string
          campanha_origem?: string
          data_entrada?: string
          status?: string
          tag_extra?: string
          observacoes?: string
        }
      }
    }
  }
}