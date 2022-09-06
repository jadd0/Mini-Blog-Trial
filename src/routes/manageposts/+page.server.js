import { parseCookie } from "../../cookieParser.js";
import { Login } from "../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { checkAuth } from "../../checkAuth.js";
import { supabase } from "../../supabaseClient.js";

const loginClass = new Login();

async function getPosts(username) {
	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("a", username);
	
	return data
}

/** @type {import('./$types').Load} */
export async function load({ request }) {
  const cookie = request.headers.get("cookie");

	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)


	if (!auth) {
		throw redirect(307, "/login");
	}



	const jwtName = parseCookie(cookie).jwt
	const username = jwtName.replaceAll('"','')
	
	throw redirect(307, `/user/${username}`)

	const data = (await getPosts(username)).reverse()

	return {
		data: data
	}
}