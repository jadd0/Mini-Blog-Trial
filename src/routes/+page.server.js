import { supabase } from "../supabaseClient.js";

export const load = async() => {
	const { data, error } = await supabase.from("Posts").select("*");
  console.log(data)

  
	return {
    data: data.reverse()
  }
};
