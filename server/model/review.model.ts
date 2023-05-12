import { dbConnection } from '../services/mysql';
import { Review } from '../types/Review';
import { generateInsertQuery } from '../util/DB/queryGenerators';
import { QueryResponse } from '../util/DB/queryResponse';

export async function dbAddNewReview(review: Review): Promise<QueryResponse> {
	let { preparedQuery, values } = generateInsertQuery('review', review);
	preparedQuery = preparedQuery + ' RETURNING *';
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbGetReviewsByProductId(
	productId: number | string
): Promise<QueryResponse> {
	const [rows] = await dbConnection.execute(
		'SELECT * FROM review WHERE product_id = ?',
		[productId]
	);
	return rows;
}

export async function dbGetReviewsByCustomerId(
	customerId: number | string
): Promise<QueryResponse> {
	const [rows] = await dbConnection.execute(
		'SELECT * FROM review WHERE customer_id = ?',
		[customerId]
	);
	return rows;
}

export async function dbGetReviewsByCustomerIdAndProductId( // as the primary key is a combination of product_id and customer_id
	productId: number | string,
	customerId: number | string
): Promise<QueryResponse> {
	const [rows] = await dbConnection.execute(
		'SELECT * FROM review WHERE product_id = ? AND customer_id = ?',
		[productId, customerId]
	);
	return rows;
}

export async function dbDeleteReviewByCustomerIdAndProductId(
	productId: number | string,
	customerId: number | string
): Promise<QueryResponse> {
	const [rows] = await dbConnection.execute(
		'DELETE FROM review WHERE product_id = ? AND customer_id = ? RETURNING *',
		[productId, customerId]
	);
	return rows;
}
