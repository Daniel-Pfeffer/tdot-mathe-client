export class Calories {
	gain: Array<Gain>;
	burn: Array<Burn>;
}

export class Gain {
	name: string;
	count: number;
	kcal: number;
}

export class Burn {
	activity: string;
	distance?: number;
	time?: number;
	isCar?: boolean;
}
