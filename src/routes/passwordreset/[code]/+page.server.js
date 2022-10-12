import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()

async function checkKey(username, code) {
  const user = await supabaseClass.getUser(username)

  if (code === user.keys.passwordReset) {
    return true
  }
  return false
}

export const load = async({ request, params }) => {
  const cookie = features.parseCookie(request.headers.get("cookie"));
  const username = params.code.split('.')[0]

  const res = await checkKey(username, params.code)
  if (!res) throw new Error('Reset code invalid')

  let username1 = ''
  let auth = ''

	if (cookie.key != undefined) {
    auth = await supabaseClass.checkKey(cookie.key)
	}
  if (!auth) {
    username1 = ''
  }
  else {
    username1 = auth
  }

	return {
    username: username
  }
};
