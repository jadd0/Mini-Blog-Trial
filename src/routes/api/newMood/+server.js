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
	const res = await supabaseClass.newMood(req.mood, req.text, auth);
	
  if (!res) throw error(500, `There has been an error posting this mood. Please try again later. If this issue persists, please email jaddalkwork@gmail.com`)

	return new Response(`Mood posted successfully`)
}
