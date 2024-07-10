import { supabase } from '../../supabaseClient.js';

export const POST = async ({ request }) => {
	const body = await request.json();

	const { data, error } = await supabase
		.from('recommendations')
		.update({ uri: body.song.uri })
		.match({ uri: body.song.uri })
		.select();

  if (data.length == 0) {
    const { data, error } = await supabase.from('recommendations').insert({ 'uri': body.song.uri, 'addedBy': body.name }).select();
  }

	return new Response();
};
