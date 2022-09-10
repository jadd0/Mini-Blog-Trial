import { supabase } from "../../supabaseClient.js";
import { SupabaseFeatures } from "../../classes/supabaseFeatures.js";
import { Features } from "../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";

const features = new Features();
const supabaseClass = new SupabaseFeatures(supabase);

// async function checkUser(username) {
// 	const { data, e } = await supabase
// 		.from("Users")
// 		.select("*")
// 		.eq("username", username);
	
// 	if (data.length == 0) {
// 		return false
// 	}

// 	return data
// }

async function isFollowed(auth, username) {
	

	return followingList
}

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");
	const auth = await features.checkAuth(supabaseClass, cookie)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

  const user = await supabaseClass.getUser(params.username)

	if (!user) {
		throw error(404, "No user found");
	}

	const followingList = await supabaseClass.getUser(auth)

	const bool = followingList.followingList.includes(params.username)
	const posts = await supabaseClass.getPosts(params.username)

	return {
		user: user,
		data: (posts.reverse()),
		username: auth,
		bool: bool
	};
}