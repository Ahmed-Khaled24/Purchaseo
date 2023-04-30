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
	

productRouter.route('/:id')
	.get(getProduct)
	.delete(deleteProduct);

export default productRouter;
