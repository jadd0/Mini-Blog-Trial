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
		const user = await this.getValue({
			table: 'Users',
			value: {
				username: username
			}
		})

		if (!user) return false;
		return user;
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

	async checkFollowing(username: string, followedUsername: string): Promise<boolean> {
		const res = await this.getValue({
			table: 'Following',
			value: {
				username,
				followedUsername
			}
		})

		if (!res) return false
		return true
	}

	async follow(username: string, followedUsername: string): Promise<boolean> {
		if (await this.checkFollowing(username, followedUsername)) return false
		const res = await this.newValue({
			table: 'Following',
			values: {
				username,
				followedUsername
			}
		})

		if (!res) return false
		return true
	}

	async unfollow(username: string, followedUsername: string): Promise<boolean> {
		if (!await this.checkFollowing(username, followedUsername)) return false

		const res = await this.deleteValue({
			table: 'Following',
			values: {
				username,
				followedUsername
			}
		})

		if (!res) return false
		return true
	}	

	async getFollowed(followedUsername: string) {
		const res = await this.getValue({
			table: 'Following',
			value: {
				followedUsername
			},
			returnValues: 'username'
		});

		if (!res) return false;
		return res;
	}

	async getFollowing(username: string) {
		const res = await this.getValue({
			table: 'Following',
			value: {
				username
			},
			returnValues: 'followedUsername'
		});

		if (!res) return false;
		return res;
	}
}