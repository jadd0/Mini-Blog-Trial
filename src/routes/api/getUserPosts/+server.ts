import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { posts } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const Posts = get(posts)

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, url }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

  const username = url.searchParams.get("user")
	let posts = await Posts.getPosts(username)


	posts.sort(function(a: any, b: any) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});	

	return new Response(JSON.stringify({ data: posts.reverse(), key: auth.newKey }));
}