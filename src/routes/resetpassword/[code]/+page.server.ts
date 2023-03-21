import { get } from 'svelte/store';
import { auth, user, passwordReset } from '../../stores/objects';
import { error, redirect } from "@sveltejs/kit";


const Auth = get(auth);
const User = get(user);
const PasswordReset = get(passwordReset);

async function checkKey(username, code, time) {
	const res = await PasswordReset.checkKey(code);
	if (!res) return false;

	if (time < new Date().getTime()) {
		PasswordReset.changeResetKey(username, '');
		throw error(404, 'Reset code expired');
	}
  return true
}

export const load = async ({ request, params }) => {
	const cookie = Auth.Parse.parseCookie(request.headers.get('cookie'));
	const username = params.code.split('.')[0];
	const time = params.code.split('.')[1];

	const code = `${params.code.split('.')[1]}.${params.code.split('.')[2]}`

	const res = await checkKey(username, code, time);

	if (!res) throw error(404, 'Reset code invalid');

	return {
		code: code,
		username,
	};
};
