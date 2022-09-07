import { parseCookie } from "../../cookieParser.js";

/** @type {import('./$types').Load} */
export async function load({ request }) {
  const cookie = request.headers.get("cookie");
	const jwtName = parseCookie(cookie).jwt
	const username = jwtName.replaceAll('"','')

	// console.log(username)
	return {
		username: username
	}
}