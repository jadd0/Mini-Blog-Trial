import { supabase } from "../../../supabaseClient.js";
import { parseCookie } from "../../../cookieParser.js";
import { Login } from "../../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";

const loginClass = new Login();

async function checkUser(username) {
	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", username);
	
	if (data.length == 0) {
		return false
	}

	return true
}

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");
  const cookieList = parseCookie(cookie);

  if (cookieList.jwt == undefined) {
    throw redirect(307, "/login");
  }

  const jwt = JSON.parse(cookieList.jwt)
  const userLoggedIn = loginClass.authenticate(supabase, jwt.username, jwt.password)

  if (!userLoggedIn) {
    throw redirect(307, '/login');
  }

  const user = await checkUser(params.username)
	
	if (!user) {
		throw error(404, "No user found");
	}

	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("a", params.username);

	return {
		data: (data.reverse()),
	};
}