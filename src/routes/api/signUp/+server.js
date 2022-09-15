import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from '../../../classes/supabaseFeatures.js'
import { Features } from '../../../classes/usefulFeatures.js'
import bcryptjs from 'bcryptjs';

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

export async function POST({ request }) {
	const req = await request.json();
	req.password = await features.hashPassword(bcryptjs, req.password);
	req.email = await features.hashPassword(bcryptjs, req.email);

	const res = await supabaseClass.signUp(req)

	if (!res) {
		return new Response('User with email/username already exists', {status: 401})
	}
	
	const key = features.genetateToken()
	const keyRes = await supabaseClass.changeKey(req.username, key)

	if (!res) {
		return new Response("Invalid credentials", { status: 406 });
	}
	
	const cookie = features.generateCookie(key);
	return new Response('Redirect', {
		status: 200,
		headers: { 'set-cookie': cookie,
		Location: "/" },
	});
}