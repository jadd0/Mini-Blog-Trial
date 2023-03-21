import { DB } from './db';

export class Follow extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async getFollowed(username: string, followedUsername: string) {
		const res = await this.getValue({
			table: 'Following',
			value: {
				username,
				followedUsername
			}
		});

		if (!res || res[0].length == 0) return true;
		return false;
	}

	async follow(username: string, followedUsername: string) {
		if (!this.getFollowed(username, followedUsername)) return false;

		const res = await this.newValue({
			table: 'Following',
			values: {
				username,
				followedUsername
			}
		});

		if (!res) return false;
		return true;
	}

	async unfollow(username: string, followedUsername: string) {
		if (!this.getFollowed(username, followedUsername)) return false;

		const res = await this.deleteValue({
			table: 'Following',
			values: {
				username,
				followedUsername
			}
		});

		if (!res) return false;
		return true;
	}
}
