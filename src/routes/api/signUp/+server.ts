import { get } from 'svelte/store';
import { auth } from '../../stores/objects';
import { error } from "@sveltejs/kit";

const Auth = get(auth);

export async function POST({ request }) {
	const req = await request.json();

	req.password = await Auth.hashPassword(req.password);
	const accessKey = Auth.Parse.generateRandomString(70);

	const res = await Auth.signUp(req, accessKey);

	if (!res) {
		return new Response('User with email/username already exists', { status: 401 });
	}

	const followRes = await Auth.newValue({
		table: 'Following',
		values: {
			username: req.username,
			followedUsername: req.username
		}
	})

	const cookie = Auth.Parse.generateCookie(accessKey, 'never', 'accessKey');
	
	return new Response('Success', {
		status: 200,
		headers: {
			'set-cookie': cookie,
			Location: '/'
		}
	});
}
