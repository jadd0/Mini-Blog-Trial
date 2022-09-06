import { supabase } from "../../supabaseClient.js";
import { error } from "@sveltejs/kit";

async function checkUser(username) {
	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", username);
	
	if (data.length == 0) {
		return false
	}

	return true
}

export const load = async ({ params }) => {
	const user = await checkUser(params.username)
	
	if (!user) {
		throw error(404, "No user found");
	}

	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("a", params.username);

	if (data.length == 0) {
		throw error(404, "No posts found");
	}

	return {
		data: (data.reverse()),
	};
};
