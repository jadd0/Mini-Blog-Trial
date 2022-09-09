import { parseCookie } from "../../../cookieParser.js";
import { Login } from "../../../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";
import { checkAuth } from "../../../checkAuth.js";

const loginClass = new Login();

async function getUsers() {
	const { data, e } = await supabase
		.from("Users")
		.select("username")

	return data;
}

async function getFollowList() {
	const { data, e } = await supabase
		.from("Users")
		.select("*")

	return data;
}

/** @type {import('./$types').Load} */
export async function POST({ request }) {
	const cookie = request.headers.get("cookie");
	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase);

	if (!auth) {
		throw error("Not authorised");
	}

	const userData = await request.json()
	const username = userData.username

	const d1 = await getUsers()

	const user = d1.find((user) => user.username === username) || false;

	if (!user) {
		throw error(404, `${username} not found`)
	}

	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", auth);

  let followingList = data[0].followingList;

	const bool = followingList.includes(username)

	if(bool) {
		throw error(404, `${username} already followed`)
	}

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
