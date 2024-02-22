import { supabase } from '../supabaseClient';

async function getLocation() {
	const { data, error } = await supabase
		.from('Locations')
		.select('*')
		.order('created_at', { ascending: false })
		.limit(1);

	if (error != null) return false;
	return data[0];
}

function timeAgo(input) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

function sortTimeAgo(post) {
  post.timeAgo = timeAgo(post.created_at);
}

async function getPosts() {
  const { data, error} = await supabase
    .from('Posts')
    .select('*, LikesAndDislikes(*)')
    .match({type: 'text', username: 'jadd'})
    .order('created_at', { ascending: false })
		.limit(3);

  return data
}

function parseLikesAndDislikes(post) {
  let upvotes = 0
  let downvotes = 0

  try {
    (post.LikesAndDislikes).forEach((vote) => {
    if (vote.type) {
      upvotes++;
    }
    else {
      downvotes++;
    }
  })
  }
  catch(e) {
    return 0
  }

  post.vote = upvotes - downvotes
}

/** @type {import('./$types').Load} */
export const load: any = async ({ request }) => {
	const location = await getLocation();
  let posts = await getPosts();

  posts.forEach(sortTimeAgo);
  posts.forEach(parseLikesAndDislikes);


	return { region: location.region, area: location.area, time: timeAgo(new Date(location.created_at).getTime()), posts };
};

