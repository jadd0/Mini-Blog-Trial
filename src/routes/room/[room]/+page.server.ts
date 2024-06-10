import { get } from 'svelte/store'
import { error } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

import { rooms } from "../../stores";

const Rooms = get(rooms);


export const load: any = async ({ request, cookies, params }) => {
  const room = Rooms.getRoom(params.room);

  if (!room) {
    return new Error(`Invalid room ${params.room}`);
  }

  const cookie = request.headers.get("cookie").get("uuid");

  if (!cookie) {
    const uuid = uuidv4();

    cookies.set('uuid', uuid, {
      path: '/',
      HostOnly: false,
      Secure: 'lax',
      httpOnly: true,
      SameSite: 'Strict'
    });

    room.addMember(uuid);
  }

  return {...room};
}
