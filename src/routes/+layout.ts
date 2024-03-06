// src/routes/+layout.ts
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey =  import.meta.env.VITE_SUPABASE_ANON_KEY


export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl,
    supabaseKey,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}