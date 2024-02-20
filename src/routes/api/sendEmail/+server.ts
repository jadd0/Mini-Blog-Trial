import nodemailer from 'nodemailer'

async function sendEmail(email: string, name: string, enquiry: string) {
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
			}
		});

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
			console.log(err, info)
			if (err) {
				return false;
			}
		});

		return true;
	}

/** @type {import('./__types/[id]').RequestHandler} */
export const POST = async ({ request }) => {
	const body = await request.json();

	const email = await sendEmail(body.emaik, body.name, body.enquiry);

	if (!email) {
		return new Response(
			'Sorry, there has been an issue sending the email. Please try again later. If this issue persists, please email me jaddalkwork@gmail.com',
			{ status: 500 }
		);
	}

	return new Response('Email sent', { status: 200 });
};
