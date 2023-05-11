import {Router, Request, Response} from 'express';
import {addNewOrderC, getOrderC, removeOrderC, updateOrderC} from '../controller/orders.controller';

const ordersRouter = Router();


ordersRouter.get('/:id', getOrderC);
ordersRouter.route('/')
.post(addNewOrderC)
.delete(removeOrderC)
.put(updateOrderC)


export default ordersRouter;
