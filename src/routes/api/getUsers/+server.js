import { supabase } from "../../../supabaseClient.js";

export async function POST({ request }) {
	const { data, error } = await supabase.from("Users").select("*");

  const req = await request.json()

  // console.log(req)

	// console.log(data);

  let copy = [...data]

	const items = copy
		.filter((user) => user.username.indexOf(req.query) !== -1)
		.map((a) => a.username);
	// console.log(items)

 
	return new Response(JSON.stringify({data: items}));
}
