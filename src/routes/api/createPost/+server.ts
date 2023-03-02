import { authFlow } from '../../../functions/auth'
import 
import { error } from '@sveltejs/kit';

/** @type {import('./$types').Load} */
export async function POST({ request, fetch }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

	const userData = await request.json();

	const res = await supabaseClass.createPost(userData, auth);

	if (res) return new Response("Posted successfully")
	throw error(500, "There has been an issue posting. Please try again later. If this issue persists please email me at jaddalkwork@gmail.com")
}
