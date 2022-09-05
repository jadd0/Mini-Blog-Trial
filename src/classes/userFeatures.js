export class UserFeatured {
  generateJWT(email, password, authKey) {
		// TODO encrypt this locally
		return {
			email: email,
			password: password,
			authKey: authKey,
		};
	}

  passwordChecker(password) {
		const regex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{10,50}$/;

		if (regex.test(password)) {
			return true;
		}
		return false;
	}
}