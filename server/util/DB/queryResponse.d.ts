// alias for return value from execute()
export type QueryResponse =
	| RowDataPacket[]
	| RowDataPacket[][]
	| OkPacket
	| OkPacket[]
	| ResultSetHeader
	| never;
