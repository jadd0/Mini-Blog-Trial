import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from '../../../classes/supabaseFeatures.js'
import { Features } from '../../../classes/usefulFeatures.js'

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

export async function POST({ request }) {
	const req = await request.json();
	(req)
	const res = await supabaseClass.signUp(req)

	if (!res) {
		return new Response('User with email/username already exists', {status: 401})
	}

	
	const cookie = features.generateCookie(req.username, req.password);

	return new Response('Redirect', {
		status: 200,
		headers: { 'set-cookie': cookie,
		Location: "/newpost" },
	});
}