import { supabase } from "../../../supabaseClient.js";

async function checkAvailability(username, email) {
	const { data, error } = await supabase.from("Users").select("*");

	const usernameAvailability = data.find((user) => user.username == username);

	const emailAvailability = data.find((user) => user.email === email);

	const userBool = usernameAvailability == undefined
	const emailBool = emailAvailability == undefined

	return {userBool, emailBool}
}

async function signUp(req) {
	const { data, error } = await supabase.from("Users").insert([
		{
			name: req.name,
			email: req.email,
			password: req.password,
			username: req.username
		}
	]);
}


export async function POST({ request }) {
	const req = await request.json();

	const availability = await checkAvailability(req.username, req.email)

	console.log(availability)

	if ((availability.emailBool == false) || (availability.emailBool == false)) {
		console.log("it is not available")
		return new Response('User with email/username already exists', {status: 401})
	}

	signUp(req)

	return new Response("Success, user created")

  // console.log(checkAvailability()
}