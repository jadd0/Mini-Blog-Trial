export class Features {
  async checkAuth(supabaseClass, cookie) {
    const cookieList = this.parseCookie(cookie);
  
    if (cookieList.jwt == undefined) {
      return false
    }
  
    const jwt = JSON.parse(cookieList.jwt)
    const user = await supabaseClass.authenticate(key)
  
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
    } catch {
      return false;
    }
  
    return result;
  }

  genetateToken() {
		const alphNumString =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

		let key = "";

		for (let i = 0; i < 40; i++) {
			key +=
				alphNumString[Math.floor(Math.random() * alphNumString.length)];
		}

		return key;
	}

  //expires in 2 days
	generateExpiry() {
		const date = new Date();
    const days = 2
		date.setTime(date.getTime() * days * 24 * 60 * 60 * 1000);

		return date;
	}

  //every request, change token
	generateJWT(username) {
		const data = {
			username: username,
			token: this.genetateToken()
		};

		return data;
	}

	generateCookie(key) {
		const cookie = `key=${key}; path=/; Expires=${this.generateExpiry()}; HostOnly=false; Secure=lax; httpOnly=true; SameSite=Strict;`;

		return cookie;
	}
}