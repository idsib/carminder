import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.CM_SUPABASE_URL;
const supabaseAnonKey = process.env.CM_NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para registrar un usuario y enviar un correo de verificación
export async function signUpUser(email, password, redirectTo) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    console.error('Error al registrar usuario:', error.message);
    return { error };
  }

  return { data };
}

// Función para enviar un correo de restablecimiento de contraseña
export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://tudominio.com/reset-password',
  });

  if (error) {
    console.error('Error al enviar correo de restablecimiento:', error.message);
    return { error };
  }

  return { data };
}