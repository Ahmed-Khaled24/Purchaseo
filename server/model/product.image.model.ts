import { ResultSetHeader, RowDataPacket } from "mysql2";
import { dbConnection } from "../services/mysql";
import { ProductImage } from "../types/Product";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";
import { constructQueryFromObject } from "../util/DB/query.constructor";

export async function dbGetAllProductImages(
    productId: string
): Promise<ProductImage[]> {
    const { query, queryValues } = constructQueryFromObject(
        "product_image",
        "select",
        {},
        { product_id: productId }
    );
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("images not found", 404);
    }
    return rows as ProductImage[];
}

export async function dbGetProductImageById(
    imageId: string
): Promise<ProductImage> {
    const { query, queryValues } = constructQueryFromObject(
        "product_image",
        "select",
        {},
        { image_id: imageId }
    );
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("image not found", 404);
    }
    return (rows as ProductImage[])[0];
}

export async function dbAddProductImage(image: ProductImage): Promise<number> {
    const { query, queryValues } = constructQueryFromObject(
        "product_image",
        "insert",
        image,
        {}
    );
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as ResultSetHeader).affectedRows === 0) {
        throw new ErrorWithStatusCode("image not added", 500);
    }
    return (rows as ResultSetHeader).insertId;
}

export async function dbDeleteProductImageById(
    imageId: string
): Promise<number> {
    const { query, queryValues } = constructQueryFromObject(
        "product_image",
        "delete",
        {},
        { image_id: imageId }
    );
    const [rows] = await dbConnection.execute(query, queryValues);
    if ((rows as ResultSetHeader).affectedRows === 0) {
        throw new ErrorWithStatusCode("image not deleted", 500);
    }
    return (rows as ResultSetHeader).affectedRows;
}
