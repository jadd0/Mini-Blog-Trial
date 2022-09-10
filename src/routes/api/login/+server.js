import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { supabase } from "../../../supabaseClient.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

async function login(username, password) {
	const authBool = await loginClass.authenticate(
		supabase,
		username,
		password
	);

	return authBool;
}

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();
	const username = body.username;
	const password = body.password;

	const auth = await supabaseClass.authenticate(username, password);

	if (!auth) {
		return new Response("Invalid credentials", { status: 406 });
	}

	const cookie = features.generateCookie(username, password);

	return new Response('Redirect', {
		status: 200,
		headers: { 'set-cookie': cookie,
		Location: "/newpost" },
	});
}