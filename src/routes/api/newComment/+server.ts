import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { posts } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const Posts = get(posts)

/** @type {import('./$types').Load} */
export async function POST({ request, fetch }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

	const req = await request.json();

	const res = await Posts.newComment(req.id, auth.username, req.commentBody);

	if (!res) {
		throw error(500);
	}

	return new Response(JSON.stringify({ key: auth.newKey }));
}
