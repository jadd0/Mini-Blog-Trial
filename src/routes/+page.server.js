import { supabase } from "../supabaseClient.js";

export const load = async() => {
	const { data, error } = await supabase.from("Posts").select("*");

	return {
    data: data.reverse()
  }
};
