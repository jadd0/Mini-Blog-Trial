import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js"
import { Features } from "../../../classes/usefulFeatures.js";
import { redirect } from "@sveltejs/kit";

const features = new Features();
const supabaseClass = new SupabaseFeatures(supabase);

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");
	const auth = await features.checkAuth(supabaseClass, cookie)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

	const data = await supabaseClass.getPost(params.post)

  if (data == undefined || data.length == 0) {
    throw error(404, 'No post found');
  }

	const returnData = data

	return {
		returnData,
		username: auth
	}
}
