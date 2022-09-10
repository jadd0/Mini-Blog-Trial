import { SupabaseFeatures } from "../../classes/supabaseFeatures.js";
import { Features } from "../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../supabaseClient.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

/** @type {import('./$types').Load} */
export async function load({ request }) {
  const cookie = request.headers.get("cookie");
	const auth = await features.checkAuth(supabaseClass, cookie)

	if (!auth) {
		throw redirect(307, "/login");
	}

	return {
		username: auth
	}
}