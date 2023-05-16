import { OkPacket, RowDataPacket } from 'mysql2';
import { dbConnection } from '../services/mysql';

export async function dbGetProductsByCategory(categories: any): Promise<any> {
	// db call
	if (typeof categories == 'string') {
		const query = `SELECT product.product_id , product_name
        FROM product , product_category
        WHERE  product.product_id= product_category.product_id AND category_name IN ('${categories}')
        GROUP BY product_id
        HAVING COUNT(DISTINCT category_name) = 1
        AND COUNT(*) = 1`;
		const [rows] = await dbConnection.execute(query);
		return rows as RowDataPacket[];
	} else {
		const query = `SELECT product.product_id , product_name
        FROM product , product_category
        WHERE  product.product_id= product_category.product_id  AND category_name IN ('${categories
			.toString()
			.replaceAll(',', "','")}')
        GROUP BY product_id
        HAVING COUNT(DISTINCT category_name) = ${categories.length}
        AND COUNT(*) = ${categories.length} `;
		const [rows] = await dbConnection.execute(query);
		return rows as RowDataPacket[];
	}
}
export async function dbGetProductsByName(name: string): Promise<any> {
	// db call
	const query = `SELECT product_id , product_name
        FROM product
        WHERE  product_name like '%${name}%'`;
	const [rows] = await dbConnection.execute(query);
	return rows as RowDataPacket[];
}
export async function dbAddCategory(name: any): Promise<any> {
	// db call

	const query = `INSERT into category (category_name)
    VALUES ('${name}');`;
	const [rows] = await dbConnection.execute(query);
	const ResultRows = rows as RowDataPacket[];
	return ResultRows ? true : false;
}


