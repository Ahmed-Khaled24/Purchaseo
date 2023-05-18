import { Router } from 'express';
import { getProductImages } from '../controller/image.controller';

import {
	addNewProduct,
	deleteProduct,
	getProductById,
	getProductsByOrderedByCustomer,
	getProductsBySellerId,
	updateProduct,
} from '../controller/products.controller';
import {
	authorize,
	mwCheckIsCurrentUser,
	mwCheckLoginStatus,
} from '../middlewares/auth/user.middleware';
import { validateProductDate } from '../middlewares/validation/productValidation.middleware';

const productRouter = Router();
// TODO: do del and up check seller "^^" problem
productRouter
	.post(
		'/',
		mwCheckLoginStatus('loggedIn'),
		authorize('Seller'),
		validateProductDate(true),
		addNewProduct
	)
	.patch(
		'/',
		mwCheckLoginStatus('loggedIn'),
		authorize('Seller'),
		validateProductDate(false),
		updateProduct
	)
	.get('/:id', getProductById)
	.get(
		'/seller/:id',
		mwCheckLoginStatus('loggedIn'),
		authorize('Seller'),
		getProductsBySellerId
	)
	.get('/customer/:id', getProductsByOrderedByCustomer)
	.get('/image/:productId', getProductImages)
	.delete(
		'/:id',
		mwCheckLoginStatus('loggedIn'),
		authorize('Seller'),
		deleteProduct
	);

export default productRouter;
