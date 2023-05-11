import { OkPacket, RowDataPacket } from "mysql2";
import { dbConnection } from "../service/mysql";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";

export async function dbGetProductsByCateogry(categories: any): Promise<any> {
    // db call
    console.log(categories.length);


    if (typeof categories == 'string') {
        const query = `SELECT product.product_id , product_name
        FROM product , product_category
        WHERE  product.product_id= product_category.product_id AND category_name IN ('${categories}')
        GROUP BY product_id
        HAVING COUNT(DISTINCT category_name) = 1
        AND COUNT(*) = 1`;
        const [rows] = await dbConnection.execute(query);
        return (rows as RowDataPacket[]);
    }
    else {

        const query = `SELECT product.product_id , product_name
        FROM product , product_category
        WHERE  product.product_id= product_category.product_id  AND category_name IN ('${categories.toString().replaceAll(',', "','")}')
        GROUP BY product_id
        HAVING COUNT(DISTINCT category_name) = ${categories.length}
        AND COUNT(*) = ${categories.length} `;
        console.log(query);
        const [rows] = await dbConnection.execute(query);
        return (rows as RowDataPacket[]);

    }


}

export async function dbGetProductsWithTypeTool(tool: any): Promise<any> {
    // db call
    return ['product1', 'product2'];
}