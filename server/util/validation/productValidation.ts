import ErrorWithStatusCode from '../../util/classes/ErrorWithStatusCode';
import { Product } from '../../types/Product';

export function validateProductData(product: Product) {
	const {
		product_id,
		sold_quantity,
		approved_by,
		description,
		rating,
		approval_status,
		discount,
		brand,
		approved_data,
		added_by,
		product_name,
		inventory,
		price,
	} = product;
	validateNumber(product_id, false, 'product_id');
	validateNumber(sold_quantity, false, 'sold_quantity');
	validateNumber(approved_by, false, 'approved_by');
	validateString(description, false, 'description');
	validateNumber(rating, false, 'rating');
	validateString(approval_status, false, 'approval_status');
	validateNumber(discount, false, 'discount');
	validateString(brand, false, 'brand');
	validateString(product_name, true, 'product_name');
	validateNumber(added_by, true, 'added_by');
	validateNumber(inventory, true, 'inventory');
	validateNumber(price, true, 'price');
}

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
