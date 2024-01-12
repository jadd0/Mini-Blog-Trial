import { supabase } from '../../../supabaseClient'
import { error, redirect } from '@sveltejs/kit';

function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]!"£$%^&*()-+=#.';
  let randomString = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

async function getKey(key: string): Promise<any> {
  const { data, error } = await supabase
    .from('Keys')
    .select('*')
    .match({ type: 'updatePhone'})
  
  console.log({data, error})

  if (error != null) return false

  if (key != data.key) return false
  return true
}

async function setKey() {
  const newKey = generateRandomString()
  const { data, error } = await supabase
    .from('Keys')
    .update({ key: newKey })
    .match({ type: 'updatePhone' })
    .select()
		
  if (error != null) return false
  return newKey
}

export async function GET({ request }) {
  const key = request.headers.get('key')
  const location = request.headers.get('location')

  console.log(key, location)

  if (!await getKey(key)) throw error(404, 'Bad key');

  const newKey = await setKey()
  if (!newKey) throw error(500, 'Error changing key')

  return new Response(JSON.stringify({key: newKey}))
}