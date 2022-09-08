import { parseCookie } from "../../cookieParser.js";

/** @type {import('./$types').Load} */
export async function load({ request }) {
  const cookie = request.headers.get("cookie");

	const jwtName = parseCookie(cookie)
  const username = ''

	if (jwtName.jwt != undefined) {
    jwtName.jwt.replaceAll('"','')
  }

	// console.log(username)
	return {
		username: username
	}
}