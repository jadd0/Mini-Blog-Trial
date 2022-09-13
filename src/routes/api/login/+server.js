import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { supabase } from "../../../supabaseClient.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();
	const username = body.username;
	const password = body.password;

	const auth = await supabaseClass.authenticate(username, password);


	if (!auth) {
		return new Response("Invalid credentials", { status: 406 });
	}

	const key = features.genetateToken()
	
	const res = await supabaseClass.changeKey(auth, key)

	if (!res) {
		return new Response("Invalid credentials", { status: 406 });
	}
	
	const cookie = features.generateCookie(key);
	return new Response('Redirect', {
		status: 200,
		headers: { 'set-cookie': cookie,
		Location: "/newpost" },
	});
}