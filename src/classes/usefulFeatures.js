export class Features {
  async checkAuth(authenticate, cookie) {
    const cookieList = this.parseCookie(cookie);
  
    if (cookieList.jwt == undefined) {
      return false
    }
  
    const jwt = JSON.parse(cookieList.jwt)
    const user = await authenticate(jwt.username, jwt.password)
  
    if (!user) {
      return false
    }
  
    return jwt.username
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
      // (result)
      // jwt = JSON.parse(result.jwt);
      if (result.jwt == undefined) {
        return false
      }
    } catch {
      return false;
    }
  
    return result;
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
		const cookie = `jwt=${JSON.stringify({
			username: username,
			password: password,
		})}; path=/; Expires=${this.generateExpiry()}; HostOnly=false; Secure=lax`;

		return cookie;
	}
}