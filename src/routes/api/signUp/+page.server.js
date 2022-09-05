import { supabase } from "../../../supabaseClient.js";

async function checkAvailability(username, email) {
	const { data, error } = await supabase.from("Users").select("*");

	console.log("data", data)

	const h =[]


	console.log(username)
	const usernameAvailability = data.find((user) => user.username == username);

	const emailAvailability = data.find((user) => user.email === email);

	console.log(usernameAvailability)

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
		return new Response("hello")
	}

	signUp(req)

	return new Response(JSON.stringify({status: 200}))

  // console.log(checkAvailability()
}
// 	const user = userList.find((user) => user[params] === body);

// 	console.log(user);
// 	if (user == undefined) {
// 		return {
// 			staus: 200,
// 			body: { param: params },
// 		};
// 	}
        
// 	return {
// 		status: 406,
// 		body: { param: params },
// 	};
// }

// throw new Error("@migration task: Update +server.js (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");

// import { list } from '../../../store.js';
// import { User } from '../../../classes/userClass.js'
// import { Auth } from '../../../classes/userAuth.js';
// import { FriendList } from '../../../classes/friendList.js'
// import { CreateFriend } from '../../../classes/makeFriend.js';

// const auth = new Auth(User);

// let userList = [];

// list.subscribe(value => {
// 	userList = value
// });


// /** @type {import('./$types').RequestHandler} */
// export async function post({ request }) {
// 	const req = await request.json();
// 	const obj = {
// 		FriendList: FriendList,
// 		userList: userList,
// 		CreateFriend: CreateFriend
// 	}
// 	const returnedVal = auth.createUser({ req }, { obj });

// 	if (returnedVal.username !== undefined) {
// 		return {
// 			status: 406,
// 			body: { error: "username taken" }
// 		}
// 	} else if (returnedVal.email !== undefined) {
// 		return {
// 			status: 406,
// 			body: { error: "email taken" }
// 		}
// 	} else if (returnedVal.phoneNumber !== undefined) {
// 		return {
// 			status: 406,
// 			body: { error: "phone number taken" }
// 		}
// 	}

// 	userList.push(returnedVal.user)
// 	list.set([...userList])

// 	// console.log(returnedVal.user)
	
// 	return {
// 		headers: {'set-cookie': auth.generateCookie(returnedVal.user, 3)},
// 		status: 200,
// 		body: { status: `user ${returnedVal.user.username} added to the database`}
// 	}
// }