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

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();

  const time = body.code.split('.')[1]
	
  const res = await checkKey(body.username, body.code, time)

  if (!res) return new Response("Reset code invalid", { status: 401 });

  const hashedPassword = await Auth.hashPassword(body.password)
	const res1 = await User.changePassword(body.username, hashedPassword)
  const res2 = await PasswordReset.changeResetKey(body.username, '')

  if (!res1 || !res2) return new Response("There has been an error whilst resetting your password. Please try again later. If this error persists please email me jaddalkwork@gmail.com", { status: 500 });

	return new Response("Password changed successfully", { status: 200 });
}