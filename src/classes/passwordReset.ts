import { User } from './user';

export class PasswordReset extends User {
	constructor(supabase: any) {
		super(supabase);
	}

	async checkKey(key: string, username: string): Promise<boolean> {
		if (key == undefined || username == undefined) return false;

		const res = await this.getValue({
			table: 'Keys',
			value: {
				type: 'resetPassword',
				key,
				username
			}
		});

		if (!res) return false;
		return true;
	}

	async checkUserHasKey(username: string): Promise<boolean|string> {
		const res = await this.getValue({
			table: 'Keys',
			value: {
				type: 'resetPassword',
				username
			}
		});

		if (!res) return res.uuid;
		return false;
	}

	async changeResetKey(username: string, key: string): Promise<boolean> {
		const uuid = await this.checkUserHasKey(username)
		if (!uuid) {
			const res = await this.newValue({
				table: 'Keys',
				values: {
					username,
					key,
					type: 'resetPassword'
				}
			});

			if (!res) return false
			return true
		}

		const res = await this.updateValue({
			table: 'Keys',
			columnToMatch: 'uuid',
			valueToMatch: uuid,
			columnToChange: 'key',
			valueToChange: key
		})

		if (!res) return false;
		return true;
	}
}
