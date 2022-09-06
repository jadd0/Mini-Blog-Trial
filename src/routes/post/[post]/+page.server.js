import { error } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";

/** @type {import('./$types').Load} */
export async function load({ params }) {
	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("id", params.post);

  if (data == undefined || data.length == 0) {
    throw error(404, 'No post found');
  }

	const returnData = data[0]
	return {
		returnData
	}
}
