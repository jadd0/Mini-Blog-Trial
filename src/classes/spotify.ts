export class Spotify {
	refreshToken: string;
	accessToken: string;
	clientId: string;
	clientSecret: string;

	constructor(refreshToken: string, clientId: string, clientSecret: string) {
		this.refreshToken = refreshToken;
		this.accessToken = '';
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	async getAccess() {
		const clientEncoded = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64');
		const url = `https://accounts.spotify.com/api/token`;

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${clientEncoded}`,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: this.refreshToken
			})
		});
		const parsed = await res.json();

		this.accessToken = parsed['access_token'];
	}

	async search(config: {
		query: string;
		type: string;
		market: string;
		limit: number;
		offset: number;
	}) {
		const { query, type, market, limit, offset } = config;

    if (this.accessToken == undefined || this.accessToken.length == 0) {
			
			// await this.getAccess();
		}


		const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.accessToken}`
			}
		});

		let parse = await res.json()

		if (!res.ok) {
			if (parse.error.message === 'Invalid access token' || parse.error.message === 'Only valid bearer authentication supported') {
				await this.getAccess()
				parse = await this.search({ query, type, market, limit, offset })

				if (!parse) {
					return false
				}
			}
			else {
				return false
			}
		}

    return parse
	}
}