import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { supabase } from "../../../supabaseClient.js";
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';

const supabaseClass = new SupabaseFeatures(supabase, bcryptjs);
const features = new Features(nodemailer);

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();
  const res = await supabaseClass.getEmail(body.username, body.email)

  if (!res) {
    return new Response("Invalid email/username", { status: 401 });
  }

  const email = await features.sendEmail(body.email, 'resetPassword')

  if (email) {
    return new Response("Email sent", { status: 200 });
  }

  // return new Response("Issue", { status: 406 });
	// const auth = await supabaseClass.authenticate((username).toLowerCase(), password);

	// if (!auth) {
	// 	return new Response("Invalid credentials", { status: 406 });
	// }

	// const key = features.genetateToken()
	
	// const res = await supabaseClass.changeKey(auth, key)

	// if (!res) {
	// 	return new Response("Invalid credentials", { status: 406 });
	// }
	
	// const cookie = features.generateCookie(key);
	// return new Response('Redirect', {
	// 	status: 200,
	// 	headers: { 'set-cookie': cookie,
	// 	Location: "/" },
	// });
}