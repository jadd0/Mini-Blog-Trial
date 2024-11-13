import nodemailer from 'nodemailer';

async function sendEmailToClient(email: string, name: string, enquiry: string, transport) {
	const mailOptions = {
		from: 'jaddalkwork@gmail.com',
		to: `${email}`,
		subject: 'Contact Me',
		html: `<h1>Hey, ${name}</h1>
		<br/>
		<p>Thank you for contacting me. I will endeavour to reply as soon as possible.
		<br/>
		This is an automated service, please do not reply to this email.
		<br/>
		Thanks, Jadd.
		<br/>
		<br/></p>`
	};
	
	transport.sendMail(mailOptions, function (err, info) {
		console.log(err, info);
		if (err) {
			return false;
			console.log(err)
		}
	});

	return true;
}

async function sendEmailToMe(email: string, name: string, enquiry: string, transport) {
	const mailOptions = {
		from: 'jaddlive@jaddblog.com',
		to: 'jaddalkwork@gmail.com',
		subject: 'New Contact!',
		html: `<h1>From ${name}</h1>
		<br/>
		<p>Enquiry: ${enquiry}
		<br/>
		<br/>
		Email: ${email}
		<br/>
		<br/></p>`
	};
	
	transport.sendMail(mailOptions, function (err, info) {
		if (err) {
			return false;
			console.log(err)
		}
	});

	return true;
}

async function setUp(email, name, enquiry) {
	const user = process.env.VITE_NODEMAILER_EMAIL || import.meta.env.VITE_NODEMAILER_EMAIL;
	const pass = process.env.PASSWORD || import.meta.env.VITE_NODEMAILER_PASSWORD;

	let transport = nodemailer.createTransport({
		host: 'smtp-relay.sendinblue.com',
		port: 587,
		auth: {
			user,
			pass
		}
	});

	transport.verify(function (error, success) {
		if (error) {
			return 'auth';
			console.log(error)
		}
	});

	if(!sendEmailToMe(email, name, enquiry, transport)) {
		return false;
	}

	if(!sendEmailToClient(email, name, enquiry, transport)) {
		return false;
	}
}

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();

	if (!body.email || !body.name || !body.enquiry) {
		return new Response('Please provide an email, name and enquiry', {
			status: 401
		})
	}

	const email = await setUp(body.email, body.name, body.enquiry);
	
	if (!email) {
		return new Response(
			'Sorry, there has been an issue sending the email. Please try again later. If this issue persists, please email me jaddalkwork@gmail.com',
			{ status: 500 }
		);
	}

	return new Response('Email sent', { status: 200 });
};
