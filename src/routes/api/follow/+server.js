import { parseCookie } from "../../../cookieParser.js";
import { Login } from "../../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";
import { checkAuth } from "../../../checkAuth.js";

const loginClass = new Login();

/** @type {import('./$types').Load} */
export async function POST({ request }) {
	console.log("hello");
	const cookie = request.headers.get("cookie");
	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase);

	if (!auth) {
		throw error("Not authorised");
	}

	const userData = await request.json() //userToFollow
  console.log(userData.username)

	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", auth)

  let followingList = data[0].followingList
  followingList.push(userData.username)

	const { d, error } = await supabase
		.from("Users")
		.update({ followingList: followingList })
		.match({ username: auth }); 

	if (error == undefined) {
		return new Response({ status: 200 });
	}

	return new Response({ status: 404 });
}
