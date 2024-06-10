import { rooms } from "../../../stores";
import { error } from "@sveltejs/kit";
import { get } from 'svelte/store'

const Rooms = get(rooms);

export const GET = async ({ url, request }) => {
  const roomCode = url.searchParams.get('roomCode');

  if (!roomCode) {
    throw new Error('No room code provided');
  }

  const room = Rooms.getRoom(roomCode);

  if (!room) {
    throw new Error('Invalid room code, room does not exist');
  }

	return new Response(JSON.stringify(room));
}