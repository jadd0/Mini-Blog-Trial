const supabaseUrl = process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL

export async function POST({ request }) {

  console.log(request)

  return new Response('Success')
}