export class SupabaseFeatures {
	constructor(supabase, bcrypt) {
		this.supabase = supabase;
		this.bcrypt = bcrypt;
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

	async removeFollower(myUsername, user2) {
		console.log(myUsername)
		if (!user2) {
			return false;
		}

		let followersList = user2.followersList || [];
		console.log({followersList})
		const bool = followersList.includes(myUsername);

		if (!bool) {
			return false;
		}

		followersList = followersList.filter((item) => item !== myUsername);
		console.log("hwrfhoeuhfouewhfoeuhwuhguo")
		console.log("NEW FOLLOWERS LIST", followersList);

		const { data, error } = await this.supabase
			.from("Users")
			.update({ followersList: followersList })
			.match({ username: user2.username });

		if (error == undefined) return true;

		return false;
	}	

	async unfollow(username, userToUnfollow) {
		if (username == userToUnfollow) return false;
		const user = await this.getUser(username);
		let followingList = user.followingList || [];

		const bool = followingList.includes(userToUnfollow);

		if (!bool) {
			return false;
		}

		followingList = followingList.filter((item) => item !== userToUnfollow);

		console.log(followingList)
		const { data, error } = await this.supabase
			.from("Users")
			.update({ followingList: followingList })
			.match({ username: username });

		const res = await this.removeFollower(username, await this.getUser(userToUnfollow))

		if (error == undefined && res) return true;

		return false;
	}

	async changeKey(username, key) {
		const { data, error } = await this.supabase
			.from("Users")
			.update({ key: key })
			.match({ username: username });

		if (error != undefined) return false;
		return true;
	}

	async addToFollowingList(myUsername, user2) {
		if (!user2) {
			return false;
		}

		let followersList = user2.followersList || [];

		const bool = followersList.includes(myUsername);

		if (bool) {
			return false;
		}

		followersList.push(myUsername);
		const { data, error } = await this.supabase
			.from("Users")
			.update({ followersList: followersList })
			.match({ username: user2.username });

		if (error == undefined) return true;

		return false;
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

		const res = this.addToFollowingList(username, user2)

		if (error == undefined && res) return true;

		return false;
	}

	async deletePost(id) {
		const { data, error } = await this.supabase
			.from("Posts")
			.delete()
			.match({ id: id });
		
		if (error == undefined) return true;
		return false;
	}

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
		const { data, error } = await this.supabase
			.from("Posts")
			.select("*")
			.eq("id", id);
	
		if (data == undefined || data.length == 0 || error != undefined) return false;
		return data[0];
	}

	async signUp(userDetails) {
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
				email: userDetails.email.toLowerCase(),
				password: userDetails.password,
				username: userDetails.username.toLowerCase(),
			},
		]);

		if (error == undefined) {
			this.follow(userDetails.username, userDetails.username);
			return true;
		}

		return false;
	}

	async logout(username) {
		const { data, error } = await this.supabase
			.from("Users")
			.update({ key: "" })
			.match({ username: username });

		if (error != undefined) return false;
		return true;
	}

	async checkAvailability(username, email) {
		const userList = await this.getAllUsers();

		const usernameAvailability = userList.find(
			(user) => user.username === username.toLowerCase()
		);

		const emailAvailability = userList.find(
			(user) => user.email === email.toLowerCase()
		);

		//true if undefined, false otherwise
		const userBool = usernameAvailability == undefined;
		const emailBool = emailAvailability == undefined;

		if (!userBool || !emailBool) return false;

		return true;
	}

	async comparePassword(plaintextPassword, hash) {
		const result = await this.bcrypt.compare(plaintextPassword, hash);
		return result;
	}

	async authenticate(username, password) {
		if (password == undefined) return false;
		const user = await this.getUser(username);
		const res = await this.comparePassword(password, user.password);
		if (!res) return false;
		return user.username;
	}

	checkDate(expiry) {
		const dateNow = new Date().getTime();

		if (dateNow >= expiry) return false;
		return true;
	}

	async checkKey(token) {
		const splitToken = token.split(".");
		const date = splitToken[0];
		const key = splitToken[1];

		const res = this.checkDate(date);
		if (!res) return false;

		const { data, e } = await this.supabase
			.from("Users")
			.select("*")
			.eq("key", token);

		if (data.length == 0) return false;
		return data[0].username
	}
}