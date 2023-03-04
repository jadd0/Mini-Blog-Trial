import { DB } from './db';

export class User extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async getAllUsernames() {
		const { data, e } = await this.supabase.from('Users').select('username');

		return data;
	}

	async getAllUsers() {
		const { data, error } = await this.supabase.from('Users').select('*');

		return data;
	}

	async getUser(username: string) {
		const { data, e } = await this.getValue({ table: 'Users', value: { username } });

		if (data.length == 0) return false;
		return data[0];
	}

	async changePassword(username: string, password: string): Promise<boolean> {
		{
			const user = await this.getUser(username);

			const { data, error } = await this.supabase
				.from('users')
				.update({ password: password })
				.match({ username: username });

			if (data == undefined) return true;
			return false;
		}
	}
}
