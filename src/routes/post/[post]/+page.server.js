import { error } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";

/** @type {import('./$types').Load} */
export async function load({ params }) {
	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("id", params.post);

  if (data == undefined) {
    throw error(404, 'No post found');
  }
	// if (cookieList.jwt == undefined) {
	//   throw redirect(307, "/protected/login");
	// }

	const returnData = data[0]
	return {
		returnData
	}
}
