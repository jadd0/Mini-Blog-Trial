import { supabase } from "../../supabaseClient.js";
import { SupabaseFeatures } from "../../classes/supabaseFeatures.js";
import { Features } from "../../classes/usefulFeatures.js";
import bcrypt from 'bcrypt';

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()

export const load = async({ request }) => {
  const cookie = features.parseCookie(request.headers.get("cookie"));

  let username = ''
  let auth = ''

	if (cookie.key != undefined) {
    auth = await supabaseClass.checkKey(cookie.key)
	}

  if (!auth) {
    username = ''
  }
  else {
    username = auth
  }

	return {
    username: username
  }
};
