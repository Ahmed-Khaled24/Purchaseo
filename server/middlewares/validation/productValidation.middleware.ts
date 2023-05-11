import { Request, Response } from 'express';
import { validateProductData } from '../../util/validation/productValidation';
import ErrorWithStatusCode from '../../util/classes/ErrorWithStatusCode';

export function mwValidateProductData(
	req: Request,
	res: Response,
	next: Function
) {
	const { product } = req.body;
	if (!product) {
		res.status(400).json({
			status: 'failure',
			data: 'product object is not provided in request body',
		});
	}
	product.added_by = req.user?.user_id;
	try {
		validateProductData(product);
		next();
	} catch (error) {
		res.status((error as ErrorWithStatusCode).statusCode).json({
			status: 'failure',
			data: (error as Error).message,
		});
	}
}
