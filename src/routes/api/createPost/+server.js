const { data, error } = await supabase.from("books").insert([
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
