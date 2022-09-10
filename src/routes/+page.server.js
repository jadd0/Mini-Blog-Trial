import { supabase } from "../supabaseClient.js";
import { parseCookie } from "../cookieParser.js";
import { Login } from "../classes/login.js";
import { redirect } from "@sveltejs/kit";
import { checkAuth } from "../checkAuth.js";

const loginClass = new Login();

async function getPosts(username) {
	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("a", username);
	
	(data)

	return data
}

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");
	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", auth);

  let posts = []
  const followingList = data[0].followingList

  // await followingList.forEach(async(i) => {
  for(let i = 0; i < followingList.length; i++) {
    posts.push(await getPosts(followingList[i]))
  }

  let newPosts = [].concat(...posts);

	newPosts.sort(function(a, b) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});

	return {
		data: (newPosts.reverse()),
		username: auth,
	};
}