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

function getTimeAgo(time) {
  console.log(timeAgo(new Date(time).getTime()))
}

/** @type {import('./$types').Load} */
export const load: any = async ({ request }) => {
	const location = await getLocation();

  console.log(getTimeAgo(location.created_at))
	return { location: location.location  };
};

