export class SupabaseFeatures {
	constructor(supabase) {
		this.supabase = supabase;
	}

	async newComment(data, username) {
		const post = await this.getPost(data.id);
		if (post == undefined) return false;

		let comments = post.comments;

		if (comments == null) {
			comments = [];
		}

		comments.push({
			id: comments.length,
			body: data.commentBody,
			created_at: new Date(),
			username: username,
		});

		const { d, error } = await this.supabase
			.from("Posts")
			.update({ comments: comments })
			.match({ id: data.id });

		if (error == undefined) return true;
		return false;
	}

	async unfollow() {}

	async checkUserExists() {}

	async checkAlreadyFollowed(user, userToFollow) {}

	async changeKey(username, key) {
		console.log(username, key);
		const { data, error } = await this.supabase
			.from("Users")
			.update({ key: key })
			.match({ username: username });

		if (error != undefined) return false;
		return true;
	}

	async follow(username, userToFollow) {
		const user2 = await this.getUser(userToFollow);

		if (!user2) {
			return false;
		}

		const user = await this.getUser(username);
		let followingList = user.followingList || [];

		const bool = followingList.includes(user2.username);

		if (bool) {
			return false;
		}

		followingList.push(userToFollow);
		const { data, error } = await this.supabase
			.from("Users")
			.update({ followingList: followingList })
			.match({ username: username });

		if (error == undefined) return true;

		return false;
	}

	async deletePost() {}

	async createPost(userData, username) {
		const { data, error } = await this.supabase.from("Posts").insert([
			{
				title: userData.title,
				body: userData.body,
				metadata: {
					description: userData.description,
				},
				a: username,
			},
		]);

		if (error == undefined) {
			return true;
		}

		return false;
	}

	async getAllUsernames() {
		const { data, e } = await this.supabase
			.from("Users")
			.select("username");

		return data;
	}

	async getAllUsers() {
		const { data, error } = await this.supabase.from("Users").select("*");

		return data;
	}

	async getUser(username) {
		const { data, e } = await this.supabase
			.from("Users")
			.select("*")
			.eq("username", username);

		if (data.length == 0) return false;
		return data[0];
	}

	async getPosts(username) {
		const { data, e } = await this.supabase
			.from("Posts")
			.select("*")
			.eq("a", username);
		return data;
	}

	async getPost(id) {
		const { data, e } = await this.supabase
			.from("Posts")
			.select("*")
			.eq("id", id);

		return data[0];
	}

	async signUp(userDetails) {
		//
		const result = await this.checkAvailability(
			userDetails.username,
			userDetails.email
		);

		if (!result) {
			return false;
		}

		const { data, error } = await this.supabase.from("Users").insert([
			{
				name: userDetails.name,
				email: userDetails.email,
				password: userDetails.password,
				username: userDetails.username,
			},
		]);

		if (error == undefined) {
			this.follow(userDetails.username, userDetails.username);
			return true;
		}

		return false;
	}

	async checkAvailability(username, email) {
		const userList = await this.getAllUsers();

		const usernameAvailability = userList.find(
			(user) => user.username == username
		);
		const emailAvailability = userList.find((user) => user.email === email);

		//true if undefined, false otherwise
		const userBool = usernameAvailability == undefined;
		const emailBool = emailAvailability == undefined;

		if (!userBool || !emailBool) return false;

		return true;
	}

	async authenticate(username, password) {
		if (password == undefined) return false;
		username, password;
		const user = await this.getUser(username);

		try {
			if (user.password !== password) {
				return false;
			}
		} catch {
			return false;
		}

		return user.username;
	}

	async checkKey(key) {
		const { data, e } = await this.supabase
			.from("Users")
			.select("*")
			.eq("key", key);
		if (data.length == 0) return false;
		return data[0].username;
	}
}
