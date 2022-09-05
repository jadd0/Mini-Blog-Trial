import { supabase } from "../../supabaseClient.js";

export const load = async ({ params }) => {
  const { data, e } = await supabase
			.from("Posts")
			.select('*')
			.eq('a', params.username)
			// .eq('jadd')
			// .eq("metadata", '20');

  console.log(data)

	// return {
	// 	data: data,
	// };
};
