export class SupabaseFeatures {
	constructor(supabase, bcrypt) {
		this.supabase = supabase;
		this.bcrypt = bcrypt;
	}

	// TODO refractor all code to allow for dynamic 'get'


	async deleteData(table, column, opt) {
		const { data, error } = await this.supabase
			.from(table)
			.delete()
			.match({ [column]: opt });
		if (error == undefined) return true
		return false
	}

	async checkIfMoodPresent(username) {
		const date = this.getDate();

		const { data, error } = await this.supabase
			.from("moods")
			.select("*")
			.eq("username", username);

		const res = data.find((item) => item.date === date);

		if (res == undefined) return true;

		const del = await this.deleteData('moods', 'id', res.id)

		if (del) return true
		return false
	}

	async getMoods(username) {
		const { data, error } = await this.supabase
			.from("moods")
			.select("*")
			.eq("username", username);

		if (error == undefined) return data;
		return false;
	}

	padTo2Digits(num) {
		return num.toString().padStart(2, "0");
	}

	getDate() {
		const date = new Date();

		const day = this.padTo2Digits(date.getDate());
		const month = this.padTo2Digits(date.getMonth() + 1);
		const year = this.padTo2Digits(date.getFullYear());

		const newDate = `${year}-${month}-${day}`;
		return newDate;
	}

	async newMood(mood, text, username) {
		const date = this.getDate();
		const res = await this.checkIfMoodPresent(username);

		if (!res) return false

		const { data, error } = await this.supabase.from("moods").insert([
			{
				mood,
				text,
				username,
				date,
			},
		]);

		if (error == undefined) return true;
		return false;
	}


	




	

}
