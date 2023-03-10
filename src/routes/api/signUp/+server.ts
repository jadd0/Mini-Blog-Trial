import { get } from 'svelte/store';
import { auth } from '../../stores/objects';
import { error } from "@sveltejs/kit";

const Auth = get(auth);

export async function POST({ request }) {
	const req = await request.json();
	req.password = await Auth.hashPassword(req.password);

	const res = await Auth.signUp(req);

	if (!res) {
		return new Response('User with email/username already exists', { status: 401 });
	}

	const randomString = await Auth.Parse.generateRandomString(70);
	const res1 = await Auth.updateValue({
		table: 'Users',
		columnToMatch: 'username',
		valueToMatch: req.username,
		columnToChange: 'accessKey',
		valueToChange: randomString
	});

	if (!res1) {
		throw error(500, 'There has been an error creating an access key for your account. Please try logging in. If this issue continues to occur, please contact me at jaddalkwork@gmail.com')
	}

	const cookie = Auth.Parse.generateCookie(randomString);
	return new Response('Redirect', {
		status: 200,
		headers: { 'set-cookie': cookie, Location: '/' }
	});
}
