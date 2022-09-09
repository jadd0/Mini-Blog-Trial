// import { supabase } from "../supabaseClient.js";
// import { parseCookie } from "../cookieParser.js";

// export const load = async({ request }) => {
//   const cookie = request.headers.get("cookie");
// 	const { data, error } = await supabase.from("Posts").select("*");
  
//   const jwtName = parseCookie(cookie)

//   let username = ''
//   try {
//     const jwt = JSON.parse(jwtName.jwt)
//     username = jwt.username
//   }
//   catch {
//     username = ''
//   } 


// 	// console.log(jwt)
  
// 	return {
//     data: data.reverse(),
//     username: username
//   }
// };


import { supabase } from "../supabaseClient.js";
import { parseCookie } from "../cookieParser.js";
import { Login } from "../classes/login.js";
import { error, redirect } from "@sveltejs/kit";
import { checkAuth } from "../checkAuth.js";
import { each } from "svelte/internal";

const loginClass = new Login();

async function getPosts(username) {
	const { data, e } = await supabase
		.from("Posts")
		.select("*")
		.eq("a", username);
	
	console.log(data)

	return data
}

/** @type {import('./$types').Load} */
export async function load({ request, params }) {
  const cookie = request.headers.get("cookie");
	const auth = await checkAuth(parseCookie, loginClass, cookie, supabase)
	
	if (!auth) {
		throw redirect(307, "/login");
	}

	const { data, e } = await supabase
		.from("Users")
		.select("*")
		.eq("username", auth);

  let posts = []
  const followingList = data[0].followingList

  // await followingList.forEach(async(i) => {
  for(let i = 0; i < followingList.length; i++) {
    posts.push(await getPosts(followingList[i]))
  }

  console.log(posts)
  
	return {
		data: (posts.reverse()),
		username: auth,
	};
}