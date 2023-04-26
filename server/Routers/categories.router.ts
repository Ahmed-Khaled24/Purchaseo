import { Router } from 'express';
const categoryController = require('../controller/categories.controller');
const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
    res.send('category');
});

categoryRouter.get('/clothes', categoryController.getClothes);
categoryRouter.get('/clothes/men', categoryController.getClothesMen);
categoryRouter.get('/clothes/women', categoryController.getClothesWomen);
categoryRouter.get('/clothes/kids', categoryController.getClothesKids);
categoryRouter.get('/home-appliance', categoryController.getHomeAppliance);
categoryRouter.get('/electronics', categoryController.getElectronics);
categoryRouter.get('/electronics/phones', categoryController.getElectronicPhones);
categoryRouter.get('/electronics', categoryController.getElectronics);
categoryRouter.get('/electronics/computers', categoryController.getElectronicComputers);
categoryRouter.get('/tools', categoryController.getProductsWithTypeTool);






export default categoryRouter;