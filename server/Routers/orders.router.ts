import {Router, Request, Response} from 'express';
import {addNewOrderC, getOrderC, removeOrderC, updateOrderC} from '../controller/orders.controller';

const ordersRouter = Router();


userRouter.get('/:id', getOrderC);
userRouter.route('/')
.post(addNewOrderC)
.delete(removeOrderC)
.put(updateOrderC)


export default ordersRouter;
