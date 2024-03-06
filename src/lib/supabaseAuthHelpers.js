import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { supabase } from '$lib/supabaseClient'

export const { session, signInWithEmail, signOut, user } = getSupabase(supabase)