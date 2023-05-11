import { Router } from 'express';

import {
	addNewProduct,
	deleteProduct,
	getProductById,
	updateProduct,
} from '../controller/products.controller';
import { validateProductDate } from '../middlewares/validation/productValidation.middleware';

const productRouter = Router();

productRouter
	.post('/', validateProductDate(true), addNewProduct)
	.patch('/', validateProductDate(false), updateProduct)
	.get('/:id', getProductById)
	.delete('/:id', deleteProduct);

export default productRouter;
