import { Router } from 'express';
const categoryController = require('../controller/categories.controller');
const categoryRouter = Router();




categoryRouter.get('/', categoryController.getProductsWithCategory);

categoryRouter.get('/tools', categoryController.getProductsWithTypeTool);






export default categoryRouter;