import {
	validateNumber,
	validateString,
} from '../../util/validation/productValidation';

describe('Test validateNumber function', () => {
	test('given a negative number it should throw an error', () => {
		expect(() => validateNumber('-1', true, 'test')).toThrowError();
	});
	test('given a positive number it should return true', () => {
		expect(() => validateNumber('1', true, 'test')).not.toThrowError();
	});
	test('given undefined that is required it should return false', () => {
		expect(() => validateNumber(undefined, true, 'test')).toThrowError();
	});
	test('given undefined that is not required it should return true', () => {
		expect(() =>
			validateNumber(undefined, false, 'test')
		).not.toThrowError();
	});
});

describe('Test validateString function', () => {
	test('given a string with length 0 it should throw an error', () => {
		expect(() => validateString('', true, 'test')).toThrowError();
	});
	test('given a string with length 1  but this length is a space it should throw error', () => {
		expect(() => validateString(' ', true, 'test')).toThrowError();
	});
	test('given a string with length 1 it should not throw error', () => {
		expect(() => validateString('a', true, 'test')).not.toThrowError();
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
