import { Request, Response } from 'express';
import { validateProductData } from '../../util/validation/productValidation';
import ErrorWithStatusCode from '../../util/classes/ErrorWithStatusCode';
import { jsToSQLDate } from '../../util/DB/dateConverter';

export function validateProductDate(isNew: boolean) {
	return function mwValidateProductData(
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
			validateProductData(product, isNew);
			if (product.approve_date) {
				// make sure that the provided date is in the correct format
				product.approve_date = jsToSQLDate(
					new Date(product.approve_date)
				);
			}
			next();
		} catch (error) {
			res.status((error as ErrorWithStatusCode).statusCode).json({
				status: 'failure',
				data: (error as Error).message,
			});
		}
	};
}
