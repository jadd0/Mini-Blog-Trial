import { parseCookie } from "../../../cookieParser.js";
import { Login } from "../../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";
import { checkAuth } from "../../checkAuth.js";

const loginClass = new Login();


/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");

	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)

	if (!auth) {
		throw redirect(307, "/login");
	}

  const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("id", params.post);

  if (data == undefined || data.length == 0) {
    throw error(404, 'No post found');
  }

	const returnData = data[0]
	return {
		returnData
	}
}
