import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.CM_SUPABASE_URL;
const supabaseAnonKey = process.env.CM_NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);