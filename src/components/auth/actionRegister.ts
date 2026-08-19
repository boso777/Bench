'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function register(formData: FormData) {

  const supabase = await createClient()

  // 1. Prendi i dati inseriti nel form
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 2. Invia la richiesta di registrazione a Supabase
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  // 3. Gestisci il risultato
  if (error) {
    console.error('Errore registrazione:', error.message)
    return redirect('/register?error=1')
  }

  // Registrazione riuscita -> manda alla dashboard
  return redirect('/dashboard')
}