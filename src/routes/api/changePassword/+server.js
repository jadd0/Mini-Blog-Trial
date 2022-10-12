import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { supabase } from "../../../supabaseClient.js";
import bcryptjs from 'bcryptjs';

const supabaseClass = new SupabaseFeatures(supabase, bcryptjs);
const features = new Features();

async function checkKey(username, code) {
  const user = await supabaseClass.getUser(username)
  console.log(user)
  if (code === user.keys.passwordReset) {
    return true
  }
  return false
}

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();
  const res = await checkKey(body.username, body.code)

  if (!res) return new Response("Reset code invalid", { status: 401 });

  const hashedPassword = await features.hashPassword(bcryptjs, body.password)
	const res1 = await supabaseClass.changePassword(body.username, hashedPassword)
  const res2 = await supabaseClass.changeResetKey(body.username, '')

  if (!res1) return new Response("There has been an error whilst resetting your password. Please try again later. If this error persists please email me jaddalkwork@gmail.com", { status: 500 });



	return new Response("Password changed", { status: 200 });
}