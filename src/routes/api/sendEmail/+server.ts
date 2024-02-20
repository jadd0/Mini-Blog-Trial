import { get } from 'svelte/store';
import { auth, passwordReset } from '../../stores/objects';

const Auth = get(auth)
const PasswordReset = get(passwordReset)

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();
	const res = await Auth.checkEmail(body.username, body.email);
	console.log(res)
	if (!res) {
		return new Response('Invalid email/username', { status: 401 });
	}

	// 15 minutes
	const time = 900000;
	const code = Auth.Parse.generateToken(40, time);
	const date = new Date().getTime() + time;
	const email = await PasswordReset.sendEmail(body.email, body.username, 'Reset Password', code, date);
	console.log(email)
	if (!email) {
		return new Response(
			'Sorry, there has been an issue sending the email. Please try again later. If this issue persists, please email me jaddalkwork@gmail.com',
			{ status: 500 }
		);
	}

	const resKey = await PasswordReset.changeResetKey(body.username, code);
	if (!resKey) {
		return new Response(
			'Sorry, there has been an issue changing your reset key. Please try again later. If this issue persists, please email me jaddalkwork@gmail.com',
			{ status: 500 }
		);
	}

	return new Response('Email sent', { status: 200 });
};
