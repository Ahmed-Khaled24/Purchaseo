import { Request, Response } from 'express';
import {
	validateNumber,
	validateString,
} from '../../util/validation/primitiveValidation';

export default function mwValidateReview(
	req: Request,
	res: Response,
	next: Function
) {
	const { product_id, rate, body } = req.body;
	req.body.customer_id = req.user?.user_id;
	try {
		validateNumber(product_id, true, 'product_id');
		validateString(body, true, 'body');
		validateNumber(rate, true, 'rate');
		if (Number(rate) > 5) {
			throw new Error('rate must be between 0 and 5');
		}
		next();
	} catch (error) {
		res.status(400).json({
			status: 'failure',
			data: (error as Error).message,
		});
		return;
	}
}
