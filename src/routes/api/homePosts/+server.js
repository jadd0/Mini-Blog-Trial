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
  const followingList = user.followingList || []	

  const data = await supabaseClass.getPostsFromList(followingList)

  if (!data) {
    throw error(500, `There has been an issue fetching posts from followed users of ${auth}. Please try again later`)
  }

	return new Response(JSON.stringify({ data: data.reverse() }));
}