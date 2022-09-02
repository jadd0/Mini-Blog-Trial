import { supabase } from '../../../supabaseClient.js'

export const POST = async (event) => {
	const userData = await event.json()
	const { data, error } = await supabase.from("Posts").insert([
		{
			title: "Hello",
			body: "Poop",
			metadata: {
				description: "Puppy is slower than other, bigger animals.",
				price: 5.95,
				ages: [3, 6],
			},
		},
	]);

	console.log("POST", data, error)

	return new Response("hello");
};
