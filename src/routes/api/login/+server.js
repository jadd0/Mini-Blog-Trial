import { Login } from "../../../classes/login.js";

const login = new Login();

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request, error }) => {
	const body = await request.json();

	const username = body.username;
	const password = body.password;
  
  let serverResponse = new Response
	const res = login.authenticate(username, password);
	// if successful returns cookie

	if (!res) {
    // serverResponse.status.set(406)
		// return new Response({
    //   status: 401
    // });
    return new Response('Invalid credentials', {status: 406})
	}


	const cookie = login.generateCookie();
	
	serverResponse.headers.append('set-cookie', cookie)
	console.log(serverResponse.headers)
  
	// serverResponse.status = 303
  // console.log(serverResponse.headers);
	// return new Response("Redirect", {
  //   cookies: cookie,
	// 	status: 303,
	// 	headers: { Location: "/protected" },
	// });
	// Response.headers.set('set-cookie', response)

	return serverResponse;
};
