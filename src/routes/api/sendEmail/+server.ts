import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { user } from "../../stores/objects";
import nodemailer from "nodemailer";
import { error } from "@sveltejs/kit";

const User = get(user)

/** @type {import('./$types').Load} */
export async function POST({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

	let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "jaddblog@zohomail.eu",
      pass: "j6tUNB9mfi05",
    },
  });

	await transporter.sendMail({
		from: "jaddblog@zohomail.eu",
		to: "jaddalkhabbaz@gmail.com",
		subject: "hello world!",
		text: "hello world!",
	});

	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ key: auth.newKey }));
}
