import { get } from "svelte/store";
import { authFlow } from "../../../functions/auth";
import { user, posts } from "../../stores/objects";
import { error } from "@sveltejs/kit";

const User = get(user)
const Posts = get(posts)

/** @type {import('./$types').Load} */
export async function GET({ request, fetch, cookies }) {
	const auth = await authFlow(request.headers.get("cookie"), fetch)

	if (!auth) {
		throw error(401, "Not authorised");
	}

  const followingList = await User.getFollowing(auth.username)
  if (!followingList) throw error(500, `There has been an issue fetching posts from followed users of ${auth}. Please try again later`);

  const arr = []
  for (let i in followingList) {
    arr.push(followingList[i].followedUsername)
  }
  
  const data = await Posts.getPostsFromList(arr, auth.username)

  if (!data) {
    throw error(500, `There has been an issue fetching posts from followed users of ${auth}. Please try again later`)
  }

  cookies.set('key', auth.newKey, {
		path: '/',
		HostOnly: false,
		Secure: 'lax',
		httpOnly: true,
		SameSite: 'Strict'
	});

	return new Response(JSON.stringify({ data: data.reverse(), key: auth.newKey }));
}