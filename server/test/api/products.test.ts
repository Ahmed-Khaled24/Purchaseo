import superTest, { Response } from 'supertest';

import api from '../../api';
import { connectMySQL, disconnectMySQL } from '../../services/mysql';
import {} from '../../model/products.model';

function generateRandomId() {
	return Math.floor(Math.random() * 1000000);
}

beforeAll(async () => {
    await connectMySQL();
});

describe('POST /products endpoint', () => {});

describe('DELETE /products endpoint', () => {});

describe('PATCH /products endpoint', () => {});

afterAll(async () => {
    await disconnectMySQL();
});
