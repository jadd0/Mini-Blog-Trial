import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { posts } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const Posts = get(posts)

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, url, cookies }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

  const username = url.searchParams.get("user")
	let posts = await Posts.getPosts(username, auth.username)


	posts.sort(function(a: any, b: any) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});	

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: posts.reverse(), key: auth.newKey }));
}