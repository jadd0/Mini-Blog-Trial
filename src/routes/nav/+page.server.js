// import { parseCookie } from "../../cookieParser.js";
// import { Login } from "../../classes/login.js";
// import { error, redirect } from "@sveltejs/kit";
// import { supabase } from "../../supabaseClient.js";
// import { checkAuth } from "../../checkAuth.js";

// const loginClass = new Login();


// /** @type {import('./$types').Load} */
// export async function load({ request, params }) {
//   ("GEKKFUHFU")
//   const cookie = request.headers.get("cookie");

// 	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)

// 	if (!auth) {
// 		return false
// 	}

//   const jwtName = parseCookie(cookie).jwt
// 	const username = jwtName.replaceAll('"','')

//   (auth)

// 	return {
// 		username: username
// 	}
// }
