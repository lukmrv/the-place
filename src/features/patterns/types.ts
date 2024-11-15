export interface DbPatternTile {
	pattern_id?: string;
	x: number;
	y: number;
	color: string;
}

export type DbPublicPattern = {
	id?: string;
	name: string;
	tiles: DbPatternTile[];
};

export type PublicPatternData = Record<string, DbPatternTile[]>;
