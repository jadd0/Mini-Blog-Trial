import { Room } from './room';

export class Rooms {
	rooms: Array<Room>;

	constructor() {
		this.rooms = [];
	}

	addRoom(goal: any, roomID: any, startMember: any) {
		const newRoom = new Room(goal, roomID, startMember);
		this.rooms.push(newRoom);
	}

	deleteRoom(roomID: any) {
		this.rooms = this.rooms.filter((room) => room.roomID !== roomID);
	}

	getRoom(roomID: any) {
		return this.rooms.find((room) => room.roomID === roomID);
	}

	getRoomByUUID(uuid: string) {
		return this.rooms.find((room) => room.uuid === uuid);
	}
}
