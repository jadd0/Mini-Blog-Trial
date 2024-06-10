import { writable } from 'svelte/store';

import { Rooms } from '../lib/rooms';
import { Room } from '../lib/room';


const roomsObj = new Rooms();

export const rooms = writable(roomsObj);
