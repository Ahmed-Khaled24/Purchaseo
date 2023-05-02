import superTest from "supertest";

import api from "../../api";
import { connectMySQL, disconnectMySQL } from "../../services/mysql";
import {
    dbAddNewProduct,
    dbDeleteProductById,
    dbGetProductById,
    dbUpdateProductById,
} from "../../model/products.model";
import { Product } from "../../types/Product";

beforeAll(async () => {
    await connectMySQL();
});

describe("GET /products endpoint", () => {
    beforeAll(async () => {
        await dbAddNewProduct({
            id: 1,
            name: "test-car",
            qty: 2,
            price: 20000,
        });
        await dbAddNewProduct({
            id: 2,
            name: "test-phone",
            qty: 20,
            price: 999.99,
        });
    });
    afterAll(async () => {
        await dbDeleteProductById(1);
        await dbDeleteProductById(2);
    });

    test("get existing product", async () => {
        const response = await superTest(api).get("/product/1");
        const expected = {
            id: 1,
            name: "test-car",
            qty: 2,
            price: 20000,
        };
        expect(response.statusCode).toBe(200);
        expect(response.body.data[0]).toEqual(expected);
    });

    test("get non-existing product", async () => {
        const response = await superTest(api).get("/product/3");
        const expected = "Product not found";
        expect(response.statusCode).toBe(404);
        expect(response.body.data).toEqual(expected);
    });
});

afterAll(async () => {
    await disconnectMySQL();
});
