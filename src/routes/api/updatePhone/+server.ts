import { supabase } from '../../../supabaseClient'


function generateRandomString() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]!"£$%^&*()-+=#.';
  let randomString = '';

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return new Response(JSON.stringify({key: 'hello'}))
  return randomString;
}

async function getKey(key: string): Promise<any> {
  const { data, error } = await supabase
    .from('Keys')
    .select('type')
    .match('updatePhone');

  if (error) return false

  if (key != data.key) return false
  return true
}

async function setKey() {
  const { data, error } = await supabase
    .from('Keys')
    .update({ 'key': generateRandomString() })
    .match({ 'type': 'phoneUpdate' })
    .select()
		
  if (error) return false
  return data.key
}

export async function GET({ request, url, error  }) {
  const key = url.searchParams.get('key')
  const location = url.searchParams.get('location')

  const constKey = await getKey(key)
  if (!getKey(constKey)) throw error(404, 'Bad key');

  const newKey = setKey()
  if (!setKey()) throw error(500, 'Error changing key')

  return new Response(JSON.stringify({key: newKey}))
}