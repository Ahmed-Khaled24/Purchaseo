import { NextFunction, Request, Response } from 'express';
import CheckoutData, { CheckoutProduct } from '../../types/Checkout';
import {
	validateNumber,
	validateString,
} from '../../util/validation/primitiveValidation';

export function mwValidatePaymentRequest(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let { products }: CheckoutData = req.body;
	if (!products) {
		return res
			.status(400)
			.json({ status: 'failure', data: 'Products are required' });
	}
	(products as CheckoutProduct[]).forEach((product) => {
		try {
			validateNumber(product.product_id, true, 'product_id');
			validateNumber(product.pricePerUnit, true, 'pricePerUnit');
			validateNumber(product.quantity, true, 'quantity');
			validateString(product.name, true, 'name');
		} catch (error) {
			return res.status(400).json({
				status: 'failure',
				data: `${(error as Error).message} in product with name (${
					product.name
				}) and id (${product.product_id})`,
			});
		}
	});
	next();
}
