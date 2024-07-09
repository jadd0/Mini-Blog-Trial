import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Spotify } from '../../../classes/spotify';

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const spotify: any = new Spotify(refreshToken, clientId, clientSecret);



export const GET: RequestHandler = async ({ url, request }) => {
console.log(spotify)
	const query = url.searchParams.get('query');
	console.log(query)
	const parse = await spotify.search({query, type: 'track', limit: 20})

	return new Response(JSON.stringify(parse.tracks.items));
};