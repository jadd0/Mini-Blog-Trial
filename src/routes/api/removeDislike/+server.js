import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";


const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()


/** @type {import('./$types').Load} */
export async function POST({ request }) {
	const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw error(401, "Not authorised")
	}

	const auth = await supabaseClass.checkKey(cookie.key)
	
	if (!auth) {
		throw error(401, "Not authorised")
	}

	const req = await request.json();
	const res = await supabaseClass.removeDislike(req.id, auth);

  if (!res) throw error(404, `There has been an error removing dislike on post ${req.id}. This post may not exist or may not be disliked by @${auth}. Please try again later.`)

	return new Response(`Removed dislike on post number ${req.id} successfully`)
}
