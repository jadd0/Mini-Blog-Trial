import { get } from 'svelte/store';
import { authFlow } from '../../../functions/auth';
import { posts } from '../../stores/objects';
import { error } from '@sveltejs/kit';

const Posts = get(posts);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json();

	const post = await Posts.getPost(req.uuid, auth.username);

	if (!post) {
		throw error(404, `No post with uuid ${req.uuid}`);
	}

	if (post.username != auth.username) {
		throw error(403, `Not authorised to delete post with uuid ${req.uuid}`);
	}

	const res = await Posts.deletePost(req.uuid);
	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});
	if (!res) {
		throw error(500, 'Server error, please try again later');
	}
	return new Response(JSON.stringify({ key: auth.newKey }));
}
