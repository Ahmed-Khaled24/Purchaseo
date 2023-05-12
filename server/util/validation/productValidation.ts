import { Product } from '../../types/Product';
import { validateNumber, validateString } from './primitiveValidation';

export function validateProductData(product: Product, isNew: boolean) {
	const {
		product_id,
		sold_quantity,
		approved_by,
		description,
		rating,
		approval_status,
		discount,
		brand,
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
	validateString(product_name, isNew, 'product_name');
	validateNumber(added_by, isNew, 'added_by');
	validateNumber(inventory, isNew, 'inventory');
	validateNumber(price, isNew, 'price');
}
