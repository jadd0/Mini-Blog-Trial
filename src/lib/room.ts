import { v4 as uuidv4 } from 'uuid';

export class Room {
	members: Array<any>;
	directions: Array<any>;
	goal: any;
	roomCode: any;
	uuid: string;

	constructor(goal: any, roomCode: any, startMember: any) {
		this.members = [startMember];
		this.directions = [];
		this.goal = goal;
		this.roomCode = roomCode;
		this.uuid = uuidv4(); // Generate a unique UUID for the room
	}

	async getDirection(xx: any, xy: any, yx: any, yy: any): Promise<any> {
		let response = await fetch(
			`https://api.mapbox.com/directions/v5/mapbox/walking/${xx},${xy};${yx},${yy}?geometries=geojson&access_token=YOUR_MAPBOX_ACCESS_TOKEN`
		);
		let data = await response.json();
		return data;
	}

	findMidpoint(coords1: Array<any>, coords2: Array<any>) {
		const midpoints = [];
		for (let i = 0; i < coords1.length - 1; i++) {
			const midX1 = (coords1[i][0] + coords1[i + 1][0]) / 2;
			const midY1 = (coords1[i][1] + coords1[i + 1][1]) / 2;
			for (let j = 0; j < coords2.length - 1; j++) {
				const midX2 = (coords2[j][0] + coords2[j + 1][0]) / 2;
				const midY2 = (coords2[j][1] + coords2[j + 1][1]) / 2;
				const distance = Math.sqrt(
					Math.pow(midX1 - midX2, 2) + Math.pow(midY1 - midY2, 2)
				);
				midpoints.push({ midX1, midY1, midX2, midY2, distance });
			}
		}
		midpoints.sort((a, b) => a.distance - b.distance);
		return midpoints[0];
	}

	async getClosestInterceptionPoint(
		xStart: any,
		xEnd: any,
		yStart: any,
		yEnd: any
	) {
		const routeX = await this.getDirection(
			xStart[0],
			xStart[1],
			xEnd[0],
			xEnd[1]
		);
		const routeY = await this.getDirection(
			yStart[0],
			yStart[1],
			yEnd[0],
			yEnd[1]
		);

		const coordsX = routeX.routes[0].geometry.coordinates;
		const coordsY = routeY.routes[0].geometry.coordinates;

		const closestMidpoint = this.findMidpoint(coordsX, coordsY);

		return closestMidpoint;
	}

	addMember(newMember: any) {
		this.members.push(newMember);
	}

	deleteMember(memberID: any) {
		this.members = this.members.filter((member) => member.id !== memberID);
	}

	async findGoalDirection(member: any) {
		const memberPosition = [member.longitude, member.latitude];
		const goalPosition = [this.goal.longitude, this.goal.latitude];
		const direction = await this.getDirection(
			memberPosition[0],
			memberPosition[1],
			goalPosition[0],
			goalPosition[1]
		);
		this.directions.push(direction);
		return direction;
	}

	updateGoalDirection(newGoal: any) {
		this.goal = newGoal;
		this.directions = []; // Clear current directions as they are now outdated
		this.members.forEach((member) => {
			this.findGoalDirection(member); // Update directions for each member
		});
	}
}
