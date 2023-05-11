export function generateInsertQuery(tableName: string, dataToInsert: Object) {
	const columns: string = Object.keys(dataToInsert).join(', ');
	const values = Object.values(dataToInsert);
	const questionMarks: string = Object.keys(dataToInsert)
		.map(() => '?')
		.join(', ');
	const preparedQuery = `INSERT INTO ${tableName}(${columns}) VALUES(${questionMarks})`;
	return { preparedQuery, values };
}
export function generateInsertMultipleQuery(
	tableName: string,
	dataToInsert: Object[]
) {
	const columns: string = Object.keys(dataToInsert[0]).join(', ');
	const values = dataToInsert.map((data) => Object.values(data)).flat();
	let questionMarks: string = Object.keys(dataToInsert[0])
		.map(() => '?')
		.join(', ');
	questionMarks = `( ${questionMarks} )`;
	questionMarks = dataToInsert.map(() => questionMarks).join(', ');
	const preparedQuery = `INSERT INTO ${tableName}(${columns}) VALUES${questionMarks}`;
	return { preparedQuery, values };
}
export function generateUpdateQuery(
	tableName: string,
	newData: Object,
	targetId: number,
	idColumnName: string
) {
	const columnNames: string[] = Object.keys(newData);
	const values = Object.values(newData);
	const updates: string = columnNames
		.map((column) => `${column} = ?`)
		.join(', ');
	const preparedQuery = `UPDATE ${tableName} SET ${updates} WHERE ${idColumnName} = ${targetId}`;
	return { preparedQuery, values };
}
