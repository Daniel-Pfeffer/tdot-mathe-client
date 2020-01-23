export class Config {
	appName: string;
	types: Array<TypeConfig>;
}

class TypeConfig {
	name: string;
	shortName: string;
	type: string;
	description: string;
}
