import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

import { dbConnection } from "../services/mysql";
import { Product } from "../types/Product";
import ErrorWithStatusCode from "../util/classes/ErrorWithStatusCode";

type QueryResponse = // alias for return value from execute()

        | RowDataPacket[]
        | RowDataPacket[][]
        | OkPacket
        | OkPacket[]
        | ResultSetHeader
        | never;

export async function dbGetProductById(id: any): Promise<QueryResponse> {
    const query = "SELECT * FROM products WHERE id = ?";
    const [rows] = await dbConnection.execute(query, [id]);
    if ((rows as RowDataPacket[]).length === 0) {
        throw new ErrorWithStatusCode("Product not found", 404);
    }
    return rows;
}

export async function dbAddNewProduct(
    product: Product
): Promise<QueryResponse> {
    const { id, name, qty, price } = product;
    let query = "INSERT INTO products (name, qty, price) VALUES (?, ?, ?)";
    if (id) {
        query =
            "INSERT INTO products (id, name, qty, price) VALUES (?, ?, ?, ?)";
        const [rows] = await dbConnection.execute(query, [
            id,
            name,
            qty,
            price,
        ]);
        return rows;
    }
    const [rows] = await dbConnection.execute(query, [name, qty, price]);
    return rows;
}

export async function dbDeleteProductById(id: any): Promise<QueryResponse> {
    const query = "DELETE FROM products WHERE id = ?";
    const [rows] = await dbConnection.execute(query, [id]);
    return rows;
    // TODO: create a custom error class with status code
}

export async function dbUpdateProductById(
    id: any,
    product: Product
): Promise<QueryResponse> {
    const { name, qty, price } = product;
    const query =
        "UPDATE products SET name = ?, qty = ?, price = ? WHERE id = ?";
    const [rows] = await dbConnection.execute(query, [name, qty, price, id]);
    return rows;
    // TODO: create a custom error class with status code
}
