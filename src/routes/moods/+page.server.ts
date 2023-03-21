import { error, redirect } from "@sveltejs/kit";
import { get } from 'svelte/store'
import { authFlow } from '../../functions/auth'
import { moods } from '../stores/objects'

const Moods = get(moods)

/** @type {import('./$types').Load} */
export const load: any = async ({ request, cookies, fetch }) => {
  const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw redirect(307, "/login");
	}
	
	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

  const data = await Moods.getMoods(auth.username) || []
	
  return {
    data,
    ...auth
  }
}
