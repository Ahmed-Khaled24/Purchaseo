import {Router, Request, Response} from 'express';
import {addNewOrderC, getOrderC, removeOrderC} from '../controller/orders.controller';

const ordersRouter = Router();


ordersRouter.get('/:id', getOrderC);
ordersRouter.delete('/:id', removeOrderC);
ordersRouter.route('/')
.post(addNewOrderC)


export default ordersRouter;
