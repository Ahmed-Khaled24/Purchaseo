import {
	validateBirthDate,
	validateEmail,
	validatePassword,
	validatePhoneNumber,
	validateRole,
	validateSocialType,
	validateUserName,
	validateUserType,
} from '../../util/validation/user.validation';

describe('test username validation', () => {
	test('test username with valid username', () => {
		const username = 'testtest';
		const result = validateUserName(username);
		expect(result).toBe(true);
	});
	test('test username with invalid username', () => {
		const username = 'testtest1@23';
		expect(() => {
			validateUserName(username);
		}).toThrowError(
			'Username must have at least 3 characters (letters and numbers only)'
		);
	});
});

describe('test email validation', () => {
	test('test email with valid email', () => {
		const email = 'testuser@gmail.com';
		const result = validateEmail(email);
		expect(result).toBe(true);
	});
	test('test email with invalid email', () => {
		const email = 'testuserhotmail.com';
		expect(() => {
			validateEmail(email);
		}).toThrowError(
			'email must have @ and . and at least 2 characters after the dot'
		);
	});
});

describe('test password validation', () => {
	test('test password with valid password', () => {
		const password = 'Testpassword@1234';
		const result = validatePassword(password);
		expect(result).toBe(true);
	});
	test('test password with invalid password', () => {
		const password = 'Testpassword1234';
		expect(() => {
			validatePassword(password);
		}).toThrowError(
			'password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
		);
	});
});

describe('test role validation', () => {
	test('test role with valid role', () => {
		const role = 'Customer';
		const result = validateRole(role);
		expect(result).toBe(true);
	});
	test('test role with invalid role', () => {
		const role = 'student';
		expect(() => {
			validateRole(role);
		}).toThrowError(
			'role must be either Customer, Seller, Company or Admin'
		);
	});
});

describe('test phone number validation', () => {
	test('test phone number with valid phone number', () => {
		const phoneNumber = '01234567891';
		const result = validatePhoneNumber(phoneNumber);
		expect(result).toBe(true);
	});
	test('test phone number with invalid phone number', () => {
		const phoneNumber = '0123456789a';
		expect(() => {
			validatePhoneNumber(phoneNumber);
		}).toThrowError('phoneNumber must be 11 digits starting with 01');
	});
});

describe('test user_type validation', () => {
	test('test user_type with valid user_type', () => {
		const user_type = 'Local';
		const result = validateUserType(user_type);
		expect(result).toBe(true);
	});
	test('test user_type with invalid user_type', () => {
		const user_type = 'student';
		expect(() => {
			validateUserType(user_type);
		}).toThrowError('userType must be either Local, Both or Non-Local');
	});
});

describe('test birthdate validation', () => {
	test('test birthdate with valid birthdate', () => {
		const birthdate = '1999-01-01';
		const result = validateBirthDate(new Date());
		expect(result).toBe(true);
	});
});

describe('test social_type validation', () => {
	test('test social_type with valid social_type', () => {
		const social_type = 'google';
		const result = validateSocialType(social_type);
		expect(result).toBe(true);
	});
	test('test social_type with invalid social_type', () => {
		const social_type = 'student';
		expect(() => validateSocialType(social_type)).toThrowError(
			'socialType must be either google or local'
		);
	});
});
