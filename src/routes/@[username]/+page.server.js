import { supabase } from "../../supabaseClient.js";
import { SupabaseFeatures } from "../../classes/supabaseFeatures.js";
import { Features } from "../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";

const features = new Features();
const supabaseClass = new SupabaseFeatures(supabase);

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw redirect(307, "/login");
	}

	const auth = await supabaseClass.checkKey(cookie.key)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

  const user = await supabaseClass.getUser(params.username)

	if (!user) {
		throw error(404, "No user found");
	}
	let bool = false
	const followingList = await supabaseClass.getUser(auth)

	try {
		bool = followingList.followingList.includes(params.username)
	}
	catch {
		bool = false
	}

	if (auth == params.username) {
		bool = 'self'
	}

	const posts = await supabaseClass.getPosts(params.username)

	return {
		user: user,
		data: (posts.reverse()),
		username: auth,
		bool: bool
	};
}