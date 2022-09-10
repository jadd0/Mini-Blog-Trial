import { parseCookie } from "../../../cookieParser.js";
import { Login } from "../../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";
import { checkAuth } from "../../../checkAuth.js";

const loginClass = new Login();


/** @type {import('./$types').Load} */
export async function POST({ request }) {
  const cookie = request.headers.get("cookie");

	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)

	if (!auth) {
		throw error(401, "Not authorised")
	}	
	const { data, error } = await supabase.from("Users").select("*");

  const req = await request.json()

  // (req)

	// (data);

  let copy = [...data]

	const items = copy
		.filter((user) => user.username.indexOf(req.query) !== -1)
		.map((a) => a.username);
	// (items)

	return new Response(JSON.stringify({data: items}));
}
