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

	let users = await supabaseClass.getAllUsernames();
	const req = await request.json();
	const lowerQuery = (req.query).toLowerCase();

	// TODO If the search query is empty, return 10 random users

	const items = users.filter((user) => ((user.username).toLowerCase()).indexOf(lowerQuery) !== -1)
	.map((a) => a.username)
	.slice(0, 15)

	return new Response(JSON.stringify({ data: items }));
}