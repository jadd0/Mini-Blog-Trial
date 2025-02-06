// src/hooks.server.ts
import { createServerClient } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';


const supabaseUrl = process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY


export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // Modern cookie handling (required)
      get: (name) => event.cookies.get(name)?.value,
      set: (name, value, options) => {
        event.cookies.set(name, value, { 
          path: '/',
          ...options
        })
      },
      remove: (name, options) => {
        event.cookies.delete(name, {
          path: '/',
          ...options
        })
      }
    }
  });

  // Session handling remains the same
  event.locals.getSession = async () => {
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    return session;
  };

  // Route protection logic
  if (event.url.pathname.startsWith('/protected')) {
    const session = await event.locals.getSession();
    if (!session) throw redirect(303, '/login');
  }

  return resolve(event);
};
