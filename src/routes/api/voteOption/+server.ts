import { get } from 'svelte/store';
import { authFlow } from '../../../functions/auth';
import { vote } from '../../stores/objects';
import { error } from '@sveltejs/kit';

const Vote = get(vote);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	const req = await request.json();

	const res = await Vote.voteOnPost(req.uuid, req.optionUUID, auth.username);
	if (!res)
		throw error(
			500,
			`There has been an error voting on post ${req.id}. This post may not exist or may already be voted by @${auth}. Please try again later. If this issue persists please email me at jaddalkwork@gmail.com.`
		);

	return new Response(JSON.stringify({ key: auth.newKey }));
}
