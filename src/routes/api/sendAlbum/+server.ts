import { supabase } from '../../supabaseClient.js';

export const POST = async ({ request }) => {
	const body = await request.json();

	const { data, error } = await supabase
		.from('recommendations')
		.update({ uri: body.album.uri })
		.match({ uri: body.album.uri })
		.select();

  if (data.length == 0) {
    const { data, error } = await supabase.from('recommendations').insert({ 'uri': body.album.uri, 'addedBy': body.name }).select();
  }

	return new Response();
};
