import { Login } from "../../../classes/login.js";
import { supabase } from "../../../supabaseClient.js";

// const login = new Login();

async function login(username, password) {
	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", username);

	if (data.length == 0) {
		return false
	}

	if (data[0].password !== password) {
		return false
	}

	return true
}

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request, error }) => {
	const body = await request.json();

	const username = body.username;
	const password = body.password;

	const auth = await login(username, password)

	if (!auth) {
		return new Response('Invalid credentials', {status: 406})
	}

	// if (!res) {
	// 	return new Response("Invalid credentials", { status: 406 });
	// }

	// const cookie = login.generateCookie();

	// serverResponse.headers.append("set-cookie", cookie);
	// console.log(serverResponse.headers);

	// serverResponse.status = 303
	// console.log(serverResponse.headers);
	// return new Response("Redirect", {
	//   cookies: cookie,
	// 	status: 303,
	// 	headers: { Location: "/protected" },
	// });
	// Response.headers.set('set-cookie', response)

	
	// return serverResponse;
};
