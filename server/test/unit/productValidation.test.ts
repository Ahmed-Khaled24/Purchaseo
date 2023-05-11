import { Product } from '../../types/Product';
import {
	validateNumber,
	validateProductData,
	validateString,
} from '../../util/validation/productValidation';

describe('Test validateNumber function', () => {
	test('given a mandatory negative number as a string it should throw an error', () => {
		expect(() => validateNumber('-1', true, 'test')).toThrowError();
	});
	test('given a mandatory positive number as a string it should not throw an error', () => {
		expect(() => validateNumber('1', true, 'test')).not.toThrowError();
	});
	test('given a mandatory negative number it should throw an error', () => {
		expect(() => validateNumber(-1, true, 'test')).toThrowError();
	});
	test('given a mandatory positive number it should return true', () => {
		expect(() => validateNumber(1, true, 'test')).not.toThrowError();
	});
	test('given mandatory undefined that is required it should return false', () => {
		expect(() => validateNumber(undefined, true, 'test')).toThrowError();
	});
	test('given mandatory undefined that is not required it should return true', () => {
		expect(() =>
			validateNumber(undefined, false, 'test')
		).not.toThrowError();
	});
	test('given an optional negative number as a string it should throw an error', () => {
		expect(() => validateNumber('-1', false, 'test')).toThrowError();
	});
	test('given an optional positive number as a string it should not throw an error', () => {
		expect(() => validateNumber('1', false, 'test')).not.toThrowError();
	});
	test('given an optional negative number it should throw an error', () => {
		expect(() => validateNumber(-1, false, 'test')).toThrowError();
	});
	test('given an optional positive number it should not throw an error', () => {
		expect(() => validateNumber(1, false, 'test')).not.toThrowError();
	});
});

describe('Test validateString function', () => {
	test('given a mandatory string with length 0 it should throw an error', () => {
		expect(() => validateString('', true, 'test')).toThrowError();
	});
	test('given a mandatory string with length 1  but this length is a space it should throw error', () => {
		expect(() => validateString(' ', true, 'test')).toThrowError();
	});
	test('given a mandatory string with length 1 it should not throw error', () => {
		expect(() => validateString('a', true, 'test')).not.toThrowError();
	});
	test('given an optional string with length 0 it should throw an error', () => {
		expect(() => validateString('', false, 'test')).toThrowError();
	});
	test('given an optional string with length 1  but this length is a space it should throw error', () => {
		expect(() => validateString(' ', false, 'test')).toThrowError();
	});
	test('given an optional string with length 1 it should not throw error', () => {
		expect(() => validateString('a', false, 'test')).not.toThrowError();
	});
	test('given undefined that is required it should throw error', () => {
		expect(() => validateString(undefined, true, 'test')).toThrowError();
	});
	test('given undefined that is not required it should not throw error', () => {
		expect(() =>
			validateString(undefined, false, 'test')
		).not.toThrowError();
	});
});

describe('Test validateProductData function', () => {
	test('given a product object without mandatory field "product_name" it should throw error', () => {
		const product = {
			added_by: 1,
			inventory: 1,
			price: 1,
		};
		expect(() => validateProductData(product as Product)).toThrowError();
	});
	test('given a product object without mandatory field "added_by" it should throw error', () => {
		const product = {
			product_name: 'test',
			inventory: 1,
			price: 1,
		};
		expect(() => validateProductData(product as Product)).toThrowError();
	});
	test('given a product object without mandatory field "inventory" it should throw error', () => {
		const product = {
			product_name: 'test',
			added_by: 1,
			price: 1,
		};
		expect(() => validateProductData(product as Product)).toThrowError();
	});
	test('given a product object without mandatory field "price" it should throw error', () => {
		const product = {
			product_name: 'test',
			added_by: 1,
			inventory: 1,
		};
		expect(() => validateProductData(product as Product)).toThrowError();
	});
	test('given a product object with all mandatory fields it should not throw error', () => {
		const product = {
			product_name: 'test',
			added_by: 1,
			inventory: 1,
			price: 1,
		};
		expect(() =>
			validateProductData(product as Product)
		).not.toThrowError();
	});
	test('given a product object with optional field but invalid value it should throw error', () => {
		const product = {
			product_name: 'test',
			added_by: 1,
			inventory: 1,
			price: 1,
			product_id: -1,
		};
		expect(() => validateProductData(product as Product)).toThrowError();
	});
});
