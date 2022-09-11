import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js"
import { Features } from "../../../classes/usefulFeatures.js";
import { redirect } from "@sveltejs/kit";

// import {AES} from "crypto-js"

// const encrypted = AES.encrypt("hd", "test");

// // U2FsdGVkX18MugnsWY2fNlAnrk2+vL5ma7R4uNpFJuk=
// // U2FsdGVkX187xA943AsOlLfc5oR+LSYZ/JuF3pb303U=
// console.log(encrypted.toString());


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
	let comments = data.comments || []

	comments.sort(function(a, b) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});

	return {
		returnData,
		username: auth,
		id: params.post,
		comments: (comments.reverse())
	}
}
