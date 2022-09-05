export class Login {
	// Whenever you log into a new device, a new safeCode is generated to prevent authentication issues
	// TODO implement safeCode into JWT
	generateSafeCode() {
		const alphNumString =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

		let key = "";

		for (let i = 0; i < 40; i++) {
			key +=
				alphNumString[Math.floor(Math.random() * alphNumString.length)];
		}

		return key;
	}

	async authenticate(supabase, username, password) {
		const { data, e } = await supabase
			.from("Users")
			.select("*")
			.eq("username", username);

		if (data.length == 0) {
			return false;
		}
		
		if (data[0].password !== password) {
			return false;
		}

		return true;
	}

	generateExpiry() {
		const date = new Date();
		const days = 5;
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

		return date;
	}

	generateJWT(username, password) {
		const data = {
			username: username,
			password: password,
		};

		return data;
	}

	generateCookie(username, password) {
		const jwt = this.generateJWT();
		// console.log(jwt)
		const cookie = `jwt=${JSON.stringify(
			username,
			password
		)}; path=/; Expires=${this.generateExpiry()}; HostOnly=false; Secure=lax`;

		return cookie;
	}
}
