import { get } from 'svelte/store';
import { authFlow } from '../../../functions/auth';
import { user } from '../../stores/objects';
import { error } from '@sveltejs/kit';

const User = get(user);

/** @type {import('./$types').Load} */
export async function POST({ request, fetch }) {
	const auth = await authFlow(request.headers.get('cookie'), fetch);

	if (!auth) {
		throw error(401, 'Not authorised');
	}

	let users = await User.getAllUsernames();
	const req = await request.json();
	const lowerQuery = req.query.toLowerCase();

	// TODO If the search query is empty, return 10 random users

	const items = users
		.filter((user: any) => user.username.toLowerCase().indexOf(lowerQuery) !== -1)
		.map((a: any) => a.username)
		.slice(0, 15);

	return new Response(JSON.stringify({ data: items, key: auth.newKey }));
}
