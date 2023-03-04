export class SupabaseFeatures {
	constructor(supabase, bcrypt) {
		this.supabase = supabase;
		this.bcrypt = bcrypt;
	}

	// TODO refractor all code to allow for dynamic 'get'


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
}
