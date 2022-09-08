import { supabase } from "../supabaseClient.js";
import { parseCookie } from "../cookieParser.js";

export const load = async({ request }) => {
  const cookie = request.headers.get("cookie");
	const { data, error } = await supabase.from("Posts").select("*");
  
  const jwtName = parseCookie(cookie)

  let username = ''
  try {
    const jwt = JSON.parse(jwtName.jwt)
    username = jwt.username
  }
  catch {
    username = ''
  } 


	// console.log(jwt)
  
	return {
    data: data.reverse(),
    username: username
  }
};
