export class Login {
	constructor() {
		this.username = "jadd";
		this.password = "jadd";
		this.safeCode = "JADD";
	}

	authenticate(username, password) {
		if (username.toLowerCase() !== this.username || password !== this.password) {
      return false
		}

    return true
	}
}
