import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { user } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const User = get(user)

/** @type {import('./$types').Load} */
export async function POST({ request, fetch }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

	const userData = await request.json()
	const username = userData.username //usertofollow

	const res = await User.unfollow(auth.username, username)
	
	if (!res) {
		throw error(500, `Sorry there has been an error whilst unfollowing @${username}. Please try again later. If this continues to occur, please contact me at jaddalkwork@gmail.com`)
	}

	return new Response(JSON.stringify({ key: auth.newKey }));
}
