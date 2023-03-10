import { Posts } from './posts';

export class Vote extends Posts {
	constructor(supabase: any) {
		super(supabase);
	}

	async createVotePost(config: {
		username: string;
		options: string[];
		body: string;
		title?: string;
	}): Promise<boolean> {
		const { username, options, body, title } = config;

		const res = await this.createPost({ title, body, type: 'vote', username })
    if (!res) return false

    for (let i = 0; i < options.length; i++) {
      if (!await this.createOption(res.uuid, options[i])) return false
    }
    
		return true;
	}

	async createOption(postUUID: string, option: string): Promise<boolean> {
		const res = await this.newValue({
			table: 'VoteOptions',
			values: {
				option,
				postUUID
			}
		});

		if (!res) return false;
		return true;
	}

	async getVote(username: string, postUUID: string): Promise<boolean | string> {
		const res = await this.getValue({
			table: 'Votes',
			value: {
				username,
				postUUID
			}
		});

		if (!res) return false;
		return res.option;
	}

	async voteOnPost(postUUID: string, option: string, username: string): Promise<boolean> {
		if (await this.getVote(username, postUUID)) return false;

		const res = await this.newValue({
			table: 'Votes',
			values: {
				option,
				postUUID,
				username
			}
		});

		if (!res) return false;
		return true;
	}
}
