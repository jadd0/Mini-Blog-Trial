import { supabase } from "../../../supabaseClient.js";

export const POST = async (event) => {
	const { data, error } = await supabase.from("Posts").select("*");

	return new Response(JSON.stringify(data))
};
