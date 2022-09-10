import { supabase } from "../../supabaseClient.js";
import { SupabaseFeatures } from "../../classes/supabaseFeatures.js";
import { Features } from "../../classes/usefulFeatures.js";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features()

export const load = async({ request }) => {
  const cookie = request.headers.get("cookie");  
  const auth = features.checkAuth(supabaseClass, cookie)

  let username = ''

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
