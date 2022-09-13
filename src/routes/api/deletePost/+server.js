import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";


const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()


/** @type {import('./$types').Load} */
export async function POST({ request }) {
	const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw error(401, "Not authorised")
	}

	const auth = await supabaseClass.checkKey(cookie.key)
	
	if (!auth) {
		throw error(401, "Not authorised")
	}

  const req = await request.json()

  const post = await supabaseClass.getPost(req.id)

  if (!post) {
    throw error(404, "No post with id", req.id)
  }

  if (post.a != auth) {
    throw error(403, "Not authorised to delete post with id", post.id)
  }

	const res = await supabaseClass.deletePost(req.id);

  if (!res) {
    throw error(500, 'Server error, please try again later')
  }
	return new Response("Deleted successfully")
}
