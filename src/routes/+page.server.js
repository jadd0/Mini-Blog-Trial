import { supabase } from "../supabaseClient.js";
import { parseCookie } from "../cookieParser.js";

export const load = async({ request }) => {
  const cookie = request.headers.get("cookie");
	const { data, error } = await supabase.from("Posts").select("*");
  console.log(data)

  const jwtName = parseCookie(cookie).jwt
	const username = jwtName.replaceAll('"','')

	// console.log(username)
  
	return {
    data: data.reverse(),
    username: username
  }
};
