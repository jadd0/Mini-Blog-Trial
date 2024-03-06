// src/routes/posts/+page.server.ts
import { error, fail, redirect } from '@sveltejs/kit'


export const load = async({ locals: { supabase, getSession } }) => {
  const session = await getSession()
  console.log(session)
  if (!session) {
    // the user is not signed in
    throw redirect(307, '/auth')
  }
}