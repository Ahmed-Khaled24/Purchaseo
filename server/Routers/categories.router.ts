import { Router } from 'express';
const categoryController = require('../controller/categories.controller');
const categoryRouter = Router();




categoryRouter.get('/', categoryController.getProductsWithCategory);
categoryRouter.post('/', categoryController.addCategory);
categoryRouter.get('/:name', categoryController.getProductsWithName);


export default categoryRouter;