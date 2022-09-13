import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

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

	const data = await request.json();
	console.log(data);

	const res = await supabaseClass.newComment(data, auth);

	if (!res) {
		return new Response({ status: 404 });
	}

	return new Response({ status: 200 });
}
