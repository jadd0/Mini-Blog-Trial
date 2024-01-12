import { error, redirect } from '@sveltejs/kit';
import { supabase } from '../supabaseClient';

async function getLocation() {
	const { data, error } = await supabase
		.from('Locations')
		.select('*')
		.order('timestamp_column', { ascending: false })
		.limit(1);

  if (error != null) return false
  return data[0].location
}

/** @type {import('./$types').Load} */
export const load: any = async ({ request }) => {
  const location = await getLocation()

  return location
};
