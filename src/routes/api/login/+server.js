import { Login } from "../../../classes/login.js";
import { supabase } from "../../../supabaseClient.js";

const loginClass = new Login();

async function login(username, password) {
	const authBool = await loginClass.authenticate(
		supabase,
		username,
		password
	);

	return authBool;
}

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request, error }) => {
	const body = await request.json();

	const username = body.username;
	const password = body.password;

	// console.log(username, password);

	const auth = await login(username, password);
	// console.log(auth)
	if (!auth) {
		return new Response("Invalid credentials", { status: 406 });
	}

	const cookie = loginClass.generateCookie(username, password);

	// console.log(cookie);

	// const h = new Response()

	// console.log(h.cookies)

	return new Response('Redirect', {
		// cookies: cookie,
		status: 200,
		headers: { 'set-cookie': cookie,
		Location: "/newpost" },
	});
	// Response.headers.set('set-cookie', response)

	// return serverResponse;
};
