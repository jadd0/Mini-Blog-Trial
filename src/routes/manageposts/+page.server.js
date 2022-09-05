import { supabase } from "../supabaseClient.js";

export const load = async () => {
	const { data, error } = await supabase.from("Posts").select("*")
  .eq('uuid', );

	return {
		data: data.reverse(),
	};
};
