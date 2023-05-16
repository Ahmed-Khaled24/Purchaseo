import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

import { jsToSQLDate } from '../util/DB/dateConverter';
import {
	generateInsertMultipleQuery,
	generateInsertQuery,
	generateUpdateQuery,
} from '../util/DB/queryGenerators';
import { dbConnection } from '../services/mysql';
import { Product } from '../types/Product';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';
import { QueryResponse } from '../util/DB/queryResponse';

export async function dbGetMultipleProductsByIds(product_ids: number[]) {
	const preparedQuery = `SELECT * FROM product WHERE product_id IN (${product_ids.join(
		', '
	)})`;
	console.log(preparedQuery)
	const [rows] = await dbConnection.execute(preparedQuery);
	return rows as Product[];
}


export async function dbGetProductById(product_id: number) {
	const preparedQuery1 = `SELECT * FROM product WHERE product_id = ?`;
	const preparedQuery2 = `SELECT * FROM product_image WHERE product_id = ?`;
	const preparedQuery3 = `SELECT * FROM product_category WHERE product_id = ?`;
	const product = await dbConnection.execute(preparedQuery1, [product_id]);
	const images = await dbConnection.execute(preparedQuery2, [product_id]);
	const categories = await dbConnection.execute(preparedQuery3, [product_id]);
	return {
		product: (product as RowDataPacket[])[0][0],
		images: images[0],
		categories: categories[0],
	};
}

export async function dbGetProductsBySellerId(seller_id: number) {
	const preparedQuery = `SELECT * FROM product WHERE added_by = ?`;
	const [rows] = await dbConnection.execute(preparedQuery, [seller_id]);
	return rows;
}

export async function dbGetImagesOfProducts(product_ids: number[]) {
	const preparedQuery = `SELECT * FROM product_image WHERE product_id IN (${product_ids.join(
		', '
	)})`;
	const [rows] = await dbConnection.execute(preparedQuery);
	return rows;
}

export async function dbGetCategoriesOfProducts(product_ids: number[]) {
	const preparedQuery = `SELECT * FROM product_category WHERE product_id IN (${product_ids.join(
		', '
	)})`;
	const [rows] = await dbConnection.execute(preparedQuery);
	return rows;
}

export async function dbGetProductsByOrderId(order_ids: number[]) {
	const preparedQuery = `SELECT DISTINCT * FROM order_products join product ON product.product_id = order_products.product_id WHERE order_id IN (${order_ids.join(
		', '
	)})`;
	const [rows] = await dbConnection.execute(preparedQuery);
	return rows;
}

export async function dbAddNewProduct(
	product: Product
): Promise<QueryResponse> {
	let { preparedQuery, values } = generateInsertQuery('product', product);
	preparedQuery = preparedQuery + ' RETURNING product_id';
	console.log({ preparedQuery, values });
	const [rows] = await dbConnection.execute(preparedQuery, values);
	return rows;
}

export async function dbAddImagesToAProduct(
	product_id: number,
	imagesURLs: string[]
): Promise<QueryResponse> {
	// according to the schema
	console.log('dbAddImagesToAProduct')
	console.log({ product_id, imagesURLs });
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
	if ((rows as RowDataPacket[]).length === 0) {
		throw new ErrorWithStatusCode('Product not found', 404);
	}
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
