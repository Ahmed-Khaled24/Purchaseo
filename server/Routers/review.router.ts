import { Router } from 'express';

import {
	addNewReview,
	deleteSpecificReview,
	getCustomerReviews,
	getProductReviews,
	getSpecificReview,
} from '../controller/review.controller';
import mwValidateReview from '../middlewares/validation/reviewValidation.middleware';

const reviewRouter = Router();

reviewRouter
	.post('/', mwValidateReview, addNewReview)
	.get('/', getSpecificReview) // url-encoded with productId and customerId
	.delete('/', deleteSpecificReview) // url-encoded with productId and customerId
	.get('/product/:productId', getProductReviews)
	.get('/customer/:customerId', getCustomerReviews);

export default reviewRouter;
