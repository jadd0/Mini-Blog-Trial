export class SupabaseFeatures {
	constructor(supabase, bcrypt) {
		this.supabase = supabase;
		this.bcrypt = bcrypt;
	}

	// TODO refractor all code to allow for dynamic 'get'

	async changeResetKey(username, key) {
		const user = await this.getUser(username);

		let keys = user.keys
		keys.passwordReset = `${username}.${key}`

		const { data, error } = await this.supabase
			.from("users")
			.update({ keys: keys })
			.match({ username: username });
		
		if (error == undefined) return true
		return false
	}

	async getEmail(username, email) {
		const user = await this.getUser(username)
		if (!user) return false

		const res = await this.comparePassword(email, user.email)

		if (res) return user
		return false
	}

	async voteOnPost(id, option, username) {
		const post = await this.getPost(id)
		if (!post) return false;

		let h;	
		let option1;

		for (let i = 0; i < post.options.length; i++) {
			if (post.options[i].value == option) {
				h = i
				option1 = post.options[i]
				break
			}
		}

		if (option1 == undefined) return false

		for (let i = 0; i < post.options.length; i++) {
			const res = (post.options[i].votes).find(
				(item) => item.username === username
			);
			if (res != undefined) return false;
		}

		option1.votes.push(({
			username,
			time: new Date()
		}))

		post.options[h] = option1


		const { data, error } = await this.supabase
			.from("posts")
			.update({ options: post.options })
			.match({ id: id });
		if (error == undefined) return true
		return false
	}

	async createVote(body, options, username) {
		const { data, error } = await this.supabase.from("posts").insert([
			{
				body,
				username,
				options,
				type: 'vote'
			},
		]);
		if (error == undefined) return true
		return false
	}

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

	async removeDislike(id, username) {
		const post = await this.getPost(id);
		if (!post) return false;
		let dislikes = post.dislikes || [];

		dislikes = dislikes.filter((item) => item.username !== username);

		const { data, error } = await this.supabase
			.from("posts")
			.update({ dislikes: dislikes })
			.match({ id: id });

		if (error == undefined) return true;
		return false;
	}

	async removeLike(id, username) {
		const post = await this.getPost(id);
		if (!post) return false;
		let likes = post.likes || [];

		likes = likes.filter((item) => item.username !== username);

		const { data, error } = await this.supabase
			.from("posts")
			.update({ likes: likes })
			.match({ id: id });

		if (error == undefined) return true;
		return false;
	}

	async dislikePost(id, username) {
		const post = await this.getPost(id);
		if (!post) return false;

		let dislikes = post.dislikes || [];
		let res = false;

		if (dislikes.length !== 0) {
			res = dislikes.find((user) => user.username === username);
		}

		if (res) return false;

		dislikes.push({
			username: username,
			time: new Date().getTime(),
		});

		const { data, error } = await this.supabase
			.from("posts")
			.update({ dislikes: dislikes })
			.match({ id: id });

		const errorTwo = await this.removeLike(id, username);
		if (error == undefined && errorTwo) return true;
		return false;
	}

	async likePost(id, username) {
		const post = await this.getPost(id);
		if (!post) return false;

		let likes = post.likes || [];
		let res = false;

		if (likes.length !== 0) {
			res = likes.find((user) => user.username === username);
		}

		if (res) return false;

		likes.push({
			username: username,
			time: new Date().getTime(),
		});

		const { data, error } = await this.supabase
			.from("posts")
			.update({ likes: likes })
			.match({ id: id });

		const errorTwo = await this.removeDislike(id, username);
		if (error == undefined && errorTwo) return true;
		return false;
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
			.from("posts")
			.update({ comments: comments })
			.match({ id: data.id });

		if (error == undefined) return true;
		return false;
	}

	async removeFollower(myUsername, user2) {
		if (!user2) {
			return false;
		}

		let followersList = user2.followersList || [];
		const bool = followersList.includes(myUsername);

		if (!bool) {
			return false;
		}

		followersList = followersList.filter((item) => item !== myUsername);

		const { data, error } = await this.supabase
			.from("users")
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
		const { data, error } = await this.supabase
			.from("users")
			.update({ followingList: followingList })
			.match({ username: username });

		const res = await this.removeFollower(
			username,
			await this.getUser(userToUnfollow)
		);

		if (error == undefined && res) return true;

		return false;
	}

	async changeKey(username, key) {
		const { data, error } = await this.supabase
			.from("users")
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
			.from("users")
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
			.from("users")
			.update({ followingList: followingList })
			.match({ username: username });

		const res = this.addToFollowingList(username, user2);

		if (error == undefined && res) return true;

		return false;
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

	async getAllUsernames() {
		const { data, e } = await this.supabase
			.from("users")
			.select("username");

		return data;
	}

	async getAllUsers() {
		const { data, error } = await this.supabase.from("users").select("*");

		return data;
	}

	async getUser(username) {
		const { data, e } = await this.supabase
			.from("users")
			.select("*")
			.eq("username", username);

		if (data.length == 0) return false;
		return data[0];
	}

	async getPosts(username) {
		const { data, e } = await this.supabase
			.from("posts")
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

	async signUp(userDetails) {
		const result = await this.checkAvailability(
			userDetails.username,
			userDetails.email
		);

		if (!result) {
			return false;
		}

		const { data, error } = await this.supabase.from("users").insert([
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
			.from("users")
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
			.from("users")
			.select("*")
			.eq("key", token);

		if (data.length == 0) return false;
		return data[0].username;
	}
}
