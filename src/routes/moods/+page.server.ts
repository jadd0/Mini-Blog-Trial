import { supabase } from "../../supabaseClient.js";
import { SupabaseFeatures } from "../../classes/supabaseFeatures.js"
import { Features } from "../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";

// NOT DONE YET

const features = new Features();
const supabaseClass = new SupabaseFeatures(supabase);

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw redirect(307, "/login");
	}

	const auth = await supabaseClass.checkKey(cookie.key)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

  const data = await supabaseClass.getMoods(auth) || []
	
  return {
    data,
    username: auth
  }
}
