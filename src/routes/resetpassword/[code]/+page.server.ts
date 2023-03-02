import { supabase } from "../../../supabaseClient.js";
import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error } from "@sveltejs/kit";

// NOT DONE YET

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()

async function checkKey(username, code, time) {
  const user = await supabaseClass.getUser(username)
  if (code === user.keys.passwordReset) {
    if (time < new Date().getTime()) {
      supabaseClass.changeResetKey(username, '')
      throw error(404, 'Reset code invalid')
    }

    return true
  }
  return false
}

export const load = async({ request, params }) => {
  const cookie = features.parseCookie(request.headers.get("cookie"));
  const username = params.code.split('.')[0]
  const time = params.code.split('.')[1]

  const res = await checkKey(username, params.code, time)
  if (!res) throw error(404, 'Reset code invalid')


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
    code: params.code,
    username: username1,
    passwordUsername: username
  }
};
