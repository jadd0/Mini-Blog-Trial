import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";


const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()


/** @type {import('./$types').Load} */
export async function POST({ request }) {
	const cookie = request.headers.get("cookie");

	const auth = await features.checkAuth(supabaseClass.authenticate, cookie);


	if (!auth) {
		throw error(401, "Not authorised");
	}

	let users = supabaseClass.getAllUsernames();
	const req = await request.json();

	const items = users.filter((user) => user.indexOf(req.query) !== -1);

	return new Response(JSON.stringify({ data: items }));
}