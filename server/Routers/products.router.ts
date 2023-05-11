import { Router } from 'express';

import {
	addNewProduct,
	deleteProduct,
	getProductById,
	updateProduct,
} from '../controller/products.controller';
import { mwValidateProductData } from '../middlewares/validation/productValidation.middleware';

const productRouter = Router();

productRouter
	.post('/', mwValidateProductData, addNewProduct)
	.patch('/', updateProduct)
	.get('/:id', getProductById)
	.delete('/:id', deleteProduct);

export default productRouter;
