import { get } from 'svelte/store'
import { error, redirect } from "@sveltejs/kit";
import { authFlow } from '../../../functions/auth'
import { user } from '../../stores/objects'

const User = get(user)

/** @type {import('./$types').Load} */
export const load: any = async ({ request, cookies, fetch, params }) => {
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

  const user = await User.getUser(params.username)

	if (!user) {
		throw error(404, "No user found");
	}

	let bool = false
	const followersList = await User.getFollowed(params.username) || ['Noone yet!']
	console.log(followersList)

	return {
		data: followersList,
		username: auth.username
	};
}