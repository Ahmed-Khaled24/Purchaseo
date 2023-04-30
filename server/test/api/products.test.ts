import superTest, { Response } from 'supertest';

import api from '../../api';
import { connectMySQL, disconnectMySQL } from '../../service/mysql';
import {
	dbAddNewProduct,
	dbDeleteProductById,
	dbGetProductById,
	dbUpdateProductById,
} from '../../model/products.model';

function generateRandomId() {
	return Math.floor(Math.random() * 1000000);
}

beforeAll(async () => {
	await connectMySQL();
});

describe('GET /products endpoint', () => {
	const TEST_PRODUCT_1 = {
		id: generateRandomId(),
		name: 'test-car',
		qty: 2,
		price: 20000,
	};
	const TEST_PRODUCT_2 = {
		id: generateRandomId(),
		name: 'test-phone',
		qty: 20,
		price: 999.99,
	};

	beforeAll(async () => {
		await dbAddNewProduct(TEST_PRODUCT_1);
		await dbAddNewProduct(TEST_PRODUCT_2);
	});

	test('get existing product', async () => {
		const response = await superTest(api).get(
			`/product/${TEST_PRODUCT_1.id}`
		);
		expect(response.statusCode).toBe(200);
		expect(response.body.data[0]).toEqual(TEST_PRODUCT_1);
	});

	test('get non-existing product', async () => {
		const response = await superTest(api).get('/product/234');
		const expected = 'Product not found';
		expect(response.statusCode).toBe(404);
		expect(response.body.data).toEqual(expected);
	});

	afterAll(async () => {
		await dbDeleteProductById(TEST_PRODUCT_1.id);
		await dbDeleteProductById(TEST_PRODUCT_2.id);
	});
});

describe('POST /products endpoint', () => {
	const TEST_PRODUCT_1 = {
		id: generateRandomId(),
		name: 'test-car',
		qty: 2,
		price: 20000,
	};
	const INVALID_PRODUCT = {
		id: generateRandomId(),
		qty: 2,
		price: 20000,
	};

	test('add new valid product', async () => {
		const response = await superTest(api)
			.post('/product')
			.send(TEST_PRODUCT_1);
		expect(response.statusCode).toBe(201);
	});

	test('add new invalid product', async () => {
		// missing product name;
		const response = await superTest(api)
			.post('/product')
			.send(INVALID_PRODUCT);
		expect(response.statusCode).toBe(500);
	});

	afterAll(async () => {
		await dbDeleteProductById(TEST_PRODUCT_1.id);
	});
});

describe('DELETE /products endpoint', () => {
	const TEST_PRODUCT_1 = {
		id: generateRandomId(),
		name: 'test-car',
		qty: 2,
		price: 20000,
	};

	beforeAll(async () => {
		await dbAddNewProduct(TEST_PRODUCT_1);
	});

	test('delete existing product', async () => {
		const response = await superTest(api).delete(
			`/product/${TEST_PRODUCT_1.id}`
		);
		expect(response.statusCode).toBe(200);
	});

	test('delete non-existing product', async () => {
		const response = await superTest(api).delete(`/product/${789}`);
		expect(response.statusCode).toBe(404);
	});
});

describe('PATCH /products endpoint', () => {
	const TEST_PRODUCT_1 = {
		id: generateRandomId(),
		name: 'test-car',
		qty: 2,
		price: 20000,
	};
	const TEST_PRODUCT_2 = {
		id: generateRandomId(),
		name: 'test-phone',
		qty: 20,
		price: 999.99,
	};

	beforeAll(async () => {
		await dbAddNewProduct(TEST_PRODUCT_1);
	});

	test('update existing product', async () => {
		const response = await superTest(api)
			.patch(`/product`)
			.send({ id: TEST_PRODUCT_1.id, product: TEST_PRODUCT_2 });
		expect(response.statusCode).toBe(200);
	});

	test('update non-existing product', async () => {
		const response = await superTest(api)
			.patch(`/product`)
			.send({ id: generateRandomId(), product: TEST_PRODUCT_1 });
		expect(response.statusCode).toBe(404);
	});

	afterAll(async () => {
		await dbDeleteProductById(TEST_PRODUCT_1.id);
	});
});

afterAll(async () => {
	await disconnectMySQL();
});
