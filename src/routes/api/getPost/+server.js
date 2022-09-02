import { supabase } from '../../../supabaseClient.js'

export const POST = async (event) => {
	const { data, error } = await supabase.from("Posts").select("*");
	console.log(JSON.stringify(data, null, 2));

	console.log("POST", data, error)

	return new Response("hello");
};
