import { supabase } from '../../../supabaseClient'
import { error, redirect } from '@sveltejs/kit';

async function updateLocation(location: string) {
  const { data, error } = await supabase
    .from('Locations')
    .insert({
      location
    })
    .select();
  
  if (error != null) return false
  return true
}

export async function GET({ request }) {
  const key = request.headers.get('key')
  const location = request.headers.get('location')

  if (!key || !location) throw error(404, 'No location/key')

  const constKey = process.env.VITE_UPDATE_KEY || import.meta.env.VITE_UPDATE_KEY
  if (key != constKey) throw error(404, 'Bad key');

  const update = await updateLocation(location)
  if (!update) throw error(500, 'Error updating location')

  return new Response()
}