import { Router } from 'express';

import {
	addNewProduct,
	deleteProduct,
	getProduct,
	updateProduct,
} from '../controller/products.controller';

const productRouter = Router();

productRouter
	.route('/')
	.post(addNewProduct)
	.patch(updateProduct)
	.delete(deleteProduct);

productRouter.route('/:id').get(getProduct);

export default productRouter;
