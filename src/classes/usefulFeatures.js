export class Features {
	constructor(nodemailer) {
		this.nodemailer = nodemailer;
	}

	parseCookie(cookieList) {
		const result = {};
		let jwt = "";
		try {
			cookieList = cookieList.split("; ");

			for (let i in cookieList) {
				const cur = cookieList[i].split("=");
				result[cur[0]] = cur[1];
			}
		} catch {
			return false;
		}

		return result;
	}

	async hashPassword(bcrypt, plaintextPassword) {
		const hash = await bcrypt.hash(plaintextPassword, 10);
		return hash;
	}

	genetateToken(length, time) {
		const alphNumString =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		// 1.5 days
		const days = time || 129600000;
		const expire = new Date().getTime() + days;
		let key = "";

		for (let i = 0; i < (length || 40); i++) {
			key +=
				alphNumString[Math.floor(Math.random() * alphNumString.length)];
		}

		key = `${expire}.${key}`;

		return key;
	}

	//expires in 2 days
	generateExpiry() {
		const date = new Date();
		const days = 1.5;
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

		return date;
	}

	//every request, change token
	generateJWT(username) {
		const data = {
			username: username,
			token: this.genetateToken(),
		};

		return data;
	}

	generateCookie(key) {
		const cookie = `key=${key}; path=/; Expires=${this.generateExpiry()}; HostOnly=false; Secure=lax; httpOnly=true; SameSite=Strict;`;

		return cookie;
	}

	async sendEmail(email, username, area, code, time) {
		const user = process.env.VITE_NODEMAILER_EMAIL || import.meta.env.VITE_NODEMAILER_EMAIL
		const pass = process.env.PASSWORD || import.meta.env.VITE_NODEMAILER_PASSWORD

		time = new Date(time).toLocaleTimeString("en-GB", {
			hour: "numeric",
			minute: "numeric",
		})

		let transport = this.nodemailer.createTransport({
			host: "smtp-relay.sendinblue.com",
			port: 587,
			auth: {
				user,
				pass,
			},
		});

		transport.verify(function (error, success) {
			if (error) {
				return 'auth'
			}
		});

		const mailOptions = {
			from: "jaddblog@jaddblog.com",
			to: email,
			subject: area,
			html: `<h1>Hey, ${username}!</h1>
			<br/>
			<p>You requested a link to reset your password, so just click this link below to do so.
			<br/>
			<br/>
			https://jadd.live/resetpassword/${username}.${code}
			<br/>
			<br/>
			This link will expire automatically after 15 minutes, at ${time}.
			If you did not request a link to reset your password, please contact me as soon as possible at jaddalkwork@gmail.com
			<br/>
			<br/>
			Thank you!</p>`,
		};

		transport.sendMail(mailOptions, function (err, info) {
			if (err) {
				return false
			}
		});

		return true
	}
}
