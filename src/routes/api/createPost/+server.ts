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

	const { title, body, type } = await request.json();
	const res = await Posts.createPost({ title, body, type, username: auth.username });
	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});
	if (!res)
		throw error(
			500,
			'There has been an issue posting. Please try again later. If this issue persists please email me at jaddalkwork@gmail.com'
		);

	return new Response(JSON.stringify(200));
}
