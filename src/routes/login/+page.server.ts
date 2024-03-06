import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.supabase.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (err) {
      if (err instanceOf AuthApiError && err.status == 400) {
        return fail(400, {
          error: "Invalid credentials"
        })
    }
  }
}}