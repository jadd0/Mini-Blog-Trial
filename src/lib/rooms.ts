import { Room } from './room';

export class Rooms {
	rooms: Array<Room>;

	constructor() {
		this.rooms = [];
	}

	addRoom(goal: any, roomCode: any, startMember: any) {
		const newRoom = new Room(goal, roomCode, startMember);
		this.rooms.push(newRoom);
	}

	deleteRoom(roomCode: any) {
		this.rooms = this.rooms.filter((room) => room.roomCode !== roomCode);
	}

	getRoom(roomCode: any) {
		return this.rooms.find((room) => room.roomCode === roomCode);
	}

	getRoomByUUID(uuid: string) {
		return this.rooms.find((room) => room.uuid === uuid);
	}
}
