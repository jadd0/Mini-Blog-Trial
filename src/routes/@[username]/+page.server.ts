import { get } from 'svelte/store'
import { error, redirect } from "@sveltejs/kit";
import { authFlow } from '../../functions/auth'
import { user } from '../stores/objects'

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
	const followingList = await User.getFollowing(auth.username)

	try {
		const res = followingList.find(obj => params.username == obj.followedUsername)
		console.log(res)
		if (res != undefined) bool = true
	}
	catch {
		bool = false
	}

	if (auth.username == params.username) {
		bool = 'self'
	}
	
	

	return {
		user: user,
		followingList,
		...auth,
		bool: bool
	};
}