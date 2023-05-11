import { User } from '../../types/User';
import ErrorWithStatusCode from '../classes/ErrorWithStatusCode';

export function validateUserName(name: string): boolean {
	// username must have at least 3 characters (letters and numbers only
	if (!name) {
		throw new ErrorWithStatusCode('username required', 400);
	}
	if (!name.match(/^[a-zA-Z0-9]{3,}$/)) {
		throw new ErrorWithStatusCode(
			'Username must have at least 3 characters (letters and numbers only)',
			400
		);
	}
	return true;
}

export function validateEmail(email: string): boolean {
	// email must have @ and . and at least 2 characters after the dot
	if (!email) {
		throw new ErrorWithStatusCode('email required', 400);
	}
	if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
		throw new ErrorWithStatusCode(
			'email must have @ and . and at least 2 characters after the dot',
			400
		);
	}
	return true;
}

export function validatePassword(password: string): boolean {
	// password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
	if (!password) {
		throw new ErrorWithStatusCode('password required', 400);
	}
	if (
		!password.match(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		)
	) {
		throw new ErrorWithStatusCode(
			'password must have at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character',
			400
		);
	}
	return true;
}

export function validateRole(role: string): boolean {
	// role must be either buyer or seller
	if (!role) {
		throw new ErrorWithStatusCode('role required', 400);
	}
	if (!role.match(/^(Customer|Seller|Company|Admin)$/)) {
		throw new ErrorWithStatusCode(
			'role must be either Customer, Seller, Company or Admin',
			400
		);
	}
	return true;
}

export function validateSocialType(socialType: string): boolean {
	// socialType must be either google or local
	if (!socialType) {
		throw new ErrorWithStatusCode('socialType required', 400);
	}
	if (!socialType.match(/^(google|local)$/)) {
		throw new ErrorWithStatusCode(
			'socialType must be either google or local',
			400
		);
	}
	return true;
}

export function validateUserType(userType: string): boolean {
	// userType must be either Local, Both or Non-Local
	if (!userType) {
		throw new ErrorWithStatusCode('userType required', 400);
	}
	if (!userType.match(/^(Local|Both|Non-Local)$/)) {
		throw new ErrorWithStatusCode(
			'userType must be either Local, Both or Non-Local',
			400
		);
	}
	return true;
}

export function validatePhoneNumber(phoneNumber: string): boolean {
	// TODO: ADD more phone numbers for other countries
	// phoneNumber must be 11 digits starting with 01 (Egyptian phone number)
	if (!phoneNumber) {
		throw new ErrorWithStatusCode('phoneNumber required', 400);
	}
	if (!phoneNumber.match(/^01[0-9]{9}$/)) {
		throw new ErrorWithStatusCode(
			'phoneNumber must be 11 digits starting with 01',
			400
		);
	}
	return true;
}

export function validateBirthDate(birthDate: Date): boolean {
	// birthDate must be a valid date
	if (!birthDate) {
		throw new ErrorWithStatusCode('birthDate required', 400);
	}
	if (isNaN(birthDate.getTime())) {
		throw new ErrorWithStatusCode('birthDate must be a valid date', 400);
	}
	return true;
}

// type is any till we have a user model
export function validateUser(user: Partial<User>): boolean {
	if (!user) throw new ErrorWithStatusCode('user required', 400);

	if (user.social_type) {
		validateSocialType(user.social_type as string);
	}
	if (user.user_type) {
		validateUserType(user.user_type as string);
	}
	if (user.phone_number) {
		validatePhoneNumber(user.phone_number as string);
	}
	if (user.birthDate) {
		validateBirthDate(user.birthDate as Date);
	}

	return (
		validateUserName(user.Lname as string) &&
		validateUserName(user.Fname as string) &&
		validateEmail(user.email as string) &&
		validatePassword(user.password as string) &&
		validateRole(user.role as string)
	);
}

export function validateUserUpdateData(user: Partial<User>): boolean {
	if (!user) throw new ErrorWithStatusCode('update required', 400);

	if (user.social_type) {
		validateSocialType(user.social_type as string);
	}
	if (user.user_type) {
		validateUserType(user.user_type as string);
	}
	if (user.phone_number) {
		validatePhoneNumber(user.phone_number as string);
	}
	if (user.birthDate) {
		validateBirthDate(user.birthDate as Date);
	}
	if (user.Fname) {
		validateUserName(user.Fname as string);
	}
	if (user.Lname) {
		validateUserName(user.Lname as string);
	}
	if (user.email) {
		validateEmail(user.email as string);
	}
	if (user.password) {
		validatePassword(user.password as string);
	}
	if (user.role) {
		validateRole(user.role as string);
	}
	return true;
}

export default validateUser;
