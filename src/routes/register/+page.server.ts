import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`
      }
    });

    if (error) {
      return fail(500, { error: error.message });
    }

    // Check if email confirmation is required
    if (data.user?.identities?.length === 0) {
      return { success: true, message: 'Please check your email for confirmation link.' };
    }

    throw redirect(303, '/');
  }
};
