import { dbConnection } from "../service/mysql";

export async function dbGetProductById(id: any): Promise<any> {
    // db call
    return 'productById';
}

export async function dbAddNewProduct(product: any): Promise<any> {
    // db call
    return 'addNewProduct';
}

export async function dbDeleteProductById(id: any): Promise<any> {
    // db call
    return 'deleteProduct';
}

export async function dbUpdateProductById(id: any, product: any): Promise<any> {
    // db call
    return 'updateProduct';
}
