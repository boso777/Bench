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
    console.log("=== ERRORE DETTAGLIATO SUPABASE ===", error.message)

    // Per testare, puoi anche passare il messaggio reale nell'URL:
    return redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  // Registrazione riuscita -> manda alla dashboard
  return redirect('/dashboard')
}