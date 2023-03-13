import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { user } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const User = get(user)

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

	const userData = await request.json()
	const username = userData.username 

	const res = await User.follow(auth.username, username)

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});
	
	if (!res) {
		throw error(500, 'There has been an error while following this user. Please try again later, and if this issue persists please email me at jaddalkwork@gmail.com')
	}

	return new Response(JSON.stringify({key: auth.newKey}))
}
