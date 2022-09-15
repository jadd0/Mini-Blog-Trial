import { SupabaseFeatures } from "../../../classes/supabaseFeatures.js";
import { Features } from "../../../classes/usefulFeatures.js";
import { error, redirect } from "@sveltejs/kit";
import { supabase } from "../../../supabaseClient.js";
import nodemailer from "nodemailer";

const supabaseClass = new SupabaseFeatures(supabase);
const features = new Features();

async function main() {
	// Generate test SMTP service account from ethereal.email
	// Only needed if you don't have a real mail account for testing
	// let testAccount = await nodemailer.createTestAccount();
	// create reusable transporter object using the default SMTP transport
}

/** @type {import('./$types').Load} */
export async function POST({ request }) {
	const cookie = features.parseCookie(request.headers.get("cookie"));

	if (cookie.key == undefined) {
		throw error(401, "Not authorised");
	}

	const auth = await supabaseClass.checkKey(cookie.key);

	if (!auth) {
		throw error(401, "Not authorised");
	}

	var transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "jaddblog@zohomail.eu",
      pass: "j6tUNB9mfi05",
    },
  });

	console.log("created");
	await transporter.sendMail({
		from: "jaddblog@zohomail.eu",
		to: "jaddalkhabbaz@gmail.com",
		subject: "hello world!",
		text: "hello world!",
	});

	return new Response(200);
}
