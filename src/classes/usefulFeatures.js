export class Features {
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
		return hash
	}

	genetateToken() {
		const alphNumString =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		// 1.5 days
		const days = 129600000;
		const expire = new Date().getTime() + days;
		let key = "";

		for (let i = 0; i < 40; i++) {
			key +=
				alphNumString[Math.floor(Math.random() * alphNumString.length)];
		}

		key = `${expire}.${key}`;

		return key;
	}

	//expires in 2 days
	generateExpiry() {
		const date = new Date();
		const days = 1.5
		date.setTime(date.getTime() + (days*24*60*60*1000));

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
}
