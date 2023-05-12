import ErrorWithStatusCode from '../classes/ErrorWithStatusCode';

/**
 * @param theNumber
 * @param required
 * @param fieldName
 * @returns void if theNumber is a number greater than or equal to zero
 * @throws ErrorWithStatusCode if theNumber is not a number greater than or equal to zero
 */
export function validateNumber(
	theNumber: unknown,
	required: boolean,
	fieldName: string
) {
	let isValid =
		(typeof theNumber === 'string' && // string but only numbers
			theNumber.match(/\d+/g) &&
			Number(theNumber) >= 0) ||
		(typeof theNumber === 'number' && theNumber >= 0);
	if (required && !theNumber) {
		// required but not provided
		throw new ErrorWithStatusCode(
			`mandatory field "${fieldName}" is not provided in the product object`,
			400
		);
	}
	if (required && !isValid) {
		// required and provided but invalid
		throw new ErrorWithStatusCode(
			`${fieldName} is invalid, it must be a number greater than or equal to zero`,
			400
		);
	}
	if (!required && theNumber && !isValid) {
		// not required but provided and invalid
		throw new ErrorWithStatusCode(
			`${fieldName} is invalid, it must be a number greater than or equal to zero`,
			400
		);
	}
}

/**
 * @param theString
 * @param required
 * @param fieldName
 * @returns void if theString is a non empty string
 * @throws ErrorWithStatusCode if theString is an empty string
 */
export function validateString(
	theString: unknown,
	required: boolean,
	fieldName: string
) {
	if (theString === '') {
		theString = ' ';
	}
	let isValid = typeof theString === 'string' && theString.trim().length >= 1;
	if (required && !theString) {
		// required but not provided
		throw new ErrorWithStatusCode(
			`mandatory field "${fieldName}" is not provided in the product object`,
			400
		);
	}
	if (required && !isValid) {
		// required and provided but invalid
		throw new ErrorWithStatusCode(
			`${fieldName} is invalid, it must be a non empty string`,
			400
		);
	}
	if (!required && theString && !isValid) {
		// not required but provided and invalid
		throw new ErrorWithStatusCode(
			`${fieldName} is invalid, it must be a non empty string`,
			400
		);
	}
}
