import { DB } from './db';

export class Auth extends DB {
	Parse: any;
	Bcrypt: any;

	constructor(Parse: any, Bcrypt: any, supabase: any) {
		super(supabase);
		this.Parse = Parse;
		this.Bcrypt = Bcrypt;
	}

	public async comparePassword(plaintextPassword: string, hash: string): Promise<string> {
		const result = await this.Bcrypt.compare(plaintextPassword, hash);
		return result;
	}

	public async hashPassword(plaintextPassword: string) {
		const hash = await this.Bcrypt.hash(plaintextPassword, 10);
		return hash;
	}

	public async signUp(userDetails: {
		username: string;
		email: string;
		password: string;
		name: string;
	}) {
		const result = await this.checkAvailability(userDetails.username, userDetails.email);

		if (!result) {
			return false;
		}

		const res = await this.newValue({ table: 'Users', values: userDetails });

		if (res) {
			return true;
		}

		return false;
	}

	public async checkAvailability(username: string, email: string): Promise<boolean> {
		const userList = await this.getAllValues('Users');
		userList;
		const usernameAvailability = userList.find(
			(user: any) => user.username === username.toLowerCase()
		);

		const emailAvailability = userList.find((user: any) => user.email === email.toLowerCase());

		//true if undefined, false otherwise
		const userBool = usernameAvailability == undefined;
		const emailBool = emailAvailability == undefined;

		if (!userBool || !emailBool) return false;

		return true;
	}

	public async authenticate(username: string, password: string) {
		if (password == undefined) return false;

		const user = await this.getValue({
			table: 'Users',
			value: { username: username }
		});

		if (!user) return false;

		const res = await this.comparePassword(password, user.password);
		if (!res) return false;

		if (user.accessKey == null) {
			const randomString = await this.Parse.generateRandomString(70);
			const res = await this.updateValue({
				table: 'Users',
				columnToMatch: 'username',
				valueToMatch: username,
				columnToChange: 'accessKey',
				valueToChange: randomString
			});

			if (!res) return false
			return user.accessKey
		}
		return user.accessKey;
	}

	public checkDate(expiry: any) {
		const dateNow = new Date().getTime();

		if (dateNow >= expiry) return false;
		return true;
	}

	async changeKey(username: string, key: string, type: string) {
		let res1;

		const res = await this.updateValue({
			table: 'Keys',
			valueToChange: key,
			columnToChange: 'key',
			valueToMatch: username,
			columnToMatch: 'username'
		});

		if (res.length == 0) {
			res1 = await this.newValue({
				table: 'Keys',
				values: {
					key,
					username,
					type
				}
			});

			if (!res1) return false;
			return res1[0].key;
		}

		return res[0].key;
	}

	public async checkAccessKey(token: string) {
		const data = await this.getValue({
			table: 'Users',
			value: { accessKey: token },
			returnValues: 'username, uuid, name'
		});

		if (data.length == 0 || data == false) return false;
		return data;
	}

	public async checkKey(token: string) {
		const splitToken = token.split('.');
		const date = splitToken[0];
		// console.log(splitToken)

		const res = this.checkDate(date);
		// console.log({res})
		if (!res) return false;

		const data = await this.getValue({
			table: 'Keys',
			value: { key: token }
		});

		// console.log({data})

		if (data.length == 0 || data == false) return false;
		return data;
	}

	async checkEmail(username: string, email: string): Promise<boolean|string> {
		const user = await this.getValue({
			table: 'Users',
			value: {
				username,
				email
			}
		})
		if (!user) return false

		const res = await this.comparePassword(email, user.email)

		if (res) return user
		return false
	}
}
