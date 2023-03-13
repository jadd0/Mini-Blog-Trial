import { DB } from './db';

export class Posts extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	addLikesToPost(posts: any, likesAndDislikes: any, username: any) {
		for (let i = 0; i < posts.length; i++) {
			let likes = likesAndDislikes.filter(
				(obj) => obj.postUUID == posts[i].uuid && obj.type == true
			);
			let dislikes = likesAndDislikes.filter(
				(obj) => obj.postUUID == posts[i].uuid && obj.type == false
			);

			const isLiked = likes.find((obj) => obj.username == username) == undefined ? false : true;
			const isDisliked =
				dislikes.find((obj) => obj.username == username) == undefined ? false : true;

			posts[i] = {
				...posts[i],
				isLiked,
				isDisliked,
				likes: likes.length || 0,
				dislikes: dislikes.length || 0
			};
		}

		return posts;
	}

	async getPosts(username: string) {
		let posts = await this.getValue({
			table: 'Posts',
			value: {
				username
			}
		});
		if (!posts) return false;

		const likesAndDislikes = await this.getLikesDislikesFromList(posts);
		if (!likesAndDislikes) return false;

		posts = this.addLikesToPost(posts, likesAndDislikes, username);

		const votes = await this.getVotesFromList(posts);

		if (votes) {
			posts = votes;
		}

		posts.sort(function (a, b) {
			return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
		});

		return posts;
	}

	async getLikesDislikesFromList(arr: any) {
		arr = this.parseListOfPosts(arr);

		const { data, error } = await this.supabase
			.from('LikesAndDislikes')
			.select('*')
			.filter('postUUID', 'in', `(${arr})`);

		if (error != undefined) return false;
		return data;
	}

	parseListOfPosts(arr: any) {
		let newArr = [];

		for (let i = 0; i < arr.length; i++) {
			newArr.push(arr[i].uuid);
		}

		let list = '';
		for (let i of newArr) {
			list += `"${i}",`;
		}
		list = list.substring(0, list.length - 1);
		return list;
	}

	async getOptionsFromList(arr: any) {
		const { data, error } = await this.supabase
			.from('VoteOptions')
			.select('*')
			.filter('postUUID', 'in', `(${arr})`);

		if (error != undefined) return false;
		return data;
	}

	// ARR IS ALL THE POSTS
	async getVotesFromList(arr: any) {
		let posts = [];
		for (let i = 0; i < arr.length; i++) {
			posts.push(arr[i].uuid);
		}

		let list = '';
		for (let i of posts) {
			list += `"${i}",`;
		}

		list = list.substring(0, list.length - 1);

		const options = await this.getOptionsFromList(list);

		// DATA IS THE VOTES
		const { data, error } = await this.supabase
			.from('Votes')
			.select('*')
			.filter('postUUID', 'in', `(${list})`);

		if (error != undefined) return false;

		for (let i = 0; i < options.length; i++) {
			const votes = data.filter((obj) => obj.option == options[i].uuid);
			options[i].votes = votes;
		}

		for (let i = 0; i < arr.length; i++) {
			const option = options.filter((obj) => obj.postUUID == arr[i].uuid);
			arr[i].options = option;
		}

		return arr;
	}

	async getPostsFromList(arr: any, username: string) {
		let list = '';
		for (let i of arr) {
			list += `"${i}",`;
		}

		let { data, error } = await this.supabase
			.from('Posts')
			.select('*')
			.filter('username', 'in', `(${list})`);

		if (error != undefined) return false;

		const likesAndDislikes = await this.getLikesDislikesFromList(data);
		if (!likesAndDislikes) return false;

		data = this.addLikesToPost(data, likesAndDislikes, username);

		const votes = await this.getVotesFromList(data);

		if (votes) {
			data = votes;
		}

		data.sort(function (a, b) {
			return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
		});

		return data;
	}

	async getPost(id: string, username: string) {
		let res = await this.getValue({
			table: 'Posts',
			value: {
				uuid: id
			}
		});

		if (!res) {
			res = await this.getValue({
				table: 'Posts',
				value: {
					id
				}
			});
			if (!res) return false;
		}

		const likesDislikes = await this.getLikesDislikes(res.uuid, username);
		if (!likesDislikes) return false;

		const comments = await this.getComments(res.uuid);
		if (!comments) return false;
		res.comments = comments;

		return {
			...res,
			...likesDislikes
		};
	}

	async delete(table, column, value) {
		const { data, error } = await this.supabase.from(table).delete().eq('postUUID', uuid);
	}

	async deletePost(uuid: string): Promise<boolean> {
		let res = await this.deleteValue({
			table: 'Comments',
			values: {
				'postUUID': uuid
			}
		})
		if (!res) return false
		res = await this.deleteValue({
			table: 'LikesAndDislikes',
			values: {
				'postUUID': uuid
			}
		})
		if (!res) return false
		res = await this.deleteValue({
			table: 'Votes',
			values: {
				'postUUID': uuid
			}
		})
		if (!res) return false
		res = await this.deleteValue({
			table: 'VoteOptions',
			values: {
				'postUUID': uuid
			}
		})
		if (!res) return false
		res = await this.deleteValue({
			table: 'Posts',
			values: {
				'uuid': uuid
			}
		})
		if (!res) return false
		return true
	}

	async createPost(config: {
		title?: string;
		body: string;
		type?: string;
		username: string;
	}): Promise<any> {
		if (config.type == undefined) config.type = 'text';

		const res = await this.newValue({
			table: 'Posts',
			values: {
				...config
			}
		});

		if (!res) return false;
		return res[0];
	}

	// async getLikeDislike(postUUID: string, username: string): Promise<boolean|string> {
	// 	const res = await this.getValue({
	// 		table: 'LikesAndDislikes',
	// 		value: {
	// 			username,
	// 			postUUID
	// 		}
	// 	})

	// 	if (!res) return false

	// 	if (res.type == false) return 'dislike'
	// 	return 'like'
	// }

	async deleteLikeDislike(postUUID: string, username: string): Promise<boolean> {
		const res = await this.deleteValue({
			table: 'LikesAndDislikes',
			values: {
				postUUID,
				username
			}
		});

		if (!res) return false;
		return true;
	}

	async createLikeDislike(postUUID: string, type: boolean, username: string): Promise<boolean> {
		const res = await this.newValue({
			table: 'LikesAndDislikes',
			values: {
				type,
				username,
				postUUID
			}
		});

		if (!res) return false;
		return true;
	}

	async likeDislike(postUUID: string, type: boolean, username: string): Promise<boolean> {
		const res = await this.getLikesDislikes(postUUID, username);

		if (res.liked || res.disliked) {
			if (!(await this.deleteLikeDislike(postUUID, username))) return false;
			if (!(await this.createLikeDislike(postUUID, type, username))) return false;

			return true;
		}

		if (!(await this.createLikeDislike(postUUID, type, username))) return false;

		return true;
	}

	async newComment(postUUID: string, username: string, content: string) {
		const res = await this.newValue({
			table: 'Comments',
			values: {
				postUUID,
				username,
				content
			}
		});

		if (!res) return false;
		return true;
	}

	async getComments(postUUID: string) {
		let { data, error } = await this.supabase.from('Comments').select('*').eq('postUUID', postUUID);

		if (error != undefined) return false;
		if (data == undefined) return [];
		return data;
	}

	async getLikesDislikes(postUUID: string, username: string) {
		const { data, error } = await this.supabase
			.from('LikesAndDislikes')
			.select('*')
			.eq('postUUID', postUUID);

		console.log(data, error);

		if (error != undefined || data[0] == undefined)
			return {
				total: 0,
				likes: [],
				dislikes: [],
				liked: false,
				disliked: false
			};

		const likes = data.filter((obj) => obj.type == true);
		const dislikes = data.filter((obj) => obj.type == false);

		const liked = data.find((item: any) => item.username === username && item.type == true);
		const disliked = data.find((item: any) => item.username === username && item.type == false);
		console.log(dislikes);
		return {
			likes,
			dislikes,
			total: data.length,
			liked: liked === undefined ? false : true,
			disliked: disliked === undefined ? false : true
		};
	}
}
