import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dbConnection } from "../services/mysql";
import { ProductImage } from "../types/Product";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { constructQueryFromObject } from "../util/DB/query.constructor";

export async function dbGetAllProductImages(productId: string): Promise<ProductImage[]>{
    const query = `SELECT * FROM product_image WHERE product_id = ?`;
    const queryValues = [productId];
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("product not found", 404);
    }
    return (rows as ProductImage[]);
}

export async function dbGetProductImageById(imageId: string): Promise<ProductImage> {
    const query = `SELECT * FROM product_image WHERE image_id = ?`;
    const queryValues = [imageId];
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("product not found", 404);
    }
    return (rows as ProductImage[])[0];
}

export async function dbAddProductImage(image: ProductImage): Promise<number> {
    const {query, queryValues} = constructQueryFromObject("product_image", "insert", image, {});
    const [rows] = await dbConnection.execute(query, queryValues);
    return (rows as ResultSetHeader).insertId;
}