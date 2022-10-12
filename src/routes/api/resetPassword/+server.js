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

	// 15 minutes
	const time = 900000
	const code = features.genetateToken(40, time)
	
  const email = await features.sendEmail(body.email, 'resetPassword', code)

  if (!email) {
		return new Response("Sorry, there has been an issue sending the email. Please try again later. If this issue persists, please email me jaddalkwork@gmail.com", { status: 500 });
  }

	const resKey = await supabaseClass.changeResetKey(res.username, code)
	if (!resKey) {
		return new Response("Sorry, there has been an issue changing your reset key. Please try again later. If this issue persists, please email me jaddalkwork@gmail.com", { status: 500 });
	}

	return new Response("Email sent", { status: 200 });
}