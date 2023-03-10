import { get } from 'svelte/store';
import { auth, user, passwordReset } from '../../stores/objects';
import { error, redirect } from "@sveltejs/kit";


const Auth = get(auth);
const User = get(user);
const PasswordReset = get(passwordReset);

async function checkKey(username, code, time) {
	const user = await PasswordReset.checkKey(code);
  console.log(user)
	if (!user) return false;

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

	const res = await checkKey(username, params.code, time);
  console.log({res})
	if (!res) throw error(404, 'Reset code invalid');

	return {
		code: params.code
	};
};
