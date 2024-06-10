import { get } from 'svelte/store'
import { error } from '@sveltejs/kit';

import { rooms } from "../../stores";

const Rooms = get(rooms);

export const load: any = async ({ request, cookies, fetch, params }) => {
  const room = Rooms.getRoom(params.room);

  if (!room) {
    return new Error(`Invalid room ${params.room}`);
  }

  return {...room};
}
