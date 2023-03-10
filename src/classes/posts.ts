import { DB } from './db';

export class Posts extends DB {
	constructor(supabase: any) {
		super(supabase);
	}

	async getPosts(username) {
		const { data, e } = await this.supabase.from('Posts').select('*').eq('username', username);

		return data;
	}

	async getLikesDislikesFromList(arr: any) {
		arr = this.parseListOfPosts(arr);

		const { data, error } = await this.supabase
			.from('LikesAndDislikes')
			.select('*')
			.filter('postUUID', 'in', `(${arr})`);

		if (error != undefined) return false
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
		list = list.substring(0, list.length-1)
		return list;
	}

	async getOptionsFromList(arr: any) {
		const { data, error } = await this.supabase
			.from('VoteOptions')
			.select('*')
			.filter('postUUID', 'in', `(${arr})`);
		console.log(data, error)
		if (error != undefined) return false
		return data
	}


	// ARR IS ALL THE POSTS
	async getVotesFromList(arr: any) {
		let posts = []
		for (let i = 0; i < arr.length; i++) {
			posts.push(arr[i].uuid)
		}

		let list = '';
		for (let i of posts) {
			list += `"${i}",`;
		}
	
		list = list.substring(0, list.length-1)

		const options = await this.getOptionsFromList(list)

		// DATA IS THE VOTES
		const { data, error } = await this.supabase
			.from('Votes')
			.select('*')
			.filter('postUUID', 'in', `(${list})`);

		if (error != undefined) return false

		for (let i = 0; i < options.length; i++) {
			const votes = data.filter(obj => obj.option == options[i].uuid)
			console.log({votes})
			options[i].votes = votes
		}

		for (let i = 0; i < arr.length; i++) {
			const option = options.filter(obj => obj.postUUID == arr[i].uuid)
			arr[i].options = option
		}

		return arr
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

		const likesAndDislikes = await this.getLikesDislikesFromList(data);

		if (!likesAndDislikes) return false;

		for (let i = 0; i < data.length; i++) {
			let likes = ((likesAndDislikes.filter(
				(obj) => obj.postUUID == data[i].uuid && obj.type == true
			)))
			let dislikes = likesAndDislikes.filter(
				(obj) => obj.postUUID == data[i].uuid && obj.type == false
			)

			const isLiked = (likes.find(
				(obj) => obj.username == username
			) == undefined ? false : true);
			const isDisliked = (dislikes.find(
				(obj) => obj.username == username
			) == undefined ? false : true)

			data[i] = {
				...data[i],
				isLiked,
				isDisliked,
				likes: likes.length || 0,
				dislikes: dislikes.length || 0
			}
		}

		const res = await this.getVotesFromList(data)

		if (res) {
			data = res
		}

		data.sort(function (a, b) {
			return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
		});

		if (error == undefined) return data;
		return false;
	}

	async getPost(uuid: string, username: string) {
		const res = await this.getValue({
			table: 'Posts',
			value: {
				uuid
			}
		});
		console.log({res})
		if (!res) return false;

		// const likes = await this.getLikesDislikes(uuid, true, username);
		// const dislikes = await this.getLikesDislikes(uuid, false, username);

		return {
			post: res
		};
	}

	async deletePost(uuid: string): Promise<boolean> {
		const res = await this.deleteValue({
			table: 'Posts',
			values: {
				uuid
			}
		});

		if (!res) return false;
		return true;
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
		return res[0]
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

		console.log(res)

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
		console.log('one', postUUID)
		const res = await this.getLikesDislikes(postUUID, username);
		console.log('heloo', res)

		if (res.liked || res.disliked) {
			if (!(await this.deleteLikeDislike(postUUID, username))) return false;
			if (!(await this.createLikeDislike(postUUID, type, username))) return false;
		}

		if (!(await this.createLikeDislike(postUUID, type, username))) return false

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
	}

	async getComments(postUUID: string) {
		if (!(await this.getPost(postUUID))) return false;

		let res = await this.getValue({
			table: 'Comments',
			value: {
				postUUID
			}
		});
		if (!res) res = [];
		return res;
	}

	async getLikesDislikes(postUUID: string, username: string) {
		if (!(await this.getPost(postUUID, username))) return false;

		const { data, error } = await this.getValue({
			table: 'LikesAndDislikes',
			value: {
				postUUID,
				username
			}
		})

		if (error != undefined) return false;
		if (data == undefined) return {
			amount: 0,
			liked: false,
			disliked: false,
		}

		const liked = data.find((item: any) => item.username === username && item.type == true);
		const disliked = data.find((item: any) => item.username === username && item.type == false);

		return {
			amount: data.length,
			liked: liked === undefined ? false : true,
			disliked: disliked === undefined ? false : true,
		};
	}
}
