import { DB } from './db'

export class Posts extends DB {
  constructor(supabase: any) {
		super(supabase);
	}

  async getPosts(username) {
		const { data, e } = await this.supabase
			.from("Posts")
			.select("*")
			.eq("username", username);

		return data;
	}

	async getPostsFromList(arr) {
		let list = "";
		for (let i of arr) {
			list += `"${i}",`;
		}

		const { data, error } = await this.supabase
			.from("posts")
			.select("*")
			.filter("username", "in", `(${list})`);

		data.sort(function (a, b) {
			return a.created_at < b.created_at
				? -1
				: a.created_at > b.created_at
				? 1
				: 0;
		});

		if (error == undefined) return data;
		return false;
	}

	async getPost(id) {
		const { data, error } = await this.supabase
			.from("posts")
			.select("*")
			.eq("id", id);
		if (data == undefined || data.length == 0 || error != undefined)
			return false;
		return data[0];
	}

	async deletePost(id) {
		const { data, error } = await this.supabase
			.from("posts")
			.delete()
			.match({ id: id });

		if (error == undefined) return true;
		return false;
	}

	async createPost(userData, username) {
		const { data, error } = await this.supabase.from("posts").insert([
			{
				title: userData.title,
				body: userData.body,
				metadata: {
					description: userData.description,
				},
				username: username,
			},
		]);

		if (error == undefined) {
			return true;
		}

		return false;
	}
}