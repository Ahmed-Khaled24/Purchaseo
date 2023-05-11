import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

import { jsToSQLDate } from '../util/DB/dateConverter';
import {
	generateInsertMultipleQuery,
	generateInsertQuery,
	generateUpdateQuery,
} from '../util/DB/queryGenerators';
import { dbConnection } from '../service/mysql';
import { Product } from '../types/Product';

// alias for return value from execute()
type QueryResponse =
	| RowDataPacket[]
	| RowDataPacket[][]
	| OkPacket
	| OkPacket[]
	| ResultSetHeader
	| never;

export async function dbGetProductById(product_id: number) {
	const preparedQuery = `SELECT * FROM product WHERE product_id = ?`;
	const [rows] = await dbConnection.execute(preparedQuery, [product_id]);
	return rows;
}

export async function dbAddNewProduct(
	product: Product
): Promise<QueryResponse> {
	let { preparedQuery, values } = generateInsertQuery('product', product);
	preparedQuery = preparedQuery + ' RETURNING product_id';
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbAddImagesToAProduct(
	product_id: number,
	imagesURLs: string[]
): Promise<QueryResponse> {
	// according to the schema
	let dataRows = imagesURLs.map((imageURL) => ({
		product_id,
		file_path: imageURL,
		name: 'TODO: remove me',
	}));
	let { preparedQuery, values } = generateInsertMultipleQuery(
		'product_image',
		dataRows
	);
	preparedQuery = preparedQuery + ' RETURNING *';
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbAddCategoriesToProduct(
	product_id: number,
	categories: string[]
): Promise<QueryResponse> {
	let dataRows = categories.map((category) => ({
		category_name: category,
		product_id,
	}));
	let { preparedQuery, values } = generateInsertMultipleQuery(
		'product_category',
		dataRows
	);
	preparedQuery = preparedQuery + ' RETURNING *';
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbUpdateProduct(
	product_id: number,
	product: Partial<Product>
) {
	let { preparedQuery, values } = generateUpdateQuery(
		'product',
		product,
		product_id,
		'product_id'
	);
	// RETURNING * is not supported in mariadb with UPDATE
	console.log(preparedQuery, values);
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbApproveProduct(
	product_id: number,
	approved_by: number
): Promise<QueryResponse> {
	const { preparedQuery, values } = generateUpdateQuery(
		'product',
		{
			approved_by,
			approval_status: 'approved',
			approved_date: jsToSQLDate(new Date()),
		},
		product_id,
		'product_id'
	);
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbRejectProduct(
	product_id: number,
	approved_by: number
): Promise<QueryResponse> {
	const { preparedQuery, values } = generateUpdateQuery(
		'product',
		{
			approved_by,
			approval_status: 'rejected',
			approved_date: jsToSQLDate(new Date()),
		},
		product_id,
		'product_id'
	);
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbDeleteProductById(product_id: number) {
	const preparedQuery = `DELETE FROM product WHERE product_id = ? RETURNING *`;
	const [rows] = await dbConnection.execute(preparedQuery, [product_id]);
	return rows;
}

// ⚠️ ⚠️  WARNING: this function for testing only
export async function dbDeleteAllProducts() {
	const preparedQuery = `DELETE FROM product`;
	const [rows] = await dbConnection.execute(preparedQuery);
	return rows;
}

// TODO: add a function to delete image from product_image table
// TODO: add a function to delete category from product_category table
