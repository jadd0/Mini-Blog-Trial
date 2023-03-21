import { error, redirect } from '@sveltejs/kit';
import { authFlow } from '../../functions/auth';

/** @type {import('./$types').Load} */
export const load: any = async ({ request, cookies, fetch }) => {
	const auth = await authFlow(request.headers.get('cookie'), fetch);
	console.log(auth)
	if (auth) {
		cookies.set('key', auth.newKey, {
			path: '/',
			HostOnly: false,
			Secure: 'lax',
			httpOnly: true,
			SameSite: 'Strict'
		});

		throw redirect(307, '/');
	}

	return
};
