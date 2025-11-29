import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');

export type UserProfile = {
  id: string;
  user_type: 'patient' | 'doctor';
  full_name: string;
  email: string;
  cpf?: string;
  phone?: string;
  specialization?: string;
  crm?: string;
  created_at: string;
  updated_at: string;
};

export type AuthUser = {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
};
