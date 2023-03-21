import { get } from 'svelte/store'
import { error, redirect } from "@sveltejs/kit";
import { authFlow } from '../../../functions/auth'
import { posts } from '../../stores/objects'

const Posts = get(posts)
// NOT DONE YET

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

	const res = await Posts.getPost(params.post, auth.username)

	if (!res) {
		throw error(404, "No post found");
	}

	let bool = false
	if (auth.username == res.username) {
		bool = true
	}

  if (!res) {
    throw error(404, 'No post found');
  }

	res.comments.sort(function(a, b) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});

	res.comments = res.comments.reverse()

	return {
		bool,
		...res,
		authUsername: auth.username,
		id: params.post
	}
}
