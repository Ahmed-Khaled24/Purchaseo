import { Request, Response } from 'express';
import { validateProductData } from '../../util/validation/productValidation';

export function mwValidateProductData(req: Request, res: Response) {
	const { product } = req.body;
	if (!product) {
		res.status(400).json({
			status: 'failure',
			data: 'product object is not provided in request body',
		});
	}
	product.added_by = req.user?.user_id;
	validateProductData(product);
}
