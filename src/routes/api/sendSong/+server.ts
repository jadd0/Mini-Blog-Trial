import { supabase } from '../../supabaseClient.js';

export const POST = async ({ request }) => {
	const body = await request.json();

	const { data, error } = await supabase
		.from('recommendations')
		.update({ uri: body.song.uri })
		.match({ uri: body.song.uri })
		.select();

  console.log(data, error)

	return new Response();
};
