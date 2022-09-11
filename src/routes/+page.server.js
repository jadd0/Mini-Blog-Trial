import { supabase } from "../supabaseClient.js";
import { SupabaseFeatures } from "../classes/supabaseFeatures.js"
import { Features } from "../classes/usefulFeatures.js";
import { redirect } from "@sveltejs/kit";

const features = new Features();
const supabaseClass = new SupabaseFeatures(supabase);

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");
	const auth = await features.checkAuth(supabaseClass, cookie)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

	const user = await supabaseClass.getUser(auth)

  let posts = []
  const followingList = user.followingList || []

  for(let i = 0; i < followingList.length; i++) {
    posts.push(await supabaseClass.getPosts(followingList[i]))
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