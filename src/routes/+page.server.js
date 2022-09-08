import { supabase } from "../supabaseClient.js";
import { parseCookie } from "../cookieParser.js";

export const load = async({ request }) => {
  const cookie = request.headers.get("cookie");
	const { data, error } = await supabase.from("Posts").select("*");
  
  const jwtName = parseCookie(cookie)
  console.log(jwtName)
  let username = ''

	if (jwtName.jwt != undefined) {
    username = jwtName.jwt.replaceAll('"','')
  }


	console.log(username)
  
	return {
    data: data.reverse(),
    username: username
  }
};
