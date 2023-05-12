import { Router } from 'express';
const {
	getProductsWithCategory,
	addCategory,
	getProductsWithName,
} = require('../controller/categories.controller');
const categoryRouter = Router();

categoryRouter.get('/', getProductsWithCategory); // query parameters {category}
categoryRouter.post('/', addCategory);
categoryRouter.get('/search', getProductsWithName); // search query parameter {name}

export default categoryRouter;
