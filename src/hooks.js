// import { Login } from "./classes/login.js";

// const login = new Login();

// function newpostRoute(cookieList) {
	
// 	// (cookie)
// 	const cookieObj = parseCookie(cookieList);
//   (cookieObj.jwt)
// 	if (!cookieObj) {
// 		return false
// 	}

//   const jwt = JSON.parse(cookieObj.jwt)

// 	const auth = login.authenticate(jwt.username, jwt.password);

// 	if (!auth) {
// 		return false
// 	}

//   return true
// }

// export const handle = async ({ event, resolve }) => {
// 	const url = event.request.url.split("/");
// 	const response = await resolve(event);
//   // (response)
//   // (await resolve(event))
// 	// if (url[3] === "newpost" && url[4] !== "login") {
//   //   const cookieList = event.request.headers.get("cookie");
//   //   // (cookieList)
//   //   const res = newpostRoute(cookieList)
//   //   (res)
//   //   if (!res) {
//   //     return new Response("Redirect", {
//   //       status: 303,
//   //       headers: { Location: "/login" },
//   //     }); 
//   //   }
// 	// }
//   return response
// };

// export const getSession = async ({ locals }) => {
//   ("locals: ",locals)
//   ("dfdfdf")
//   if (!locals.user) {
//     return {}
//   }

//   return {
//     user: {
//       username: locals.user.username
//     }
//   }
// }
