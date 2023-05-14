import { User } from '../../types/User';
import ErrorWithStatusCode from '../classes/ErrorWithStatusCode';

export function constructQueryFromObject(
	tableName: string,
	queryType: 'select' | 'insert' | 'update' | 'delete',
	obj: Object,
	queryCondition: Object
) {
	let query;
	switch (queryType) {
		case 'select':
			query = `SELECT * FROM ${tableName} WHERE ${Object.keys(
				queryCondition
			)
				.map((key) => `${key} = ?`)
				.join(' AND ')}`;
			break;
		case 'insert':
			query = `INSERT INTO ${tableName} (${Object.keys(obj).join(
				', '
			)}) VALUES (${Object.keys(obj)
				.map((key) => '?')
				.join(', ')})`;
			break;
		case 'update':
			query = `UPDATE ${tableName} SET ${Object.keys(obj)
				.map((key) => `${key} = ?`)
				.join(', ')} WHERE ${Object.keys(queryCondition)
				.map((key) => `${key} = ?`)
				.join(' AND ')}`;
			break;
		case 'delete':
			query = `DELETE FROM ${tableName} WHERE ${Object.keys(
				queryCondition
			)
				.map((key) => `${key} = ?`)
				.join(' AND ')}`;
			break;
		default:
			throw new ErrorWithStatusCode('Invalid query type', 500);
	}

	let queryValues: any = Object.values(obj);
	if (queryCondition) {
		queryValues = [...queryValues, ...Object.values(queryCondition)];
	}
	return { query, queryValues };
}
