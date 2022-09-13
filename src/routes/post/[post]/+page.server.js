import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js"
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";

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

	const data = await supabaseClass.getPost(params.post)
	
	if (!data) {
		throw error(404, "No post found");
	}
	let bool = false
	if (auth == data.a) {
		bool = true
	}

  if (data == undefined || data.length == 0) {
    throw error(404, 'No post found');
  }

	const returnData = data
	let comments = data.comments || []

	comments.sort(function(a, b) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});

	return {
		bool,
		returnData,
		username: auth,
		id: params.post,
		comments: (comments.reverse())
	}
}
