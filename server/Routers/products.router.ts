import { Router } from 'express';

import {
	addNewProduct,
	deleteProduct,
	getProductById,
	updateProduct,
} from '../controller/products.controller';

const productRouter = Router();

productRouter
	.post('/', addNewProduct)
	.patch('/', updateProduct)
	.get('/:id', getProductById)
	.delete('/:id', deleteProduct);

export default productRouter;
