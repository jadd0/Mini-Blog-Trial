import { DB } from './db';

export class Moods extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

  async getMoods(username: string) {
		const { data, error } = await this.supabase
			.from("Moods")
			.select("*")
			.eq("username", username);

		if (error == undefined) return data;
		return false;
	}

	async checkIfMoodPresent(username: string) {
		const date = this.getDate();

		const { data, error } = await this.supabase
			.from("Moods")
			.select("*")
			.eq("username", username);

		const res = data.find((item) => item.date === date);

		if (res == undefined) return true;

		const del = await this.deleteValue({
      table: 'Moods',
      values: {
        id: res.id
      }
    })

		if (del) return true
		return false
	}

	async newMood(mood: string, text: string, username: string) {
		const date = this.getDate();
		const res = await this.checkIfMoodPresent(username);

		if (!res) return false

    const newRes = await this.newValue({
      table: 'Moods',
      values: {
        mood,
				text,
				username,
				date,
      }
    })

    if (!newRes) return false
    return true
	}
}