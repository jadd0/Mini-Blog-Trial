import { User } from "./user";

export class PasswordReset extends User {
  constructor(supabase: any) {
    super(supabase)
  }

  async checkKey(key: string, username: string): Promise<boolean> {
    if (key == undefined || username == undefined) return false

    const res = await this.getValue({table: 'Keys', value: {
      type: 'reset',
      key,
      username
    }})

    if (!res) return false
    return true
  }

  async changeResetKey(username, key) {
		const user = await this.getUser(username);

		let keys = user.keys
		keys.passwordReset = `${username}.${key}`

		const { data, error } = await this.supabase
			.from("Keys")
			.update({ keys: keys })
			.match({ username: username });
		
		if (error == undefined) return true
		return false
	}
}