import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
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

	const userData = await request.json();

	const res = await supabaseClass.createPost(userData, auth);

	if (res) return new Response("Posted successfully")
	throw error(500, "There has been an issue posting. Please try again later. If this issue persists please email me at jaddalkwork@gmail.com")
}
