export class Login {
	// Whenever you log into a new device, a new safeCode is generated to prevent authentication issues
	// TODO implement safeCode into JWT
	constructor() {
		this.username = "jadd";
		this.password = "jadd";
		this.safeCode = null;
	}

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

	authenticate(username, password) {
		if (
			username != this.username ||
			password != this.password
		) {
			return false;
		}
		return true
	}

	generateExpiry() {
		const date = new Date();
		const days = 5;
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

		return date;
	}

	generateJWT() {
		const data = {
			username: this.username,
			password: this.password
		}

		return data
	}

	generateCookie() {
		const jwt = this.generateJWT();
		// console.log(jwt)
		const cookie = `jwt=${JSON.stringify(jwt)}; path=/; Expires=${this.generateExpiry()}; HostOnly=false; Secure=lax`;

		return cookie;
	}
}
