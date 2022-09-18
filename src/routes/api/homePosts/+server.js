import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";


const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()


/** @type {import('./$types').Load} */
export async function GET({ request }) {
	const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw error(401, "Not authorised")
	}

	const auth = await supabaseClass.checkKey(cookie.key)
	
	if (!auth) {
		throw error(401, "Not authorised")
	}

	const user = await supabaseClass.getUser(auth)
	// let user = await supabaseClass.getPosts(auth)

  const followingList = user.followingList || []

	let posts = []
  for(let i = 0; i < followingList.length; i++) {
    posts.push(await supabaseClass.getPosts(followingList[i]))
  }

  let newPosts = [].concat(...posts);

	newPosts.sort(function(a, b) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});	

	return new Response(JSON.stringify({ data: newPosts.reverse() }));
	// return new Response(JSON.stringify({ data: user }));
}