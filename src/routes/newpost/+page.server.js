import { parseCookie } from "../../cookieParser.js";
import { Login } from "../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { checkAuth } from "../../checkAuth.js";
import { supabase } from "../../supabaseClient.js";

const loginClass = new Login();

/** @type {import('./$types').Load} */
export async function load({ request }) {
  const cookie = request.headers.get("cookie");

	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)


	if (!auth) {
		throw redirect(307, "/login");
	}
}