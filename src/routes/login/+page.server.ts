import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const { error } = await locals.supabase.auth.signInWithPassword({
      email: formData.get('email') as string,
      password: formData.get('password') as string
    });

    if (error) {
      if (error instanceof AuthApiError) return fail(400, { error: error.message });
      return fail(500, { error: 'Server error' });
    }
    throw redirect(303, '/dashboard');
  }
};
