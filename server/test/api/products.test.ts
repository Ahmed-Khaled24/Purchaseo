import superTest, { Response } from 'supertest';

import api from '../../api';
import {
	connectMySQL,
	dbConnection,
	disconnectMySQL,
} from '../../services/mysql';
import {
	dbAddNewProduct,
	dbDeleteAllProducts,
} from '../../model/products.model';
import { dbDeleteAllUsers, dbGetUserByEmail } from '../../model/users.model';

let authCookies: string[] | undefined = undefined;
let SellerId: number;

function generateRandomId() {
	return Math.floor(Math.random() * 1000000);
}

beforeAll(async () => {
	await connectMySQL();
	// Create a seller user
	const user = {
		Fname: 'seller',
		Lname: 'one',
		email: 'testuser@gmail.com',
		password: 'test@Password123',
		role: 'Seller',
	};
	await superTest(api).post('/auth/signup').send(user);
	SellerId = Number((await dbGetUserByEmail(user.email)).user_id);
	const loginResponse = await superTest(api)
		.post('/auth/local')
		.send({ email: user.email, password: user.password });
	if (loginResponse.headers['set-cookie']) {
		authCookies = loginResponse.headers['set-cookie'];
	}
	// Add Categories for tests
	try {
		await dbConnection.execute(
			`INSERT INTO category VALUES('cat1'), ('cat2'), ('cat3')`
		);
	} catch (error) {
		console.log(error);
	}
}, 10000);

afterAll(async () => {
	await dbDeleteAllProducts();
	await dbConnection.execute(`DELETE FROM category`);
	await dbDeleteAllUsers();
	await disconnectMySQL();
});

describe('POST /products endpoint', () => {
	afterAll(async () => {
		await dbDeleteAllProducts();
	});

	test('should return 400 if product object is not provided in request body', async () => {
		const response = await superTest(api)
			.post('/product')
			.send({})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 201 when valid product with only mandatory fields added', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(201);
	});

	test('return 400 when price is missing', async () => {
		const product = {
			product_name: 'Test Product',
			inventory: 10,
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when price is negative', async () => {
		const product = {
			price: -99.99,
			product_name: 'Test Product',
			inventory: 10,
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when price contains letters', async () => {
		const product = {
			price: '99.99a',
			product_name: 'Test Product',
			inventory: 10,
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when product_name is missing', async () => {
		const product = {
			price: 99.99,
			inventory: 10,
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when inventory is missing', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when inventory is negative', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: -10,
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when inventory contains letters', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: '10a',
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 201 when valid product with all fields added', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
			description: 'Test Description',
			sold_quantity: 0,
			rating: 0,
			discount: 0,
			brand: 'Test Brand',
			approval_status: 'pending',
			product_id: generateRandomId(),
			approve_date: new Date(),
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(201);
	});

	test('return 400 when optional field is added but is not valid', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
			description: ' ',
		};
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product } })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 201 when adding a valid product with images', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
		};
		const images = ['img1', 'img2', 'img3'];
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product }, images })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(201);
	});

	test('return 201 when adding a valid product with images and categories', async () => {
		const product = {
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
		};
		const images = ['img4', 'img5', 'img6'];
		const categories = ['cat1', 'cat2', 'cat3'];
		const response = await superTest(api)
			.post('/product')
			.send({ product: { ...product }, images })
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(201);
	});
});

describe('DELETE /products endpoint', () => {
	let id = generateRandomId();
	beforeAll(async () => {
		const product = {
			product_id: id,
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
			added_by: SellerId,
		};
		await dbAddNewProduct(product);
	});

	test('return 200 when deleting an existing product', async () => {
		const response = await superTest(api)
			.delete(`/product/${id}`)
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(200);
	});
	test('return 500 when deleting a non-existing product', async () => {
		const response = await superTest(api)
			.delete(`/product/${generateRandomId()}`)
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(404);
	});
});

describe('PATCH /products endpoint', () => {
	let id = generateRandomId();
	beforeAll(async () => {
		const productToUpdate = {
			product_id: id,
			price: 99.99,
			product_name: 'Test Product',
			inventory: 10,
			added_by: SellerId,
		};
		await dbAddNewProduct(productToUpdate);
	});

	afterAll(async () => {
		await dbDeleteAllProducts();
	});

	test('return 200 when try to update product price with a valid number', async () => {
		const update = {
			price: 199.99,
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(200);
	});

	test('return 200 when try to update product inventory with a valid number', async () => {
		const update = {
			inventory: 20,
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(200);
	});

	test('return 200 when try to update product name with a valid string', async () => {
		const update = {
			product_name: 'new name',
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(200);
	});

	test('return 200 when try to update product description with a valid string', async () => {
		const update = {
			description: 'new description',
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(200);
	});

	test('return 200 when try to update product description with invalid string', async () => {
		const update = {
			description: ' ',
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when try to update product sold quantity with a valid number', async () => {
		const update = {
			sold_quantity: 10,
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(200);
	});

	test('return 400 when try to update product sold quantity with a invalid number', async () => {
		const update = {
			sold_quantity: -10,
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when try to update product price with a invalid valid number', async () => {
		const update = {
			price: -15,
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when try to update product inventory with a invalid number', async () => {
		const update = {
			inventory: -20,
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});

	test('return 400 when try to update product name with a valid string', async () => {
		const update = {
			product_name: ' ',
		};
		const response = await superTest(api)
			.patch(`/product`)
			.send({
				product: { ...update },
				id,
			})
			.set('Cookie', authCookies as string[]);
		expect(response.status).toBe(400);
	});
});
