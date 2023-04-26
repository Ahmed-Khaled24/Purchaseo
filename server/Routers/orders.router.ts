import {Router, Request, Response} from 'express';
import {addNewOrder, getOrder, removeOrder, updateOrder} from '../controller/orders.controller';

const ordersRouter = Router();


userRouter.get('/:id', getOrder);
userRouter.route('/')
.post(addNewOrder)
.delete(removeOrder)
.put(updateOrder)


export default ordersRouter;
