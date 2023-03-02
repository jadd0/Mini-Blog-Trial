import { error, redirect } from "@sveltejs/kit";
import { authFlow } from '../../../functions/auth'

// NOT DONE YET

/** @type {import('./$types').Load} */
export const load: any = async ({ request, cookies, fetch }) => {
  const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw redirect(307, "/login");
	}
	
	cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	const data = await supabaseClass.getPost(params.post)
	
	if (!data) {
		throw error(404, "No post found");
	}
	let bool = false
	if (auth == data.username) {
		bool = true
	}

  if (data == undefined || data.length == 0) {
    throw error(404, 'No post found');
  }

	const returnData = data
	let comments = data.comments || []

	comments.sort(function(a, b) {
    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0);
	});

	const likes = data.likes || []
	const dislikes = data.dislikes || []

	const isLiked = !(likes.find(
		(user) => user.username === auth
	) === undefined);
	const isDisliked = !(dislikes.find(
		(user) => user.username === auth
	) === undefined);


	return {
		bool,
		returnData,
		likeCount: likes.length,
		dislikeCount: dislikes.length,
		isLiked,
		isDisliked,
		username: auth,
		id: params.post,
		comments: (comments.reverse())
	}
}
