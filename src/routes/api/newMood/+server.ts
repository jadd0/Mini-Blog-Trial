import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { moods } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const Moods = get(moods)

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

	const req = await request.json();
	const res = await Moods.newMood(req.mood, req.text, auth.username);

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});
	
  if (!res) throw error(500, `There has been an error posting this mood. Please try again later. If this issue persists, please email jaddalkwork@gmail.com`)

	return new Response(`Mood posted successfully`)
}
