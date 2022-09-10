import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";


const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()


/** @type {import('./$types').Load} */
export async function POST({ request }) {
	const cookie = request.headers.get("cookie");

	const auth = await features.checkAuth(supabaseClass, cookie);


	if (!auth) {
		throw error(401, "Not authorised");
	}

	let users = await supabaseClass.getAllUsernames();
	const req = await request.json();
	console.log(users)
	const items = users.filter((user) => user.username.indexOf(req.query) !== -1)
	.map((a) => a.username)

	return new Response(JSON.stringify({ data: items }));
}