/** @type {import('./$types').Load} */
export async function GET({ request, cookies }) {
  cookies.set('accessKey', '', {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

  return new Response(200)
}
