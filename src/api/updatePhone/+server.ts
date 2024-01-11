const supabaseUrl = process.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL

export async function GET({ request }) {

  console.log(request)

  return new Response(JSON.stringify({key: 'hello'}))
}