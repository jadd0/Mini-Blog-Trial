import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from '../../../classes/supabaseFeatures.js'

const supabaseClass = new SupabaseFeatures(supabase);


export async function POST({ request }) {
	const req = await request.json();

	const res = await supabaseClass.signUp(req)

	if (!res) {
		return new Response('User with email/username already exists', {status: 401})
	}

	return new Response("Success, user created")
}