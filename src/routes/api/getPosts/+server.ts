import { get } from 'svelte/store';
import { authFlow } from '../../../functions/auth';
import { user, posts } from '../../stores/objects';
import { error } from '@sveltejs/kit';

const User = get(user);
const Posts = get(posts);

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, url }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	let posts = [];
	const following = await User.getFollowing(auth.username);

	for (let i = 0; i < following.length; i++) {
		posts.push(await Posts.getPosts(following[i]));
	}

	let newPosts = [].concat(...posts);

	newPosts.sort(function (a: any, b: any) {
		return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
	});

	return new Response(JSON.stringify({ data: newPosts.reverse(), key: auth.newKey }));
}
